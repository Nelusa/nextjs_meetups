import MeetupDetail from "@/components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    `mongodb+srv://Nelusa:wyCPkcLwJpuHiXQr@cluster0.lk0nr4k.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const myObjectId = new ObjectId(meetupId);

  const meetup = await db.collection("meetups").findOne({ _id: myObjectId }); //hledáme jeden meetup podle ID
  console.log(meetup);

  client.close();

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        image: meetup.image,
      },
    },
  };
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://Nelusa:wyCPkcLwJpuHiXQr@cluster0.lk0nr4k.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetups = await db.collection("meetups").find({}, { _id: 1 }).toArray(); //prázdný objekt jako první argument znamená, že nemáme žádná definovaná filter kritéria (chceme hledat vše); druhý argument specifikuje, kterou property chceme extrahovat, a jako hodnotu ji nastavíme - v tomto případě - jedničku, což znamená, že chceme zahrnout pouze id, ale žádné jiné hodnoty

  console.log(meetups);

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
    /* paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ], */
  };
}

export default MeetupDetails;
