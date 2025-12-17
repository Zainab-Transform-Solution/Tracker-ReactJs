// import React, { useState } from "react";
// import { User, Lock, LogIn } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";
// import { useAuth } from "../context/AuthContext";

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [usernameError, setUsernameError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [serverError, setServerError] = useState("");

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Reset errors
//     setUsernameError("");
//     setPasswordError("");
//     setServerError("");

//     // Frontend validations
//     let hasError = false;

//     if (!username.trim()) {
//       setUsernameError("Please enter email");
//       hasError = true;
//     }

//     if (!password.trim()) {
//       setPasswordError("Please enter password");
//       hasError = true;
//     }

//     if (hasError) return;

//     try {
//       // API call
//       const response = await loginUser(username, password);

//       // Save full user data (dynamic, doesn't break when backend adds fields)
//       login(response.data);

//       navigate("/dashboard");
//     } catch (err) {
//       // Backend error message available? Use it.
//       if (err?.response?.data?.message) {
//         setServerError(err.response.data.message);
//       } else {
//         setServerError("Invalid credentials or server error");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100 relative">
//       <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-xl overflow-hidden mx-auto">
//         <div className="bg-[#1e40af] p-8 text-center">
//           <h1 className="text-3xl font-bold text-white mb-3">Welcome Back</h1>
//           <p className="text-blue-100 font-medium">Sign in to TFS Ops Tracker</p>
//         </div>

//         <div className="p-6">
//           {serverError && (
//             <p className="text-red-600 text-center mb-4 font-medium">{serverError}</p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">

//             {/* Email / Username Input */}
//             <div>
//               <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email
//               </label>

//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="h-5 w-5 text-gray-400" />
//                 </div>

//                 <input
//                   id="username"
//                   type="email"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   placeholder="Enter email"
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg 
//                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
//                     text-gray-700 placeholder-gray-400 bg-gray-50/50"
//                 />
//               </div>

//               {usernameError && (
//                 <p className="text-red-600 text-sm mt-1">{usernameError}</p>
//               )}
//             </div>

//             {/* Password Input */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
//                 Password
//               </label>

//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>

//                 <input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg 
//                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
//                     text-gray-700 placeholder-gray-400 bg-gray-50/50 tracking-widest"
//                 />
//               </div>

//               {passwordError && (
//                 <p className="text-red-600 text-sm mt-1">{passwordError}</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full flex justify-center items-center py-3 px-4 border border-transparent 
//                 rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 
//                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors gap-2"
//             >
//               <LogIn className="h-4 w-4" />
//               Sign In
//             </button>
//           </form>

//           <div className="mt-8 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{" "}
//               <a href="#" className="font-medium text-blue-600 hover:text-blue-700">
//                 Contact Administrator
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Background Decor */}
//       <div className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-100">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 blur-3xl"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300/20 blur-3xl"></div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;















import React, { useState } from "react";
import { User, Lock, LogIn, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const [isLoading, setIsLoading] = useState(false); // <-- loader state

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setUsernameError("");
    setPasswordError("");
    setServerError("");

    let hasError = false;

    if (!username.trim()) {
      setUsernameError("Please enter email");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("Please enter password");
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true); // start loader

    try {
      const response = await loginUser(username, password);

      login(response.data);

      toast.success("You are now logged in!", {
        className: "toast-success toast-animate",
        duration: 4000,
      });

      navigate("/dashboard"); // redirect
    } catch (err) {
      if (err?.response?.data?.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("Invalid credentials or server error");
      }
    } finally {
      setIsLoading(false); // stop loader
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100 relative">
      <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-xl overflow-hidden mx-auto">
        <div className="bg-[#1e40af] p-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-3">Welcome Back</h1>
          <p className="text-blue-100 font-medium">Sign in to TFS Ops Tracker</p>
        </div>

        <div className="p-6">
          {serverError && (
            <p className="text-red-600 text-center mb-4 font-medium">{serverError}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>
              {usernameError && <p className="text-red-600 text-sm mt-1">{usernameError}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 tracking-widest"
                />
              </div>
              {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-sm font-semibold text-white 
                transition-colors gap-2 shadow-sm 
                ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-700">
                Contact Administrator
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-slate-100">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300/20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default LoginPage;
