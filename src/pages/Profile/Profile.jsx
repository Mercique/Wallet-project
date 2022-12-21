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
        <p>Id: <span style={{ color: "red" }}>{userAuth?.id}</span></p>
        <p>Name: <span style={{ color: "red" }}>{userAuth?.name}</span></p>
        <p>Surname: <span style={{ color: "red" }}>{userAuth?.surname}</span></p>
        <p>E-mail: <span style={{ color: "red" }}>{userAuth?.email}</span></p>
      </div>
      <button type="button" onClick={onLogout}>Logout</button>
    </>
  );
};
