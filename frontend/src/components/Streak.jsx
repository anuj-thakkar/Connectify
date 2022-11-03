export default function streak(props) {
  return (
    <div>
      <p>
        login streak: {props.streak.currentCount}
        &emsp; last login: {props.streak.lastLoginDate}
        &emsp; start date: {props.streak.startDate}
      </p>
    </div>
  );
}
