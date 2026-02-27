import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase";

// WHY Context?
// React Context lets you share data (like the logged-in user) across ALL
// components without passing props manually through every level.
// Without this, you'd need to pass "user" as a prop from App -> Page -> Form etc.

const AuthContext = createContext();

// Custom hook — makes it easy to use auth anywhere: const { user } = useAuth()
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component — wraps the entire app so every component can access auth
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // WHY loading? Firebase takes a moment to check if user is already logged in.
  // Without this, the app would briefly show the login page even for logged-in users.

  // Listen for auth state changes (login, logout, page refresh)
  useEffect(() => {
    // onAuthStateChanged is a Firebase "listener" — it runs every time
    // the user's auth state changes (login/logout/token refresh)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup: unsubscribe when component unmounts to prevent memory leaks
    return () => unsubscribe();
  }, []);

  // Signup function
  const signup = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Set the user's display name after account creation
    await updateProfile(userCredential.user, { displayName });
    return userCredential;
  };

  // Login function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout function
  const logout = () => {
    return signOut(auth);
  };

  // All values available to any component that calls useAuth()
  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
