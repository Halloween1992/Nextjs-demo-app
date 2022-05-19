import classes from "./MeetUpDetails.module.css";

const MeetUpDetails = (props) => {
  return (
    <section className={classes.details}>
      <img src={props.image} />
      <div>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <address>{props.address}</address>
      </div>
    </section>
  );
};

export default MeetUpDetails;
