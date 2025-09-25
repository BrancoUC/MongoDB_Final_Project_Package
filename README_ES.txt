# Proyecto Final – Base de Datos 2 (NoSQL con MongoDB) — 20 puntos

## Objetivo
Diseñar y demostrar un modelo de datos NoSQL en MongoDB que cubra **relaciones**, **validación de esquema**, **consultas con `$lookup`**, **geoespacial**, **pipelines de agregación**, **uso de GUI (MongoDB Compass)**, **backups**, y **MongoDB Atlas**.

## Entregables
1. **Modelo y justificación (PDF/MD)**: decisión de qué colecciones usan embebido vs referenciado (con pros/contras y diagrama simple).
2. **Scripts ejecutables** (carpeta `scripts/`): creación de colecciones, validaciones, índices, cargas de datos, ejemplos de `$lookup` y agregaciones.
3. **Dataset** (`datasets/`): JSON/GeoJSON provistos + los que Uds. extiendan.
4. **Demostraciones GUI** (carpeta `compass/`): capturas o pasos reproducibles.
5. **Backups** (carpeta `scripts/`): comandos de backup/restore ejecutados y evidencia.
6. **Atlas**: evidencias de conexión y consultas (capturas o transcript).
7. **Checklist de entrega** (`submission/checklist.md`) completo.
8. **README corto** con instrucciones de ejecución (comandos usados).

> **Sugerencia:** Clonar este paquete, completar los TODOs y añadir su solución sobre esta base.

## Ponderación (20 puntos)
- Modelo & relaciones (embebido/referenciado) — **5 pts**
- Validación de esquema y manejo de inválidos — **3 pts**
- `$lookup` y consultas relacionadas — **3 pts**
- Geoespacial (datos, índice, consultas) — **3 pts**
- Aggregation Pipelines (≥3 casos) — **3 pts**
- Backups & Restore (local o Atlas) — **2 pts**
- Uso de Compass/Atlas con evidencias — **1 pt**

## Requisitos técnicos
- MongoDB 5.x+ (local o Atlas), `mongosh`.
- GUI: **MongoDB Compass**.
- Permisos para crear índices y ejecutar `collMod`.
- Opcional: Node.js si desean automatizar.

## Inicio rápido
```bash
# 1) Abra una terminal en la carpeta del proyecto
cd MongoDB_Final_Project_Package

# 2) Ejecute los scripts en orden (ajuste el nombre de la base si desea)
mongosh scripts/01_seed_data.mjs
mongosh scripts/02_schema_validation.mjs
mongosh scripts/03_indexes_and_geospatial.mjs
mongosh scripts/04_lookup_examples.mjs
mongosh scripts/05_aggregation_examples.mjs
mongosh scripts/06_invalid_docs_demo.mjs

# 3) Ver guía de backup/restore
bash scripts/07_backup_restore.sh   # Revise y ajuste variables antes
```

## Base de datos sugerida
- **Nombre por defecto**: `university_final_nosql`
- Puede cambiar el nombre en la primera línea de cada script (`getSiblingDB`).

