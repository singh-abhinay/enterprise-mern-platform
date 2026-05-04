import api from "./axios";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post("/auth/refresh");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const requestPasswordReset = async (email) => {
  try {
    await api.post("/auth/request-password-reset", { email });
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    await api.post("/auth/reset-password", { token, newPassword });
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
