import { useState, useCallback } from "react";
import { fetchUserDropdowns } from "../services/dropdownService";

export const useUserDropdowns = () => {
     const [dropdowns, setDropdowns] = useState({
          roles: [],
          designations: [],
          teams: [],
          projectManagers: [],
          assistantManagers: [],
          qas: [],
          agents: [],
     });

     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);

     const loadDropdowns = useCallback(async () => {
          setLoading(true);
          setError(null);

          try {
               const data = await fetchUserDropdowns();

               // ✅ VALIDATION GUARD
               const isValid =
                    Array.isArray(data.roles) &&
                    Array.isArray(data.designations) &&
                    Array.isArray(data.teams) &&
                    Array.isArray(data.projectManagers) &&
                    Array.isArray(data.assistantManagers) &&
                    Array.isArray(data.qas) &&
                    Array.isArray(data.agents);

               if (!isValid) {
                    console.warn("⚠️ Invalid dropdown response:", data);
                    return;
               }

               setDropdowns(prev => ({
                    ...prev,
                    ...data,
               }));
          } catch (err) {
               console.error("Dropdown fetch failed:", err);
               setError(err);
          } finally {
               setLoading(false);
          }
     }, []);

     return {
          dropdowns,
          loading,
          error,
          loadDropdowns,
     };
};
