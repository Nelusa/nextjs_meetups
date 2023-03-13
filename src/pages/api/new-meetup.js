import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      `mongodb+srv://Nelusa:wyCPkcLwJpuHiXQr@cluster0.lk0nr4k.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    const result = await db.collection("meetups").insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup added!" });
  }
}
