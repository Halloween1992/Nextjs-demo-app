import dbConfig from "../helpers/dbConfig";

import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

const Home = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="A huge list of meetups, that brigs opportunity for greate networking"
        ></meta>
      </Head>
      <h1>All meetups</h1>
      <MeetupList meetups={props.meetupList} />
    </>
  );
};

export async function getServerSideProps(req, res) {
  //herlper fucntion
  const { meetupCollection, client } = await dbConfig();

  const meetUpList = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetupList: meetUpList.map((meetup) => {
        return {
          id: meetup._id.toString(),
          image: meetup.image,
          address: meetup.address,
          title: meetup.title,
        };
      }),
    },
  };
}

// export async function getStaticProps() {
//   const client = await MongoClient.connect(
//     "mongodb+srv://Sayed1992:Untankidps1mdb@cluster0.amry1.mongodb.net/meetups"
//   );

//   const db = client.db();
//   const meetupCollection = db.collection("meetups");

//   const meetUpList = await meetupCollection.find().toArray();

//   return {
//     props: {
//       meetupList: meetUpList.map((meetup) => {
//         return {
//           id: meetup._id.toString(),
//           image: meetup.image,
//           address: meetup.address,
//           title: meetup.title,
//         };
//       }),
//     },
//     revalidate: 10,
//   };
// }

export default Home;
