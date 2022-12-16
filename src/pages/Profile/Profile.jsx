export const Profile = ({ userAuth, onLogout }) => {
  return (
    <>
      <h1>Profile</h1>
      <div>
        <p>{userAuth?.name}</p>
        <p>{userAuth?.email}</p>
        <p>{userAuth?.pass}</p>
      </div>
      <form action="#">
        <button type="submit" onClick={onLogout}>
          Logout
        </button>
      </form>
    </>
  );
};
