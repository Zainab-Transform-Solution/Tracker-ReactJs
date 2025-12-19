// src/services/projectService.js
import api from "./api";

/**
 * Create Project API
 * @param {Object} payload
 */
export const createProject = async (payload) => {
  const res = await api.post("/project/create", payload);
  return res.data;
};
