import { useState, useCallback } from "react";
import { fetchUserDropdowns } from "../services/dropdownService";

export const useUserDropdowns = () => {
     const [dropdowns, setDropdowns] = useState({
          roles: [],
          designations: [],
          reportingManagers: []
     });

     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);

     const loadDropdowns = useCallback(async () => {
          setLoading(true);
          setError(null);

          try {
               const data = await fetchUserDropdowns();
               setDropdowns(data);
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
          loadDropdowns
     };
};
