import { connectDatabase, insertDocument } from "../../helpers/db-util";
import { MongoClient } from "mongodb";

async function handler(req, res) {
  console.log("----- newsletter API -----");
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      console.log("catch error connectDatabase");
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      console.log("catch error insertDocument");
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
