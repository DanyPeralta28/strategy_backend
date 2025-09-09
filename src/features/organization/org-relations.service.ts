import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

export type CoreUser = {
    id_user: number;
    username: string | null;
    team: string | null;
    id_company: number | string | null;
    id_entity: number | string | null;
    level_user: number | null;
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
    includeSelf?: boolean;           // default: true
    sameCompanyAndEntityOnly?: boolean; // default: true (recomendado)
    activeOnly?: boolean;            // default: true (status=1)
};

const DEFAULT_OPTS: Required<OrgRelationsOptions> = {
    includeSelf: true,
    sameCompanyAndEntityOnly: true,
    activeOnly: true,
};

@Injectable()
export class OrgRelationsService {
    constructor(private readonly ds: DataSource) { }

    private getMgr(manager?: EntityManager) {
        return manager ?? this.ds.manager;
    }

    async getUserCore(
        userId: number,
        manager?: EntityManager,
    ): Promise<CoreUser | null> {
        const rows = await this.getMgr(manager).query<CoreUser[]>(
            `
      SELECT
        u.id_user, u.username, u.team,
        u.id_company, u.id_entity, u.level_user
      FROM users u
      WHERE u.id_user = ? ${/* status en users no está en tu DDL, si existe, descomenta: */''}
      `,
            [userId],
        );
        return rows[0] ?? null;
    }

    async getBossesOf(
        userId: number,
        opts?: OrgRelationsOptions,
        manager?: EntityManager,
    ): Promise<BasicUser[]> {
        const o = { ...DEFAULT_OPTS, ...(opts || {}) };
        // status en bosses y users; si tu DDL no maneja status en users, deja solo bosses.status
        const rows = await this.getMgr(manager).query<BasicUser[]>(
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

        const rows = await this.getMgr(manager).query<BasicUser[]>(
            `
      SELECT u.id_user, u.username
      FROM users u
      WHERE ${filter}
        ${o.activeOnly ? 'AND u.status = 1' : ''}
        ${o.includeSelf ? '' : 'AND u.id_user <> ?'}
      `,
            o.includeSelf ? params : [...params, userId],
        );
        return rows;
    }

    /** Devuelve jefes + compañeros (+ yo opcional). */
    async getRelatedUsers(
        userId: number,
        opts?: OrgRelationsOptions,
        manager?: EntityManager,
    ): Promise<RelatedUsers> {
        const o = { ...DEFAULT_OPTS, ...(opts || {}) };

        const [meCore, bosses, teammates] = await Promise.all([
            this.getUserCore(userId, manager),
            this.getBossesOf(userId, o, manager),
            this.getTeammatesOf(userId, o, manager),
        ]);

        const me: BasicUser | null =
            o.includeSelf && meCore ? { id_user: meCore.id_user, username: meCore.username } : null;

        const all = [
            ...(me ? [me] : []),
            ...bosses,
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


        return { me, bosses, teammates, allUsernames, allUserIds };
    }


    async getAllowedCreatorsByUsername(
        userId: number,
        opts?: OrgRelationsOptions,
        manager?: EntityManager,
    ): Promise<string[]> {
        const related = await this.getRelatedUsers(userId, opts, manager);
        return related.allUsernames;
    }

    async getAllowedCreatorsByUserId(
        userId: number,
        opts?: OrgRelationsOptions,
        manager?: EntityManager,
    ): Promise<number[]> {
        const related = await this.getRelatedUsers(userId, opts, manager);
        return related.allUserIds;
    }
}
