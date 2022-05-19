import { useRouter } from "next/dist/client/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/dist/shared/lib/head";

const NewMeetUp = () => {
  const route = useRouter();

  const meetUpDataHandler = async (meetUpData) => {
    try {
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(meetUpData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      if (!response.ok) throw new Error(response.statusText);

      const data = response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }

    route.replace("/");
  };

  return (
    <>
      <Head>
        <title>Add a new Meetup</title>
        <meta name="description" content="Add your favourite meetup"></meta>
      </Head>
      <h1>Add new meetup</h1>
      <NewMeetupForm onAddMeetup={meetUpDataHandler} />
    </>
  );
};

export default NewMeetUp;
