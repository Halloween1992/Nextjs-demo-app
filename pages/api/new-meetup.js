// import dbConfig from "../../helpers/dbConfig";
import { MongoClient } from "mongodb";

// ourdomain/api/new-meetup
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://Sayed1992:Untankidps1mdb@cluster0.amry1.mongodb.net/meetups"
    );

    const db = client.db();
    const meetupCollection = db.collection("meetups");

    // const meetupCollection = await dbConfig();
    const result = await meetupCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "meetup added" });
  }
}

export default handler;
