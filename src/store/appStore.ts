import { create } from "zustand";

// Define the state types
interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

interface Theme {
  mode: "light" | "dark";
  primaryColor: string;
}

interface AppState {
  // User state
  user: User;

  // Theme state
  theme: Theme;

  // Counter state
  count: number;
  step: number;

  // Notifications state
  notifications: string[];
}

// Define the actions
interface AppActions {
  // User actions
  login: (name: string, email: string) => void;
  logout: () => void;
  updateName: (name: string) => void;

  // Theme actions
  toggleTheme: () => void;
  setPrimaryColor: (color: string) => void;

  // Counter actions
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
  setStep: (step: number) => void;

  // Notification actions
  addNotification: (message: string) => void;
  removeNotification: (index: number) => void;
  clearNotifications: () => void;
}

// Combine state and actions
type AppStore = AppState & AppActions;

// Create the store
export const useAppStore = create<AppStore>((set) => ({
  // Initial state
  user: {
    name: "",
    email: "",
    isLoggedIn: false,
  },
  theme: {
    mode: "light",
    primaryColor: "#3b82f6",
  },
  count: 0,
  step: 1,
  notifications: [],

  // User actions
  login: (name: string, email: string) =>
    set(() => ({
      user: { name, email, isLoggedIn: true },
    })),

  logout: () =>
    set(() => ({
      user: { name: "", email: "", isLoggedIn: false },
    })),

  updateName: (name: string) =>
    set((state) => ({
      user: { ...state.user, name },
    })),

  // Theme actions
  toggleTheme: () =>
    set((state) => ({
      theme: {
        ...state.theme,
        mode: state.theme.mode === "light" ? "dark" : "light",
      },
    })),

  setPrimaryColor: (color: string) =>
    set((state) => ({
      theme: { ...state.theme, primaryColor: color },
    })),

  // Counter actions
  increment: () =>
    set((state) => ({
      count: state.count + state.step,
    })),

  decrement: () =>
    set((state) => ({
      count: state.count - state.step,
    })),

  reset: () => set({ count: 0 }),

  setCount: (count: number) => set({ count }),

  setStep: (step: number) => set({ step }),

  // Notification actions
  addNotification: (message: string) =>
    set((state) => ({
      notifications: [...state.notifications, message],
    })),

  removeNotification: (index: number) =>
    set((state) => ({
      notifications: state.notifications.filter((_, i) => i !== index),
    })),

  clearNotifications: () => set({ notifications: [] }),
}));

// Convenience hooks for specific slices - Fixed to prevent infinite loops
export const useUser = () => {
  const user = useAppStore((state) => state.user);
  const login = useAppStore((state) => state.login);
  const logout = useAppStore((state) => state.logout);
  const updateName = useAppStore((state) => state.updateName);

  return { user, login, logout, updateName };
};

export const useTheme = () => {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const setPrimaryColor = useAppStore((state) => state.setPrimaryColor);

  return { theme, toggleTheme, setPrimaryColor };
};

export const useCounter = () => {
  const count = useAppStore((state) => state.count);
  const step = useAppStore((state) => state.step);
  const increment = useAppStore((state) => state.increment);
  const decrement = useAppStore((state) => state.decrement);
  const reset = useAppStore((state) => state.reset);
  const setCount = useAppStore((state) => state.setCount);
  const setStep = useAppStore((state) => state.setStep);

  return { count, step, increment, decrement, reset, setCount, setStep };
};

export const useNotifications = () => {
  const notifications = useAppStore((state) => state.notifications);
  const addNotification = useAppStore((state) => state.addNotification);
  const removeNotification = useAppStore((state) => state.removeNotification);
  const clearNotifications = useAppStore((state) => state.clearNotifications);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };
};
