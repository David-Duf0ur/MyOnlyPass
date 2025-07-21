import { Router } from "express";
import { client_mongo } from "../data/data.js";
import { ICredentialFields, IField } from "../types/interfaces.js";

const fieldRouter = Router();

// Récupération de tous les fields d'un credential pour un utilisateur
fieldRouter.get("/fields/:idUser/:idCredential", async (req, res) => {
    console.log("/fields/:idUser/:idCredential");
    const credentialId = req.params.idCredential;
    const userId = parseInt(req.params.idUser, 10);
    const db = client_mongo.db("fields");
    const result = await db.collection("fields").find({ credentialId, userId }).toArray();
    res.json(result);
})

// Création d'un nouveau field pour un credential d'un utilisateur
fieldRouter.post("/credential/fields/:idCredential/:idUser", async (req, res) => {
    console.log("/credential/fields/:idCredential/:idUser");
    const credentialId = req.params.idCredential;
    const userId = parseInt(req.params.idUser, 10);
    const newField: IField = {
        name: req.body.name,
        value: req.body.value,
        required: req.body.required || false,
    };

    const db = client_mongo.db("fields");
    const fieldsCollection = db.collection<ICredentialFields>("fields");

    const existingFields = await db.collection<ICredentialFields>("fields").findOne({ credentialId, userId });

    if (existingFields && existingFields.fieldConfig.length > 0) {
        const result = await fieldsCollection.updateOne(
            { credentialId, userId },
            { $push: { fieldConfig: newField } }
        );
        res.json(result);
    }

    if (existingFields && existingFields.fieldConfig.length === 0) {
        const result = await fieldsCollection.updateOne(
            { credentialId, userId },
            { $set: { fieldConfig: [newField] } }
        );
        res.json(result);
    }
});

// Modification d'un field d'un credential pour un utilisateur
fieldRouter.post("/credential/fields/:idCredential/:fieldName/:idUser", async (req, res) => {
    console.log("/credential/fields/:idCredential/:fieldName/:idUser");
    const credentialId = req.params.idCredential;
    const fieldName = req.params.fieldName;
    const userId = parseInt(req.params.idUser, 10);

    const updatedField = {
        name: req.body.name,
        value: req.body.value,
        required: req.body.required,
    };

    console.log('$$', updatedField)

    const db = client_mongo.db("fields");
    const dbFields = db.collection<ICredentialFields>("fields");

    const result = await dbFields.updateOne(
        { credentialId, "fieldConfig.name": fieldName, userId },
        {
            $set: {
                "fieldConfig.$.name": updatedField.name,
                "fieldConfig.$.value": updatedField.value,
                "fieldConfig.$.required": updatedField.required,
            }
        }
    );

    res.json({ message: "Field updated successfully", result });
});

// Suppression d'un field d'un credential pour un utilisateur
fieldRouter.delete("/field/:idCredential/:fieldName/:idUser", async (req, res) => {
    const credentialId = req.params.idCredential;
    const fieldName = req.params.fieldName.trim();
    const userId = parseInt(req.params.idUser, 10);
    const dbFields = client_mongo.db("fields");
    const result = await dbFields.collection("fields").updateOne(
        { credentialId, userId },
        { $pull: { fieldConfig: { name: fieldName } } } as any
    );
    res.json(result);
});

export { fieldRouter };