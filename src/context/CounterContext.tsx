import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// Define the context type with multiple states
interface AppContextType {
  // User state
  user: {
    name: string;
    email: string;
    isLoggedIn: boolean;
  };
  setUser: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      isLoggedIn: boolean;
    }>
  >;

  // Theme state
  theme: {
    mode: "light" | "dark";
    primaryColor: string;
  };
  setTheme: React.Dispatch<
    React.SetStateAction<{
      mode: "light" | "dark";
      primaryColor: string;
    }>
  >;

  // Counter state
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;

  // Step state for counter
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;

  // Notifications state
  notifications: string[];
  setNotifications: React.Dispatch<React.SetStateAction<string[]>>;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // User state
  const [user, setUser] = useState({
    name: "",
    email: "",
    isLoggedIn: false,
  });

  // Theme state
  const [theme, setTheme] = useState({
    mode: "light" as "light" | "dark",
    primaryColor: "#3b82f6",
  });

  // Counter state
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  // Notifications state
  const [notifications, setNotifications] = useState<string[]>([]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        theme,
        setTheme,
        count,
        setCount,
        step,
        setStep,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

// Convenience hooks for specific functionality
export const useUser = () => {
  const { user, setUser } = useApp();

  const login = (name: string, email: string) => {
    setUser({ name, email, isLoggedIn: true });
  };

  const logout = () => {
    setUser({ name: "", email: "", isLoggedIn: false });
  };

  const updateName = (name: string) => {
    setUser((prev) => ({ ...prev, name }));
  };

  return { user, login, logout, updateName };
};

export const useTheme = () => {
  const { theme, setTheme } = useApp();

  const toggleTheme = () => {
    setTheme((prev) => ({
      ...prev,
      mode: prev.mode === "light" ? "dark" : "light",
    }));
  };

  const setPrimaryColor = (color: string) => {
    setTheme((prev) => ({ ...prev, primaryColor: color }));
  };

  return { theme, toggleTheme, setPrimaryColor };
};

export const useCounter = () => {
  const { count, setCount, step, setStep } = useApp();

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => prev - step);
  const reset = () => setCount(0);

  return {
    count,
    step,
    setCount,
    setStep,
    increment,
    decrement,
    reset,
  };
};

export const useNotifications = () => {
  const { notifications, setNotifications } = useApp();

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
  };

  const removeNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };
};
