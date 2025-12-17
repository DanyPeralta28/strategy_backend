
# Scalling Strategy - Base de Datos

Este archivo contiene el volcado de la base de datos **`scalling_strategy`** utilizada en el proyecto **Scalling Strategy**. A continuación, se detallan las instrucciones para la instalación y configuración de la base de datos.

## 🚀 **Instrucciones de Instalación**

### 1. **Requisitos previos**

Antes de proceder con la instalación, asegúrate de tener:

- **MySQL 8.0.35** o superior instalado en tu máquina.
- Acceso a un cliente MySQL como el cliente de línea de comandos o **DBeaver** para importar el archivo SQL.

### 2. **Importar la Base de Datos**

Para crear la base de datos y las tablas, sigue estos pasos:

#### Usando la línea de comandos:

1. Abre tu terminal o consola de comandos.
2. Conéctate a MySQL utilizando el usuario `root` (o el usuario de tu preferencia):
   ```bash
   mysql -u root -p
   ```
3. Ejecuta el archivo SQL para crear la base de datos y las tablas:
   ```bash
   source /ruta/a/tu/archivo/dump-scalling_strategy-202512161821.sql;
   ```

Esto importará la estructura de las tablas contenidas en el archivo `.sql` para la base de datos **`scalling_strategy`**.

### 3. **Configuración del Usuario `root`**

Si deseas utilizar el usuario `root` para acceder y gestionar la base de datos, puedes ejecutar el siguiente bloque de código para asegurarte de que tenga permisos completos.

```sql
-- Crear el usuario root (si no existe) sin contraseña
CREATE USER IF NOT EXISTS 'root'@'localhost';

-- Darle permisos completos sobre la base de datos 'scalling_strategy'
GRANT ALL PRIVILEGES ON `scalling_strategy`.* TO 'root'@'localhost';

-- Aplicar los cambios de permisos
FLUSH PRIVILEGES;
```

### 4. **Configuración de Contraseña (Opcional)**

Si prefieres establecer una contraseña para el usuario `root`, puedes hacerlo con el siguiente comando:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'tu_contraseña';
```

Esto asignará la contraseña que elijas al usuario `root`.

## 🗂 **Estructura de la Base de Datos**

Este volcado de base de datos incluye la estructura de las siguientes tablas:

- **`bosses`**: Información de jefes y empleados.
- **`cash_format_finances`**: Datos financieros relacionados con el formato de dinero.
- **`execution_format_face`**: Información sobre las funciones y responsabilidades dentro de la estrategia.
- **`users`**: Datos de los usuarios del sistema.
- **Y muchas más...**

Las tablas incluyen solo las definiciones de las columnas, tipos de datos y restricciones. **No se incluyen los datos** en este archivo SQL.

## 🔧 **Consideraciones Adicionales**

- Asegúrate de que MySQL esté en ejecución antes de intentar ejecutar el volcado.
- Si trabajas en un entorno de producción, se recomienda no usar el usuario `root` por motivos de seguridad. En su lugar, crea un usuario con permisos limitados solo para las bases de datos necesarias.

## 📜 **Licencia**

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE.md](LICENSE.md) para más detalles.

---
