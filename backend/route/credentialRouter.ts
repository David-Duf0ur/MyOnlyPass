import { Router } from "express";
import { client_mongo } from "../data/data.js";
import { ObjectId } from "mongodb";

const credentialRouter = Router();

// POUR LE DEV
credentialRouter.get("/credentials/fullax", async (req, res) => {
    console.log("/credentials/fullax")
    const db = client_mongo.db("credentials");
    const result = await db.collection("credentials").find().toArray();
    res.json(result);
})

// Récupération de tous les crédentials d'un utilisateur
credentialRouter.get("/credentials/full/:userId", async (req, res) => {
    console.log("/credentials/full/:userId")
    const userId = parseInt(req.params.userId, 10);
    const db = client_mongo.db("credentials");
    const result = await db.collection("credentials").find({ userId }).toArray();
    res.json(result);
})

// Récupération d'un crédential avec le nom le plus proche pour un utilisateur
credentialRouter.get("/credentials/closest/:userId/:name", async (req, res) => {
    console.log("/credentials/closest/:userId/:name")
    const userId = parseInt(req.params.userId, 10);
    const name = req.params.name;
    const db = client_mongo.db("credentials");
    const result = await db.collection("credentials").find({ userId, title: { $regex: name, $options: "i" } }).sort({ title: 1 }).toArray();
    res.json(result);
})

// Récupération de tous les crédentials favoris d'un utilisateur
credentialRouter.get("/credentials/favorites/:userId", async (req, res) => {
    console.log("/credentials/favorites/:userId")
    const userId = parseInt(req.params.userId, 10);
    const db = client_mongo.db("credentials");
    const result = await db.collection("credentials").find({ favorite: true, userId }).toArray();
    res.json(result);
})

// Récupération de tous les crédentials d'un utilisateur avec pagination
credentialRouter.get("/credentials/:page/:limit/:userId/:filter/:orderBy", async (req, res) => {
    console.log("/credentials/:page/:limit/:userId")
    const page = parseInt(req.params.page, 10) || 1;      // Numéro de page (par défaut 1)
    const limit = parseInt(req.params.limit, 10) || 5;   // Nombre d'éléments par page (par défaut 4)
    const userId = parseInt(req.params.userId, 10);
    const skip = (page - 1) * limit;

    const filter = req.params.filter || "all";
    const orderBy = req.params.orderBy || "title";

    const db = client_mongo.db("credentials");
    const collection = db.collection("credentials");

    const totalItems = await collection.countDocuments({ userId }); // Nombre total d'éléments

    let results;

    if (filter === "all") {

        results = await collection
            .find({ userId })
            .sort({ [orderBy]: 1 })
            .skip(skip)
            .limit(limit)
            .toArray();

    } else if (filter === "favorites") {

        results = await collection
            .find({ userId, favorite: true })
            .sort({ [orderBy]: 1 })
            .skip(skip)
            .limit(limit)
            .toArray();

    }

    res.json({
        totalItems,
        results,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
    });
});

// Modification du statut favori d'un credential pour un utilisateur
credentialRouter.post("/credential/favorite/:idCredential/:userId", async (req, res) => {
    console.log("/credential/favorite/:idCredential/:userId")
    const _id = req.params.idCredential;
    const favorite = req.body.favorite;
    const userId = parseInt(req.params.userId, 10);
    const db = client_mongo.db("credentials");
    const result = await db.collection("credentials").updateOne(
        { _id: new ObjectId(_id), userId } as any,
        { $set: { favorite } }
    );
    res.json(result);
})

// Modification d'un crédential pour un utilisateur
credentialRouter.post("/credential/:idCredential/:userId", async (req, res) => {
    console.log("/credential/:idCredential/:userId")
    const db = client_mongo.db("credentials");
    const result = await db.collection("credentials").updateOne(
        { _id: new ObjectId(req.params.idCredential), userId: parseInt(req.params.userId, 10) },
        {
            $set: {
                title: req.body.title,
                mail: req.body.mail,
                passwordEncrypted: req.body.passwordEncrypted,
                url: req.body.url
            }
        }
    );
    res.json(result);
})

// Récupération de toutes les catégories d'un utilisateur
credentialRouter.get("/categories/:userId", async (req, res) => {
    console.log("/categories/:userId")
    const userId = parseInt(req.params.userId, 10);
    const db = client_mongo.db("credentials");
    const result = await db.collection("credentials").distinct("category", { userId });
    res.json(result);
})

export { credentialRouter };