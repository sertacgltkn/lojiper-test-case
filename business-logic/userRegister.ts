import axios from "axios";
import { fetchUsers } from "./userValidation";
import { User, currentUser } from "@/app/Interfaces/uiRelatedTypes";

export const saveUser = async (user: User) => {
  try {
    const allUserData = await fetchUsers();
    const userWithSameUsername = allUserData?.find(
      (userTest: currentUser) => user.username === userTest.username
    );

    if (userWithSameUsername) {
      return false;
    } else {
      const response = await axios.post("/api/", user);
      if (response.status === 201) {
      }
      return true;
    }
  } catch (error) {
    return false;
  }
};
