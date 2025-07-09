import { Router } from "express";
import { client_mongo } from "../data/data.js";
import { ObjectId } from "mongodb";
import { userRouter } from "./userRouter.js";
import { fieldRouter } from "./fieldRouter.js";
import { credentialRouter } from "./credentialRouter.js";

const router = Router();

router.use(userRouter);
router.use(credentialRouter);
router.use(fieldRouter);

// Suppression d'un crédential et des ces fields pour un utilisateur
router.delete("/credential/delete/:idCredential/:userId", async (req, res) => {
  console.log("/credential/delete/:idCredential/:userId");
  const userId = parseInt(req.params.userId, 10);
  const idCredential = req.params.idCredential;
  const dbCredential = client_mongo.db("credentials");
  const result = await dbCredential.collection("credentials").deleteOne({ _id: new ObjectId(idCredential), userId });
  const dbFields = client_mongo.db("fields");
  await dbFields.collection("fields").deleteOne({ credentialId: idCredential, userId });
  res.json(result);
});

// Création
router.post("/credential", async (req, res) => {
  const dbCredential = client_mongo.db("credentials");
  const result = await dbCredential.collection("credentials").insertOne({
    userId: 1,
    title: req.body.title,
    mail: req.body.mail,
    category: req.body.category,
    passwordEncrypted: req.body.passwordEncrypted,
    url: req.body.url,
    favorite: req.body.favorite,
    iconify: req.body.iconify,
  });

  const dbFields = client_mongo.db("fields");
  await dbFields.collection("fields").insertOne({
    userId: 1,
    credentialId: result.insertedId.toString(),
    fieldConfig: [],
    created_at: new Date(),
    updated_at: new Date()
  });
  res.json(result);
})

export { router };


