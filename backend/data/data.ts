import pg from "pg";
import { MongoClient } from "mongodb";

const { Client } = pg;

const client_pg = new Client("postgres://root:root@db-user:5432/mydb");
const client_mongo = new MongoClient("mongodb://root:root@db-mongo:27017");

async function connectDB_pg() {
  try {
    await client_pg.connect();
    console.log("Connecté à la base de données PG");
  } catch (err) {
    console.error("Erreur de connexion à la base de données:", err);
  }
}

async function connectDB_mongo() {
  try {
    await client_mongo.connect();
    console.log("Connecté à la base de données MongoDB");
  } catch (err) {
    console.error("Erreur de connexion à la base de données:", err);
  }
}

connectDB_pg();
connectDB_mongo();

export { client_pg, client_mongo };
