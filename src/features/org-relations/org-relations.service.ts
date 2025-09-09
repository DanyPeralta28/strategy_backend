import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

export type CoreUser = {
  id_user: number;
  username: string | null;
  team: string | null;
  id_company: number | string | null;
  id_entity: number | string | null;
  level_user: number | null;
  status?: number | null;
};

export type BasicUser = { id_user: number; username: string | null };

export type RelatedUsers = {
  me: BasicUser | null;
  bosses: BasicUser[];
  teammates: BasicUser[];
  allUsernames: string[]; // únicos
  allUserIds: number[];   // únicos
};

export type OrgRelationsOptions = {
  includeSelf?: boolean;               // default: true
  sameCompanyAndEntityOnly?: boolean;  // default: true
  activeOnly?: boolean;                // default: true (usa status=1)
};

const DEFAULT_OPTS: Required<OrgRelationsOptions> = {
  includeSelf: true,
  sameCompanyAndEntityOnly: true,
  activeOnly: true,
};

@Injectable()
export class OrgRelationsService {
  constructor(private readonly ds: DataSource) { }

  private mgr(manager?: EntityManager) {
    return manager ?? this.ds.manager;
  }

  /** Perfil mínimo del usuario que consulta */
  async getUserCore(userId: number, manager?: EntityManager): Promise<CoreUser | null> {
    const rows = await this.mgr(manager).query<CoreUser[]>(
      `
      SELECT
        u.id_user, u.username, u.team,
        u.id_company, u.id_entity, u.level_user, u.status
      FROM users u
      WHERE u.id_user = ?
      `,
      [userId],
    );
    return rows[0] ?? null;
  }

  /** Jefes directos del usuario (tabla bosses) */
  async getBossesOf(
    userId: number,
    opts?: OrgRelationsOptions,
    manager?: EntityManager,
  ): Promise<BasicUser[]> {
    const o = { ...DEFAULT_OPTS, ...(opts || {}) };
    const rows = await this.mgr(manager).query<BasicUser[]>(
      `
      SELECT ub.id_user, ub.username
      FROM bosses b
      JOIN users ub ON ub.id_user = b.id_userBoss
      WHERE b.id_userJunior = ?
        ${o.activeOnly ? 'AND b.status = 1' : ''}
      `,
      [userId],
    );
    return rows;
  }

  /** Admins (level_user = 2) de la misma compañía: se consideran "jefes globales" */
  async getCompanyAdminsFor(
    userId: number,
    opts?: OrgRelationsOptions,
    manager?: EntityManager,
  ): Promise<BasicUser[]> {
    const o = { ...DEFAULT_OPTS, ...(opts || {}) };
    const me = await this.getUserCore(userId, manager);
    if (!me || me.id_company == null) return [];

    const rows = await this.mgr(manager).query<BasicUser[]>(
      `
      SELECT u.id_user, u.username
      FROM users u
      WHERE u.level_user = 2
        AND u.id_company = ?
        AND u.has_noBoss = 1
        ${o.activeOnly ? 'AND u.status = 1' : ''}
      `,
      [me.id_company],
    );

    if (o.includeSelf === false) {
      return rows.filter(r => r.id_user !== userId);
    }
    return rows;
  }

  /** Compañeros del mismo team (opcional: misma company+entity) */
  async getTeammatesOf(
    userId: number,
    opts?: OrgRelationsOptions,
    manager?: EntityManager,
  ): Promise<BasicUser[]> {
    const o = { ...DEFAULT_OPTS, ...(opts || {}) };
    const me = await this.getUserCore(userId, manager);
    if (!me || !me.team) return [];

    const params: any[] = [me.team];
    let filter = `u.team = ?`;

    if (o.sameCompanyAndEntityOnly) {
      filter += ` AND u.id_company = ? AND u.id_entity = ?`;
      params.push(me.id_company, me.id_entity);
    }

    let tail = '';
    if (o.activeOnly) tail += ' AND u.status = 1';
    if (!o.includeSelf) {
      tail += ' AND u.id_user <> ?';
      params.push(userId);
    }

    const rows = await this.mgr(manager).query<BasicUser[]>(
      `
      SELECT u.id_user, u.username
      FROM users u
      WHERE ${filter}${tail ? ' ' + tail : ''}
      `,
      params,
    );
    return rows;
  }

  /** Jefes (directos + admins de compañía) + compañeros (+ yo opcional). Devuelve listas únicas. */
  async getRelatedUsers(
    userId: number,
    opts?: OrgRelationsOptions,
    manager?: EntityManager,
  ): Promise<RelatedUsers> {
    const o = { ...DEFAULT_OPTS, ...(opts || {}) };

    const [meCore, bosses, teammates, companyAdmins] = await Promise.all([
      this.getUserCore(userId, manager),
      this.getBossesOf(userId, o, manager),
      this.getTeammatesOf(userId, o, manager),
      this.getCompanyAdminsFor(userId, o, manager),
    ]);
    // console.log({'companyAdmins': companyAdmins });
    // console.log({ 'teammates': teammates });
    console.log({ 'bosses': bosses });
    const me: BasicUser | null =
      o.includeSelf && meCore ? { id_user: meCore.id_user, username: meCore.username } : null;

    // Admins cuentan como “jefes globales” además de los jefes directos
    const mergedBosses = [...companyAdmins, ...bosses];

    const all = [
      ...(me ? [me] : []),
      ...mergedBosses,
      ...teammates,
    ];

    const seenUsernames = new Set<string>();
    const seenIds = new Set<number>();

    const allUsernames = all
      .map(u => u.username)
      .filter((x): x is string => {
        if (!x) return false;
        if (seenUsernames.has(x)) return false;
        seenUsernames.add(x);
        return true;
      });

    const allUserIds = all
      .map(u => u.id_user)
      .filter((x): x is number => {
        if (!Number.isFinite(x)) return false;
        if (seenIds.has(x)) return false;
        seenIds.add(x);
        return true;
      });

    return { me, bosses: mergedBosses, teammates, allUsernames, allUserIds };
  }

  /** Si tus tablas de negocio guardan created_by = username (string) */
  async getAllowedCreatorsByUsername(
    userId: number,
    opts?: OrgRelationsOptions,
    manager?: EntityManager,
  ): Promise<string[]> {
    const related = await this.getRelatedUsers(userId, opts, manager);
    return related.allUsernames;
  }

  /** Útil si otro módulo guarda user_id (por si acaso) */
  async getAllowedCreatorsByUserId(
    userId: number,
    opts?: OrgRelationsOptions,
    manager?: EntityManager,
  ): Promise<number[]> {
    const related = await this.getRelatedUsers(userId, opts, manager);
    return related.allUserIds;
  }

  // OrgRelationsService

  // ➊ Subordinados directos (equipo que lidero)
  async getDirectReportsOf(
    bossId: number,
    opts?: OrgRelationsOptions,
    manager?: EntityManager,
  ): Promise<BasicUser[]> {
    const o = { ...DEFAULT_OPTS, ...(opts || {}) };
    const me = await this.getUserCore(bossId, manager);
    if (!me) return [];

    const params: any[] = [bossId];
    let where = 'b.id_userBoss = ?';

    // activos en relación y en el usuario junior
    if (o.activeOnly) where += ' AND b.status = 1 AND uj.status = 1';

    // limitar al mismo company/entity del líder (usando datos del usuario)
    if (o.sameCompanyAndEntityOnly) {
      where += ' AND uj.id_company = ? AND uj.id_entity = ?';
      params.push(me.id_company, me.id_entity);
    }

    // excluirme (no aplica mucho, pero lo dejamos por consistencia)
    if (o.includeSelf === false) {
      where += ' AND uj.id_user <> ?';
      params.push(bossId);
    }

    const rows = await this.mgr(manager).query<BasicUser[]>(
      `
    SELECT DISTINCT uj.id_user, uj.username
    FROM bosses b
    JOIN users  uj ON uj.id_user = b.id_userJunior
    WHERE ${where}
    `,
      params,
    );
    return rows;
  }


  async getPeersByBossGraph(
    userId: number,
    opts?: OrgRelationsOptions,
    manager?: EntityManager,
  ): Promise<BasicUser[]> {
    const o = { ...DEFAULT_OPTS, ...(opts || {}) };
    const me = await this.getUserCore(userId, manager);
    if (!me) return [];

    // (a) jefes del usuario
    const bossRows = await this.mgr(manager).query<{ id_userBoss: number }[]>(
      `
    SELECT DISTINCT b.id_userBoss
    FROM bosses b
    WHERE b.id_userJunior = ?
      ${o.activeOnly ? 'AND b.status = 1' : ''}
    `,
      [userId],
    );
    const bossIds = bossRows.map(r => r.id_userBoss).filter(x => Number.isFinite(x));
    if (!bossIds.length) {
      // sin jefe: devolver solo yo si includeSelf
      return o.includeSelf ? [{ id_user: me.id_user, username: me.username }] : [];
    }

    // placeholders dinámicos para IN (...)
    const placeholders = bossIds.map(() => '?').join(',');
    const params: any[] = [...bossIds];
    let where = `b.id_userBoss IN (${placeholders})`;

    if (o.activeOnly) where += ' AND b.status = 1 AND uj.status = 1';
    if (o.sameCompanyAndEntityOnly) {
      where += ' AND uj.id_company = ? AND uj.id_entity = ?';
      params.push(me.id_company, me.id_entity);
    }
    if (o.includeSelf === false) {
      where += ' AND uj.id_user <> ?';
      params.push(userId);
    }

    const rows = await this.mgr(manager).query<BasicUser[]>(
      `
    SELECT DISTINCT uj.id_user, uj.username
    FROM bosses b
    JOIN users  uj ON uj.id_user = b.id_userJunior
    WHERE ${where}
    `,
      params,
    );

    // si includeSelf y no vino en el join (p.ej. sin pares), añadimos me
    if (o.includeSelf) {
      const exists = rows.some(r => r.id_user === me.id_user);
      if (!exists) rows.unshift({ id_user: me.id_user, username: me.username });
    }

    return rows;
  }


}
