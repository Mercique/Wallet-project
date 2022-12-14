export const Profile = ({ userAuth, onLogout }) => {
  return (
    <>
      <h1>Profile</h1>
      <div>
        <p>{userAuth?.name}</p>
        <p>{userAuth?.email}</p>
        <p>{userAuth?.pass}</p>
      </div>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </>
  );
};
