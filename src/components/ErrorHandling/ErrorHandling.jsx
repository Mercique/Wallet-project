import { DropSvg } from "../DropSvg/DropSvg";

export const ErrorHandling = ({ classes, value }) => {
  return (
    <div className={classes}>
      <span>{value}</span>
      <DropSvg />
    </div>
  );
};
