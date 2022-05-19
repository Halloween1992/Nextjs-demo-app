import { MongoClient } from "mongodb";

const dbConfig = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://Sayed1992:Untankidps1mdb@cluster0.amry1.mongodb.net/meetups"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");

  //   client.close();
  return { meetupCollection, client };
};

export default dbConfig;
