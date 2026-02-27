import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";

// WHY AuthProvider wraps Router?
// AuthProvider must be OUTSIDE Routes so that every page can access auth state.
// Router must be OUTSIDE Routes so that navigation works everywhere.
// Order: AuthProvider → Router → Routes → Route

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes — anyone can access */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected route — only logged-in users */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all — redirect unknown URLs to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
