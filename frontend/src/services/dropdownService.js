import api from "./api";

/**
 * Generic dropdown fetcher
 * @param {string} dropdownType
 */
export const fetchDropdown = async (dropdownType) => {
     const response = await api.post("/dropdown/get", {
          dropdown_type: dropdownType
     });

     return response.data?.data || [];
};

/**
 * Fetch all dropdowns required for Add User
 */
export const fetchUserDropdowns = async () => {
     const [roles, designations, reportingManagers] = await Promise.all([
          fetchDropdown("user_roles"),
          fetchDropdown("designations"),
          fetchDropdown("reporting_managers")
     ]);

     return {
          roles,
          designations,
          reportingManagers
     };
};
