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