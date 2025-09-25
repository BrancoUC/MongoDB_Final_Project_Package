// scripts/03_indexes_and_geospatial.mjs
const mydb = db.getSiblingDB("university_final_nosql");

// Índices
mydb.users.createIndex({ email: 1 }, { unique: true, name: "uniq_email" });
mydb.posts.createIndex({ userId: 1, createdAt: -1 }, { name: "user_created_idx" });

// Geoespacial
try { mydb.places.dropIndex("location_2dsphere"); } catch(e) {}
mydb.places.createIndex({ location: "2dsphere" }, { name: "location_2dsphere" });

print("Índices creados. Probando consultas geoespaciales...");

// $near (requiere índice 2dsphere)
printjson(
  mydb.places.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [ -69.91997, 18.46077 ] },
        $maxDistance: 3000
      }
    }
  }).limit(5).toArray()
);

// $geoWithin (círculo aproximado usando $centerSphere)
const km = 5;
const rad = km / 6378.1;
printjson(
  mydb.places.find({
    location: {
      $geoWithin: {
        $centerSphere: [ [ -69.91997, 18.46077 ], rad ]
      }
    }
  }).toArray()
);
