// src/utils/api.js
const API_BASE_URL = "http://localhost:3000/api";

// Helper function to get token
const getToken = () => localStorage.getItem("token");

// Helper function to get headers
const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json"
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

// Auth APIs
export const authAPI = {
  signup: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  login: async (data) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

// Announcement APIs
export const announcementAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/announcements`, {
      headers: getHeaders()
    });
    return response.json();
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/announcements`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/announcements/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/announcements/${id}`, {
      method: "DELETE",
      headers: getHeaders()
    });
    return response.json();
  }
};

// Complaint APIs
export const complaintAPI = {
  getMyComplaints: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(
      `${API_BASE_URL}/mycomplaints?${queryString}`,
      {
        headers: getHeaders()
      }
    );
    return response.json();
  },

  createComplaint: async (data) => {
    const response = await fetch(`${API_BASE_URL}/mycomplaints`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

// Dashboard APIs
export const dashboardAPI = {
  getAllComplaints: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/complaints`, {
      headers: getHeaders()
    });
    return response.json();
  }
};

// Logout utility
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};