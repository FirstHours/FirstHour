import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useAuthStore } from './store/authStore';

function App() {
  const { setUser, setLoading, loading } = useAuthStore();

  useEffect(() => {
    // Only listen to Firebase if real API key configured
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    const isRealFirebase = apiKey && !apiKey.includes('mock');

    if (isRealFirebase) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName,
            photoURL: fbUser.photoURL,
          });
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [setUser, setLoading]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-palette-cream text-text-primary">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-palette-sage border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
