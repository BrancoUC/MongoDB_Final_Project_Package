// scripts/04_lookup_examples.mjs
const mydb = db.getSiblingDB("university_final_nosql");

// 1) posts -> users (básico)
print("Lookup posts->users:");
printjson(
  mydb.posts.aggregate([
    { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "author" } },
    { $unwind: "$author" },
    { $project: { title: 1, "author.username": 1, tags_embedded: 1 } }
  ]).toArray()
);

// 2) posts -> tags (pipeline lookup con let)
print("\nLookup posts->tags (pipeline):");
printjson(
  mydb.posts.aggregate([
    {
      $lookup: {
        from: "tags",
        let: { tagIds: "$tags_ref" },
        pipeline: [
          { $match: { $expr: { $in: ["$_id", "$$tagIds"] } } },
          { $project: { _id: 0, name: 1 } }
        ],
        as: "tags_joined"
      }
    },
    { $project: { title: 1, tags_embedded: 1, tags_joined: 1 } }
  ]).toArray()
);

// 3) users -> profiles (1:1 referenciado)
print("\nLookup users->profiles (1:1 ref):");
printjson(
  mydb.users.aggregate([
    {
      $lookup: {
        from: "profiles",
        localField: "_id",
        foreignField: "userId",
        as: "profile_ref"
      }
    },
    { $unwind: { path: "$profile_ref", preserveNullAndEmptyArrays: true } },
    { $project: { username: 1, "profile.fullName": 1, "profile_ref.bio": 1 } }
  ]).toArray()
);
