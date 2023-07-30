import { MongoClient } from "mongodb";
import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    console.log("Open connection to database ...")
    client = await connectDatabase();
  } catch (error) {
    console.log("catch error connectDatabase");
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    // add server-side validation
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(412).json({ message: "Invalid input" });
      client.close();
      return;
    }

    //console.log(email, name, text, eventId);
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    console.log(newComment);

    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment.id = result.insertedId;

      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      console.log("catch error insertDocument");
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  if (req.method === "GET") {
    /* const dummyList = [
      { id: "c1", name: "Max", text: "A first comment" },
      { id: "c2", name: "Max", text: "A second comment" },
    ]; */

    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 }, { eventId: eventId });
      res.status(200).json({ comments: documents });
    } catch (error) {
      console.log("catch error getAllDocuments");
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }

  client.close();
}

export default handler;
