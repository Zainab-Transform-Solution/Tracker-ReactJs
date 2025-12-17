import api from "./api";

export const loginUser = async (username, password) => {
  const response = await api.post("/auth/user", {
    user_email: username,      
    user_password: password    
  });

  return response.data;
};

// Add this function for creating a new user
export const addUser = async (userData) => {
  const response = await api.post("/auth/user", userData);
  return response.data;
};