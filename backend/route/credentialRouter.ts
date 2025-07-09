import { Router } from "express";
import { client_mongo } from "../data/data.js";
import { ObjectId } from "mongodb";

const credentialRouter = Router();

credentialRouter.get("/credentials/full/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const db = client_mongo.db("credentials");
    const result = await db.collection("credentials").find({ userId }).toArray();
    res.json(result);
})

credentialRouter.get("/credentials/favorites", async (_req, res) => {
    const db = client_mongo.db("credentials");
    const result = await db.collection("credentials").find({ favorite: true }).toArray();
    res.json(result);
})

credentialRouter.get("/credentials/:page/:limit", async (req, res) => {
    const page = parseInt(req.params.page, 10) || 1;      // Numéro de page (par défaut 1)
    const limit = parseInt(req.params.limit, 10) || 5;   // Nombre d'éléments par page (par défaut 4)
    const skip = (page - 1) * limit;

    const db = client_mongo.db("credentials");
    const collection = db.collection("credentials");

    const totalItems = await collection.countDocuments(); // Nombre total d'éléments
    const results = await collection
        .find()
        .skip(skip)
        .limit(limit)
        .toArray();

    res.json({
        totalItems,
        results,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
    });
});

credentialRouter.post("/credential/favorite/:id", async (req, res) => {
    const _id = req.params.id;
    const favorite = req.body.favorite;
    const db = client_mongo.db("credentials");
    const result = await db.collection("credentials").updateOne(
        { _id: new ObjectId(_id) } as any,
        { $set: { favorite } }
    );
    res.json(result);
})

credentialRouter.post("/credential/:id", async (req, res) => {
    const db = client_mongo.db("credentials");
    const result = await db.collection("credentials").updateOne(
        { _id: new ObjectId(req.params.id) },
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

export { credentialRouter };