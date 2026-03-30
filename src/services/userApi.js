
// services/userApi.js

const BASE_URL = "https://69a7bb832cd1d055269167fa.mockapi.io/api/v1/users";

// GET USERS
export const getUsers = async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
};

// CREATE USER
export const createUser = async (userData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("STATUS:", response.status);

    const data = await response.json();
    console.log("RESPONSE:", data);

    return data;
  } catch (error) {
    console.log("ERROR:", error);
  }
};

// UPDATE USER
export const updateUser = async (id, userData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return data;
};

// DELETE USER
export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();
  return data;
};
