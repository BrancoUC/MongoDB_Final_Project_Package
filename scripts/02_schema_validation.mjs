// scripts/02_schema_validation.mjs
const mydb = db.getSiblingDB("university_final_nosql");

// USERS: email requerido + patrón, username min 3
mydb.runCommand({
  collMod: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username","email"],
      properties: {
        username: { bsonType: "string", minLength: 3 },
        email: {
          bsonType: "string",
          pattern: "^[^@\s]+@[^@\s]+\.[^@\s]+$"
        },
        addresses: {
          bsonType: ["array"],
          items: {
            bsonType: "object",
            required: ["type","city","country"],
            properties: {
              type: { enum: ["home","work","other"] },
              city: { bsonType: "string" },
              country: { bsonType: "string" }
            }
          }
        }
      },
      additionalProperties: true
    }
  },
  validationLevel: "moderate",   // no bloquea docs existentes; sí inserciones/updates
  validationAction: "error"
});

// POSTS: título y userId obligatorios; tags_embedded como array string
mydb.runCommand({
  collMod: "posts",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title","userId"],
      properties: {
        title: { bsonType: "string", minLength: 1 },
        userId: { bsonType: "objectId" },
        tags_embedded: {
          bsonType: ["array"],
          items: { bsonType: "string" }
        },
        tags_ref: {
          bsonType: ["array"],
          items: { bsonType: "objectId" }
        }
      }
    }
  },
  validationLevel: "moderate",
  validationAction: "error"
});

// PLACES: GeoJSON Point válido
mydb.runCommand({
  collMod: "places",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name","location"],
      properties: {
        name: { bsonType: "string" },
        location: {
          bsonType: "object",
          required: ["type","coordinates"],
          properties: {
            type: { enum: ["Point"] },
            coordinates: {
              bsonType: "array",
              minItems: 2,
              maxItems: 2,
              items: { bsonType: "double" }
            }
          }
        }
      }
    }
  },
  validationLevel: "moderate",
  validationAction: "error"
});

print("Validaciones aplicadas (validationLevel=moderate).");
