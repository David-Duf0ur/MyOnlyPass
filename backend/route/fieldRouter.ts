import { Router } from "express";
import { client_mongo } from "../data/data.js";
import { ICredentialFields, IField } from "../types/interfaces.js";

const fieldRouter = Router();


fieldRouter.get("/credentials/fields", async (_req, res) => {
    const db = client_mongo.db("fields");
    const result = await db.collection("fields").find().toArray();
    res.json(result);
})

fieldRouter.get("/credentials/fields/toto/:idCredential", async (req, res) => {
    const db = client_mongo.db("fields");
    const result = await db.collection("fields").find({ credentialId: req.params.idCredential }).toArray();
    res.json(result);
})

fieldRouter.post("/credential/fields/:idCredential", async (req, res) => {
    const credentialId = req.params.idCredential;
    const newField: IField = {
        name: req.body.name,
        value: req.body.value,
        required: req.body.required || false,
    };

    const db = client_mongo.db("fields");
    const fieldsCollection = db.collection<ICredentialFields>("fields");

    const existingFields = await db.collection<ICredentialFields>("fields").findOne({ credentialId });

    if (existingFields && existingFields.fieldConfig.length > 0) {
        const result = await fieldsCollection.updateOne(
            { credentialId },
            { $push: { fieldConfig: newField } }
        );
        res.json(result);
    }

    if (existingFields && existingFields.fieldConfig.length === 0) {
        const result = await fieldsCollection.updateOne(
            { credentialId },
            { $set: { fieldConfig: [newField] } }
        );
        res.json(result);
    }
});

fieldRouter.post("/credential/fields/:idCredential/:fieldName", async (req, res) => {
    const credentialId = req.params.idCredential;
    const fieldName = req.params.fieldName;

    const updatedField = {
        name: req.body.name,
        value: req.body.value,
        required: req.body.required,
    };

    const db = client_mongo.db("fields");
    const dbFields = db.collection<ICredentialFields>("fields");

    const result = await dbFields.updateOne(
        { credentialId, "fieldConfig.name": fieldName },
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

fieldRouter.delete("/field/:idCredential/:fieldName", async (req, res) => {
    const credentialId = req.params.idCredential;
    const fieldName = req.params.fieldName.trim();
    const dbFields = client_mongo.db("fields");
    const result = await dbFields.collection("fields").updateOne(
        { credentialId },
        { $pull: { fieldConfig: { name: fieldName } } } as any
    );
    res.json(result);
});

export { fieldRouter };