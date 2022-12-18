import { useDispatch, useSelector } from "react-redux";
import { unAuthUser } from "../../store/profile/actions";
import { selectUser } from "../../store/profile/selectors";

export const Profile = () => {
  const dispatch = useDispatch();
  const userAuth = useSelector(selectUser);

  const onLogout = () => {
    dispatch(unAuthUser());
  };
  
  return (
    <>
      <h1>Profile</h1>
      <div>
        <p>{userAuth?.email}</p>
        <p>{userAuth?.pass}</p>
      </div>
      <button type="button" onClick={onLogout}>Logout</button>
    </>
  );
};
