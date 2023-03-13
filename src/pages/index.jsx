import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const inter = Inter({ subsets: ["latin"] });

/* const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "This is a first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
  {
    id: "m2",
    title: "This is a second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Meetupstreet 5, 12345 Meetup City",
    description:
      "This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!",
  },
]; */

export default function Home(props) {
  return (
    <>
      <Head>
        <title>React Meetups Summary</title>
        <meta
          name="description"
          content="Browse a huge list of React Meetups for all Frontend Developers!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>The Home Page</h1>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

/* export async function getServerSideProps(context) {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
} */

export async function getStaticProps() {
  // kód zde nikdy neskončí na straně klienta
  //fetch data from an API

  const client = await MongoClient.connect(
    `mongodb+srv://Nelusa:wyCPkcLwJpuHiXQr@cluster0.lk0nr4k.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  const db = client.db();

  const meetups = await db.collection("meetups").find().toArray();

  console.log(meetups);

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1800,
  };
}
