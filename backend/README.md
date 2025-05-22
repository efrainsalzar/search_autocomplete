# Backend - Búsqueda Dinámica

Este proyecto es un backend en Node.js con Express y PostgreSQL para búsquedas dinámicas en tiempo real.

## Estructura de carpetas

- `index.js`: Punto de entrada del servidor.
- `db/connection.js`: Configuración de la conexión a PostgreSQL.
- `routes/`: Rutas de la API.
- `controllers/`: Lógica de negocio.
- `.env`: Variables de entorno (no subir a git).

## Instalación

```bash
npm install
```

## Uso

1. Configura tus variables de entorno en `.env`.
2. Inicia el servidor:

```bash
npm start
```

## Notas

- No olvides agregar tus credenciales de base de datos en `.env`.
- El frontend puede consumir los endpoints definidos aquí.


## Base de datos

##  Configuración adicional en la base de datos

Para optimizar las búsquedas de doctores y mejorar el rendimiento del sistema, se realizaron las siguientes configuraciones directamente en la base de datos PostgreSQL:

###  Extensión `unaccent`

Se habilitó la extensión `unaccent`, que permite realizar búsquedas insensibles a tildes o acentos. Esto mejora la experiencia del usuario al permitir que nombres como "José" puedan ser encontrados escribiendo "Jose", por ejemplo.

```sql
CREATE EXTENSION IF NOT EXISTS unaccent;
```

---

### ⚡ Índices en columnas de búsqueda

Se crearon índices en las columnas más utilizadas en las búsquedas (`nombre`, `apellido`, y `especialidad`). Esto permite que las consultas sean mucho más rápidas, especialmente cuando se trabaja con una base de datos que contiene decenas de miles de registros.

```sql
CREATE INDEX idx_doctores_nombre ON doctores(nombre);
CREATE INDEX idx_doctores_apellido ON doctores(apellido);
CREATE INDEX idx_doctores_especialidad ON doctores(especialidad);
```

> Estas optimizaciones son especialmente útiles para funcionalidades de autocompletado o búsqueda dinámica en tiempo real.

---
