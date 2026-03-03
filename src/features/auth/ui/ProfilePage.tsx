import { useGetMeQuery } from "../api/authApi";

export const ProfilePage = () => {
  const { data } = useGetMeQuery();

  return (
    <div>
      <h1>Profile page</h1>
      <div>
        <p>Hello, {data?.login}.</p>
        <p>This is your userID: {data?.userId}</p>
      </div>
    </div>
  );
};
