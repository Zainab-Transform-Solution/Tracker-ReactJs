import api from "./api";

/**
 * Generic dropdown fetcher
 * @param {string} dropdownType
 */
export const fetchDropdown = async (dropdownType) => {
     const response = await api.post("/dropdown/get", {
          dropdown_type: dropdownType,
     });

     return response.data?.data || [];
};

/**
 * Fetch all dropdowns required across modules
 */
export const fetchUserDropdowns = async () => {
     const [
          roles,
          designations,
          teams,
          projectManagers,
          assistantManagers,
          qas,
          agents,
     ] = await Promise.all([
          fetchDropdown("user roles"),
          fetchDropdown("designations"),
          fetchDropdown("teams"),
          fetchDropdown("project manager"),
          fetchDropdown("assistant manager"),
          fetchDropdown("qa"),
          fetchDropdown("agent"),
     ]);

     return {
          roles,
          designations,
          teams,
          projectManagers,
          assistantManagers,
          qas,
          agents,
     };
};
