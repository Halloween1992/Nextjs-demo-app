import { ObjectId } from "mongodb";
import MeetUpDetails from "../../components/meetups/MeetupDetials";
import dbConfig from "../../helpers/dbConfig";
import Head from "next/dist/shared/lib/head";

const DetailsPage = (props) => {
  const { image, title, description, address } = props.meetupData;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
      </Head>
      <MeetUpDetails
        image={image}
        title={title}
        description={description}
        address={address}
      />
    </>
  );
};

export async function getStaticPaths() {
  const { meetupCollection, client } = await dbConfig();
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetUpId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const { meetUpId } = context.params;
  const { meetupCollection, client } = await dbConfig();

  const singleMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetUpId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: singleMeetup._id.toString(),
        image: singleMeetup.image,
        description: singleMeetup.description,
        title: singleMeetup.title,
        address: singleMeetup.address,
      },
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(req,res){

//   // fetch data from API
//   const { meetUpId } = context.params;

//   return {
//     props: {
//       meetupData: {
//         id: meetUpId,
//         image:
//           "https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg",
//         title: "my first meetup",
//         description: "first meetup with my friends in downtown",
//         address: "some address in some city",
//       },
//     },
//     revalidate: 10,
//   };

// }
export default DetailsPage;
