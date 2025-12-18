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


export const fetchUsersByRole = async (role) => {
  const response = await api.post("/user/list", {
    role
  });

  return response.data; // { data, message, status }
};

export const updateUser = async (userData) => {
     try {
          const response = await api.put('/user/update_user', userData);
          return response.data;
     } catch (error) {
          console.error('Error updating user:', error);
          throw error;
     }
};

export const deleteUser = async (user_id) => {
  return await api.put("/user/delete_user", {
    user_id
  });
};

