import { create } from 'zustand';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  isDemo?: boolean;
}

interface AuthState {
  user: AppUser | null;
  loading: boolean;
  setUser: (user: AppUser | null) => void;
  setLoading: (loading: boolean) => void;
  loginUser: (email: string, displayName?: string) => AppUser;
  logout: () => void;
}

const getStoredUser = (): AppUser | null => {
  try {
    const raw = localStorage.getItem('firsthour_auth_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),
  loading: false,
  setUser: (user) => {
    if (user) {
      localStorage.setItem('firsthour_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('firsthour_auth_user');
    }
    set({ user });
  },
  setLoading: (loading) => set({ loading }),
  loginUser: (email, displayName) => {
    const newUser: AppUser = {
      uid: 'user_' + Math.random().toString(36).substring(2, 9),
      email: email || 'prepared.citizen@firsthour.org',
      displayName: displayName || (email ? email.split('@')[0] : 'Chief Responder'),
      photoURL: null,
      isDemo: true,
    };
    localStorage.setItem('firsthour_auth_user', JSON.stringify(newUser));
    set({ user: newUser, loading: false });
    return newUser;
  },
  logout: () => {
    localStorage.removeItem('firsthour_auth_user');
    set({ user: null, loading: false });
  },
}));
