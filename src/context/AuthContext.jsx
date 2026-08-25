import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut as firebaseSignOut, updateProfile,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { business } from '../data/business';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => onAuthStateChanged(auth, (u) => { setUser(u); setAuthReady(true); }), []);

  const signUp = useCallback(async (email, password, name) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name) await updateProfile(cred.user, { displayName: name });
    setUser({ ...cred.user, displayName: name || cred.user.displayName });
  }, []);

  const signIn = useCallback((email, password) => signInWithEmailAndPassword(auth, email, password), []);
  const signOutUser = useCallback(() => firebaseSignOut(auth), []);

  const isAdmin = !!user && user.email === business.adminEmail;

  return (
    <AuthContext.Provider value={{ user, authReady, isAdmin, signUp, signIn, signOut: signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider');
  return ctx;
}
