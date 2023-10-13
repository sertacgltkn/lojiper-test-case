import axios from "axios";
import { currentUser, User } from "../app/Interfaces/uiRelatedTypes";

export const fetchUsers = async () => {
  const response = await axios.get("/api/");
  if (response.status === 200) {
    return response.data;
  }
};

export async function validateUserLogin(
  username: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setUserName: React.Dispatch<React.SetStateAction<string>>,
  setUserGender: React.Dispatch<React.SetStateAction<string>>
): Promise<User | undefined> {
  try {
    setIsLoading(true);
    const allUserData = await fetchUsers();
    const user: User | undefined = allUserData?.find(
      (user: currentUser) => user.username === username
    );

    if (user && user.password === password) {
      setIsLoading(false);
      setError("");
      setIsLogin(true);
      setUserName(user.firstName);
      setUserGender(user.gender);
      return user;
    } else {
      setIsLoading(false);
      setError("Kullanıcı adı veya parola hatalı");
    }
  } catch (error) {
    setIsLoading(false);
    setError("Kullanıcı adı veya parola hatalı");
  }
}
