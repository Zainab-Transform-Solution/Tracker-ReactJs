// layouts/AppLayout.jsx
import React from "react";
import Header from "../components/header/Header";
import { ViewState } from "../utils/constants";
import { useUser } from "../context/UserContext"; // Import the hook

const AppLayout = ({ children }) => {
  // Get user and permissions from context
  const { 
    currentUser, 
    isAgent, 
    canAccessManage, 
    canAccessQuality, 
    canAccessEntry 
  } = useUser();

  return (
    <>
      <Header
        currentUser={currentUser}
        currentView={ViewState.DASHBOARD}
        setCurrentView={() => { }}
        handleLogout={() => alert("Logout clicked! (Dummy mode)")}
        canAccessEntry={canAccessEntry}
        canAccessManage={canAccessManage}
        canAccessQuality={canAccessQuality}
        isAgent={isAgent}
        ViewState={ViewState}
      />

      {/* page content */}
      <main className="p-6 bg-slate-50">
        {children}
      </main>
    </>
  );
};

export default AppLayout;