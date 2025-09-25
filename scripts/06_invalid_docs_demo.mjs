// scripts/06_invalid_docs_demo.mjs
const mydb = db.getSiblingDB("university_final_nosql");

print("Intentando insertar doc inválido (posts sin title)...");
try {
  mydb.posts.insertOne({ userId: ObjectId("66f100000000000000000001"), createdAt: new Date() });
} catch (e) {
  print("Error esperado por validación:", e.message);
}

print("\nCambiando validationAction a 'warn' temporalmente para analizar inválidos existentes...");
mydb.runCommand({
  collMod: "posts",
  validationAction: "warn"
});

// Demostración de cómo detectar inválidos con una consulta inversa aproximada (no perfecta):
print("\nBuscando posibles inválidos con $expr:");
printjson(
  mydb.posts.aggregate([
    { $match: { $expr: { $not: { $ifNull: ["$title", false] } } } },
    { $limit: 5 }
  ]).toArray()
);

print("\nRestaurando validationAction='error'...");
mydb.runCommand({
  collMod: "posts",
  validationAction: "error"
});

print("Demo de inválidos completada.");
