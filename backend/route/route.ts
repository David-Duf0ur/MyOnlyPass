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

router.delete("/credential/delete/:id", async (req, res) => {
  const dbCredential = client_mongo.db("credentials");
  const result = await dbCredential.collection("credentials").deleteOne({ _id: new ObjectId(req.params.id) });
  const dbFields = client_mongo.db("fields");
  await dbFields.collection("fields").deleteOne({ credentialId: req.params.id });
  res.json(result);
})

router.post("/credential", async (req, res) => {
  const dbCredential = client_mongo.db("credentials");
  const result = await dbCredential.collection("credentials").insertOne({
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


