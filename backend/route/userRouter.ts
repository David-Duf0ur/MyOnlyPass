import { Router } from "express";
import { client_pg } from "../data/data.js";

const userRouter = Router();

userRouter.get("/user", async (_req, res) => {
    const result = await client_pg.query("SELECT * FROM users");
    res.json(result.rows);
})

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


userRouter.post("/login", async (req, res) => {
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

userRouter.post("/register", async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    const preparedQuery = {
        text: `INSERT INTO users (email, password, firstname, lastname) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`,
        values: [email, password, firstname, lastname],
    };
    try {
        const result = await client_pg.query(preparedQuery);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export { userRouter };