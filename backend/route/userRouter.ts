import { Router } from "express";
import { client_pg } from "../data/data.js";

const userRouter = Router();

// POUR LE DEV
userRouter.get("/user", async (_req, res) => {
    const result = await client_pg.query("SELECT * FROM users");
    res.json(result.rows);
})

// Modification de son avatar pour un utilisateur
userRouter.post("/user/:idUser/avatar/:avatar", async (req, res) => {
    console.log("/user/:idUser/avatar/:avatar")
    const { idUser, avatar } = req.params;
    const preparedQuery = {
        text: `UPDATE users 
            SET avatar = $1 
            WHERE id_user = $2 
            RETURNING *`,
        values: [avatar, idUser],
    };
    const result = await client_pg.query(preparedQuery);
    const user = result.rows[0];

    res.json(user);
})

// Modification des informations d'un utilisateur
userRouter.patch("/user/:idUser", async (req, res) => {
    console.log("/user/:idUser")
    const { idUser } = req.params;
    const { firstname, lastname } = req.body;
    const preparedQuery = {
        text: `UPDATE users 
            SET firstname = $1, lastname = $2 
            WHERE id_user = $3 
            RETURNING *`,
        values: [firstname, lastname, idUser],
    };
    const result = await client_pg.query(preparedQuery);
    const user = result.rows[0];
    res.json(user);
})

// Login route pour la connexion d'un utilisateur
userRouter.post("/login", async (req, res) => {
    console.log("/login")
    const { email, password } = req.body;
    const preparedQuery = {
        text: `SELECT * 
			FROM users 
			WHERE email = $1
            `,
        values: [email],
    };
    const result = await client_pg.query(preparedQuery);
    const user = result.rows[0];

    if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
    }

    if (user.password !== password) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
    }

    res.json(user);
})

// Register route pour la création d'un nouvel utilisateur
userRouter.post("/register", async (req, res) => {
    console.log("/register")
    const { email, password, firstname, lastname } = req.body;
    const preparedQuery = {
        text: `INSERT INTO users (email, password, firstname, lastname, avatar) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
        values: [email, password, firstname, lastname, 1],
    };
    try {
        const result = await client_pg.query(preparedQuery);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// Delete un compte utilisateur
userRouter.delete("/user/:idUser", async (req, res) => {
    console.log("/user/:idUser")
    const { idUser } = req.params;
    const preparedQuery = {
        text: `DELETE FROM users 
            WHERE id_user = $1 
            RETURNING *`,
        values: [idUser],
    };
    try {
        const result = await client_pg.query(preparedQuery);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export { userRouter };