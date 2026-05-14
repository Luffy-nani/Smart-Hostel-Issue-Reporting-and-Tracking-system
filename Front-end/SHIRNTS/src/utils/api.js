// src/utils/api.js
const API_BASE_URL = "http://localhost:3000/api";

const getToken = () => localStorage.getItem("token");

const getHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

// ✅ Centralized response handler
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
};

// Auth APIs
export const authAPI = {
  signup: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  login: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  }
};

// Announcement APIs
export const announcementAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/announcements`, {
      headers: getHeaders()
    });
    return handleResponse(response);
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/announcements`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/announcements/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/announcements/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    return handleResponse(response);
  }
};

// Complaint APIs
export const complaintAPI = {
  getMyComplaints: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/mycomplaints?${queryString}`, {
      headers: getHeaders()
    });
    return handleResponse(response);
  },

  createComplaint: async (data) => {
    const response = await fetch(`${API_BASE_URL}/mycomplaints`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  }
};

// Dashboard APIs
export const dashboardAPI = {
  getAllComplaints: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/complaints`, {
      headers: getHeaders()
    });
    return handleResponse(response);
  }
};

// Logout utility
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const getUser = () => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

// Keep getCurrentUser as alias for backward compatibility
export const getCurrentUser = getUser;

export const isAuthenticated = () => !!getToken();  