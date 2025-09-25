// scripts/01_seed_data.mjs
// SUGERENCIA: Ejecutar con `mongosh scripts/01_seed_data.mjs`
const mydb = db.getSiblingDB("university_final_nosql");

// Limpieza mínima
mydb.users?.drop();
mydb.profiles?.drop();
mydb.posts?.drop();
mydb.tags?.drop();
mydb.places?.drop();

// Cargar datasets desde archivos (si ejecuta desde repositorio clonado, utilice load() si prefiere)
// En mongosh no hay fs por defecto; insertamos programáticamente algunos ejemplos.

// === Users (embebido 1:1 profile, 1:N addresses) ===
mydb.createCollection("users");
mydb.users.insertMany([
  {
    _id: ObjectId("66f100000000000000000001"),
    username: "bismark",
    email: "bismark@example.com",
    profile: { fullName: "Bismark Montero", role: "Student", phone: "+1-809-555-0101" },
    addresses: [
      { type: "home", street: "Av. Máximo Gómez", city: "Santo Domingo", country: "DO" },
      { type: "work", street: "Calle Proyecto", city: "Santo Domingo", country: "DO" }
    ]
  },
  {
    _id: ObjectId("66f100000000000000000002"),
    username: "diana",
    email: "diana@example.com",
    profile: { fullName: "Diana Santa", role: "TA", phone: "+1-809-555-0102" },
    addresses: [
      { type: "home", street: "Av. John F. Kennedy", city: "Santo Domingo", country: "DO" }
    ]
  },
  {
    _id: ObjectId("66f100000000000000000003"),
    username: "nicolas",
    email: "nicolas@example.com",
    profile: { fullName: "Nicolas Bringas", role: "Student", phone: "+1-809-555-0103" }
  }
]);

// === Profiles (referenciado 1:1 con users) ===
// Otro patrón 1:1, esta vez como colección separada (ref por userId)
mydb.createCollection("profiles");
mydb.profiles.insertMany([
  { userId: ObjectId("66f100000000000000000001"), bio: "Bio embebida en users, duplicada aquí como ejemplo referenciado" },
  { userId: ObjectId("66f100000000000000000002"), bio: "Otra bio" }
]);

// === Tags (N:N) ===
mydb.createCollection("tags");
mydb.tags.insertMany([
  { _id: ObjectId("66f300000000000000000001"), name: "nosql" },
  { _id: ObjectId("66f300000000000000000002"), name: "mongodb" },
  { _id: ObjectId("66f300000000000000000003"), name: "geo" },
  { _id: ObjectId("66f300000000000000000004"), name: "demo" }
]);

// === Posts (1:N referenciado con users; N:N con tags) ===
mydb.createCollection("posts");
mydb.posts.insertMany([
  {
    _id: ObjectId("66f200000000000000000001"),
    userId: ObjectId("66f100000000000000000001"),
    title: "Primer post",
    content: "Hola MongoDB",
    tags_ref: [ ObjectId("66f300000000000000000001"), ObjectId("66f300000000000000000002") ],
    tags_embedded: ["nosql","mongodb"],
    createdAt: new Date()
  },
  {
    _id: ObjectId("66f200000000000000000002"),
    userId: ObjectId("66f100000000000000000002"),
    title: "Geospatial demo",
    content: "Probando puntos y consultas",
    tags_ref: [ ObjectId("66f300000000000000000003"), ObjectId("66f300000000000000000004") ],
    tags_embedded: ["geo","demo"],
    createdAt: new Date()
  }
]);

// === Places (geoespacial) ===
mydb.createCollection("places");
mydb.places.insertMany([
  { name: "Universidad Autonoma de Santo Domingo", location: { type: "Point", coordinates: [ -69.91997, 18.46077 ] } },
  { name: "Parque Mirador Sur", location: { type: "Point", coordinates: [ -69.9497, 18.4318 ] } },
  { name: "Faro a Colón", location: { type: "Point", coordinates: [ -69.8735, 18.4801 ] } }
]);

print("Seed completado en DB university_final_nosql");
