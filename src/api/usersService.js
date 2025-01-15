import axios from "axios";

export const fetchUsers = async () => {
  try {
    const response = await axios.get("/users.json");
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users.");
  }
};
