import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

// Generate or reuse device id
const getDeviceId = () => {
     let deviceId = localStorage.getItem("device_id");

     if (!deviceId) {
          deviceId = uuidv4();
          localStorage.setItem("device_id", deviceId);
     }

     return deviceId;
};

// Detect device type
const getDeviceType = () => {
     const ua = navigator.userAgent.toLowerCase();

     if (/mobile|android|iphone/.test(ua)) return "MOBILE";
     if (/tablet|ipad/.test(ua)) return "TABLET";

     // laptops + desktops both fall here
     return "DESKTOP";
};

export const useDeviceInfo = () => {
     const deviceInfo = useMemo(() => {
          return {
               device_id: getDeviceId(),
               device_type: getDeviceType(), // DESKTOP / MOBILE
          };
     }, []);

     return deviceInfo;
};
