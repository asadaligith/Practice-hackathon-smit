import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// WHY ProtectedRoute?
// Some pages (like Dashboard) should ONLY be accessible to logged-in users.
// This component checks if the user is authenticated:
//   - If YES → show the page (children)
//   - If NO  → redirect to /login
//   - If LOADING → show a spinner (Firebase is checking auth status)

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    // Navigate replaces the current URL — user lands on /login
    // "replace" prevents the protected page from appearing in browser history
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
