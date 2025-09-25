#!/usr/bin/env bash
# scripts/07_backup_restore.sh
# EJEMPLOS: ajuste rutas/URI/usuario/cluster antes de ejecutar.

set -euo pipefail

# === Local backup ===
# Exporta la base completa 'university_final_nosql' al directorio ./backup
mongodump --db=university_final_nosql --out=./backup

# Restaurar local
# mongorestore --db=university_final_nosql_restored ./backup/university_final_nosql

# === Atlas (ejemplo) ===
# URI_ATLAS='mongodb+srv://<user>:<pass>@<cluster>/<dbname>?retryWrites=true&w=majority'
# mongodump --uri="$URI_ATLAS" --out=./backup_atlas
# mongorestore --uri="$URI_ATLAS" ./backup_atlas/<dbname>

echo "Backup/Restore scripts ejecutados (revise rutas/URI antes de usar)."
