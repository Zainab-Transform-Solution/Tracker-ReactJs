// // Responsive Layout

// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   PenTool,
//   Database,
//   LogOut,
//   Settings,
//   Award,
//   CalendarClock,
//   BookOpen,
//   Menu,
//   X
// } from "lucide-react";

// import { useNavigate } from "react-router-dom";

// const Header = ({
//   currentUser,
//   currentView,
//   setCurrentView,
//   handleLogout,
//   canAccessEntry,
//   canAccessManage,
//   canAccessQuality,
//   isAgent,
//   ViewState
// }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   // Button renderer for desktop/tablet
//   const renderNavButton = (view, label, Icon) => (
//     <button
//       key={view}
//       onClick={() => {
//         setCurrentView(view);
//         setIsMobileMenuOpen(false);
//       }}
//       className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
//         currentView === view
//           ? "bg-blue-50 text-blue-700"
//           : "text-slate-600 hover:bg-slate-50"
//       }`}
//     >
//       <Icon className="w-4 h-4 flex-shrink-0" />
//       <span className="hidden md:inline">{label}</span>
//     </button>
//   );

//   // Button renderer for mobile drawer
//   const renderMobileNavButton = (view, label, Icon) => (
//     <button
//       key={view}
//       onClick={() => {
//         setCurrentView(view);
//         setIsMobileMenuOpen(false);
//       }}
//       className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors w-full ${
//         currentView === view
//           ? "bg-blue-50 text-blue-700"
//           : "text-slate-700 hover:bg-slate-50"
//       }`}
//     >
//       <Icon className="w-5 h-5 flex-shrink-0" />
//       <span>{label}</span>
//     </button>
//   );

//   // Navigation items configuration
//   const getNavItems = () => {
//     if (isAgent) {
//       return [
//         { view: ViewState.ENTRY, label: "Data Entry", icon: PenTool },
//         { view: ViewState.DASHBOARD, label: "Analytics", icon: LayoutDashboard },
//         { view: ViewState.SCHEDULER, label: "Roster", icon: CalendarClock },
//         { view: ViewState.GUIDELINES, label: "Guidelines", icon: BookOpen },
//       ];
//     } else {
//       const items = [
//         { view: ViewState.DASHBOARD, label: "Analytics", icon: LayoutDashboard },
//       ];
      
//       if (canAccessQuality) {
//         items.push({ view: ViewState.QUALITY, label: "Quality", icon: Award });
//       }
      
//       items.push(
//         { view: ViewState.SCHEDULER, label: "Scheduler", icon: CalendarClock }
//       );
      
//       if (canAccessManage) {
//         items.push({ view: ViewState.ADMIN_PANEL, label: "Manage", icon: Settings });
//       }
      
//       items.push(
//         { view: ViewState.GUIDELINES, label: "Guidelines", icon: BookOpen }
//       );
      
//       if (canAccessEntry) {
//         items.push({ view: ViewState.ENTRY, label: "Data Entry (Test)", icon: PenTool });
//       }
      
//       return items;
//     }
//   };

//   const navItems = getNavItems();

//   return (
//     <>
//       {/* Overlay for mobile menu */}
//       {isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             {/* Left Logo */}
//             <div className="flex items-center gap-2">
//               <div className="bg-blue-700 p-2 rounded-lg">
//                 <Database className="w-5 h-5 text-white" />
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-slate-800 leading-none">
//                   TFS Ops Tracker
//                 </span>
//                 <span className="text-xs text-slate-400 font-medium">
//                   {currentUser.role.replace("_", " ")} VIEW
//                 </span>
//               </div>
//             </div>

//             {/* Desktop Navigation - Hidden on mobile */}
//             <div className="hidden lg:flex space-x-1 items-center">
//               {navItems.map((item) => 
//                 renderNavButton(item.view, item.label, item.icon)
//               )}

//               {/* User + Logout */}
//               <div className="w-px h-6 bg-slate-200 mx-2"></div>

//               <div className="flex items-center gap-3 pl-2">
//                 <div className="text-right hidden sm:block">
//                   <p className="text-sm font-bold text-slate-700">
//                     {currentUser.name}
//                   </p>
//                   <p className="text-xs text-slate-400">
//                     {currentUser.designation || currentUser.role}
//                   </p>
//                 </div>

//                 <button
//                   onClick={handleLogout}
//                   className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
//                   title="Logout"
//                 >
//                   <LogOut className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             {/* Tablet Navigation - Icons only */}
//             <div className="hidden md:flex lg:hidden space-x-1 items-center">
//               {navItems.map((item) => (
//                 <button
//                   key={item.view}
//                   onClick={() => setCurrentView(item.view)}
//                   className={`p-2 rounded-md text-sm font-medium transition-colors ${
//                     currentView === item.view
//                       ? "bg-blue-50 text-blue-700"
//                       : "text-slate-600 hover:bg-slate-50"
//                   }`}
//                   title={item.label}
//                 >
//                   <item.icon className="w-5 h-5" />
//                 </button>
//               ))}

//               <div className="w-px h-6 bg-slate-200 mx-2"></div>

//               <div className="flex items-center gap-2 pl-2">
//                 <button
//                   onClick={handleLogout}
//                   className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
//                   title="Logout"
//                 >
//                   <LogOut className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="flex items-center md:hidden">
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="p-2 rounded-md text-slate-600 hover:bg-slate-50"
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="w-6 h-6" />
//                 ) : (
//                   <Menu className="w-6 h-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Drawer Menu */}
//       <div className={`
//         fixed top-0 right-0 h-full bg-white shadow-xl z-50
//         transform transition-transform duration-300 ease-in-out
//         ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
//         w-80 max-w-[85vw] md:hidden
//         border-l border-slate-200
//       `}>
//         <div className="p-6 h-full flex flex-col">
//           {/* User Info at top of drawer */}
//           <div className="pb-6 mb-6 border-b border-slate-200">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="bg-blue-700 p-2 rounded-lg">
//                 <Database className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h3 className="font-bold text-slate-800">{currentUser.name}</h3>
//                 <p className="text-sm text-slate-500">
//                   {currentUser.designation || currentUser.role}
//                 </p>
//               </div>
//             </div>
//             <p className="text-sm text-slate-400">
//               TFS Ops Tracker • {currentUser.role.replace("_", " ")} View
//             </p>
//           </div>

//           {/* Navigation Items */}
//           <div className="flex-1 space-y-2">
//             {navItems.map((item) => 
//               renderMobileNavButton(item.view, item.label, item.icon)
//             )}
//           </div>

//           {/* Logout Button at bottom */}
//           <div className="pt-6 mt-6 border-t border-slate-200">
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setIsMobileMenuOpen(false);
//               }}
//               className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
//             >
//               <LogOut className="w-5 h-5" />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;












import React, { useState } from "react";
import {
  LayoutDashboard,
  PenTool,
  Database,
  LogOut,
  Settings,
  Award,
  CalendarClock,
  BookOpen,
  Menu,
  X
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Header = ({
  currentUser,
  handleLogout,
  canAccessEntry,
  canAccessManage,
  canAccessQuality,
  isAgent,
  ViewState
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // -----------------------------
  // ROUTE MAP
  // -----------------------------
  const ROUTES = {
    DASHBOARD: "/dashboard",
    ADMIN_PANEL: "/admin",
    ENTRY: "/entry",
    GUIDELINES: "/guidelines",
    SCHEDULER: "/scheduler",
    QUALITY: "/quality"
  };

  // Helper for Navigation
  const goTo = (view) => {
    const target = ROUTES[view] || "/dashboard";
    navigate(target);
    setIsMobileMenuOpen(false);
  };

  // -----------------------------
  // Nav Items (Header Buttons)
  // -----------------------------
  const getNavItems = () => {
    if (isAgent) {
      return [
        { view: ViewState.ENTRY, label: "Data Entry", icon: PenTool },
        { view: ViewState.DASHBOARD, label: "Analytics", icon: LayoutDashboard },
        { view: ViewState.SCHEDULER, label: "Roster", icon: CalendarClock },
        { view: ViewState.GUIDELINES, label: "Guidelines", icon: BookOpen },
      ];
    } else {
      const items = [
        { view: ViewState.DASHBOARD, label: "Analytics", icon: LayoutDashboard },
      ];

      if (canAccessQuality) {
        items.push({ view: ViewState.QUALITY, label: "Quality", icon: Award });
      }

      items.push({ view: ViewState.SCHEDULER, label: "Scheduler", icon: CalendarClock });

      if (canAccessManage) {
        items.push({ view: ViewState.ADMIN_PANEL, label: "Manage", icon: Settings });
      }

      items.push({ view: ViewState.GUIDELINES, label: "Guidelines", icon: BookOpen });

      if (canAccessEntry) {
        items.push({ view: ViewState.ENTRY, label: "Data Entry (Test)", icon: PenTool });
      }

      return items;
    }
  };

  const navItems = getNavItems();

  // -----------------------------
  // NAV BUTTON UI (Desktop)
  // -----------------------------
  const renderNavButton = (item) => (
    <button
      key={item.view}
      onClick={() => goTo(item.view)}
      className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap text-slate-600 hover:bg-slate-50"
    >
      <item.icon className="w-4 h-4" />
      <span className="hidden md:inline">{item.label}</span>
    </button>
  );

  // -----------------------------
  // NAV BUTTON UI (Mobile)
  // -----------------------------
  const renderMobileNavButton = (item) => (
    <button
      key={item.view}
      onClick={() => goTo(item.view)}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors w-full text-slate-700 hover:bg-slate-50"
    >
      <item.icon className="w-5 h-5" />
      <span>{item.label}</span>
    </button>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* LEFT: LOGO */}
            <div className="flex items-center gap-2">
              <div className="bg-blue-700 p-2 rounded-lg">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-slate-800">
                  TFS Ops Tracker
                </span>
                <span className="text-xs text-slate-400 block">
                  {currentUser.role.replace("_", " ")} VIEW
                </span>
              </div>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex space-x-1 items-center">
              {navItems.map(renderNavButton)}

              <div className="w-px h-6 bg-slate-200 mx-2"></div>

              {/* User + Logout */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-700">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {currentUser.designation || currentUser.role}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-600 hover:bg-slate-50"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div className={`
        fixed top-0 right-0 h-full bg-white shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        w-80 max-w-[85vw] md:hidden border-l border-slate-200
      `}>
        <div className="p-6 flex flex-col h-full">

          {/* USER INFO */}
          <div className="pb-6 mb-6 border-b border-slate-200">
            <h3 className="font-bold text-xl">{currentUser.name}</h3>
            <p className="text-sm text-slate-500">
              {currentUser.designation || currentUser.role}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {currentUser.role.replace("_", " ")} View
            </p>
          </div>

          {/* NAV ITEMS */}
          <div className="flex-1 space-y-2">
            {navItems.map(renderMobileNavButton)}
          </div>

          {/* LOGOUT */}
          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 w-full transition-colors mt-6 border-t border-slate-200 pt-6"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
