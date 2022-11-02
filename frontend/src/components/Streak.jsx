export default function streak(props) {
  return (
    <div>
      <p>Streak: {props.streak.currentCount}</p>
      <p>Last Login: {props.streak.lastLoginDate}</p>
      <p>Start Date: {props.streak.startDate}</p>
    </div>
  );
}
