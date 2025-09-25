// scripts/05_aggregation_examples.mjs
const mydb = db.getSiblingDB("university_final_nosql");

// 1) Conteo de posts por tag embebido
print("Conteo de posts por tag (embebido):");
printjson(
  mydb.posts.aggregate([
    { $unwind: "$tags_embedded" },
    { $group: { _id: "$tags_embedded", total: { $sum: 1 } } },
    { $sort: { total: -1 } }
  ]).toArray()
);

// 2) Top autores por #posts
print("\nTop autores por #posts:");
printjson(
  mydb.posts.aggregate([
    { $group: { _id: "$userId", posts: { $sum: 1 } } },
    { $sort: { posts: -1 } },
    { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "author" } },
    { $unwind: "$author" },
    { $project: { _id: 0, author: "$author.username", posts: 1 } }
  ]).toArray()
);

// 3) $bucket por tamaño de título (demo)
print("\nBucket por longitud de título:");
printjson(
  mydb.posts.aggregate([
    { $project: { titleLen: { $strLenCP: "$title" } } },
    { $bucket: {
        groupBy: "$titleLen",
        boundaries: [0, 5, 10, 20, 100],
        default: "100+",
        output: { count: { $sum: 1 } }
    } }
  ]).toArray()
);
