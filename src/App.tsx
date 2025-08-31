import React from "react";
import { useTheme, useNotifications, useUser } from "./store/appStore";
import Counter from "./components/Counter";
import CounterControls from "./components/CounterControls";
import "./App.css";

// Simple component to demo theme
const ThemeDemo: React.FC = () => {
  const { theme, toggleTheme, setPrimaryColor } = useTheme();

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: theme.mode === "dark" ? "#333" : "#fff",
        color: theme.mode === "dark" ? "#fff" : "#000",
      }}
    >
      <h3>Theme: {theme.mode}</h3>
      <p style={{ color: theme.primaryColor }}>
        Primary Color: {theme.primaryColor}
      </p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <input
        type="color"
        value={theme.primaryColor}
        onChange={(e) => setPrimaryColor(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
    </div>
  );
};

// Simple component to demo notifications
const NotificationDemo: React.FC = () => {
  const {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  } = useNotifications();

  return (
    <div>
      <h3>Notifications ({notifications.length})</h3>
      <button onClick={() => addNotification(`Notification ${Date.now()}`)}>
        Add Notification
      </button>
      <button onClick={clearNotifications} style={{ marginLeft: "10px" }}>
        Clear All
      </button>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            {notification}
            <button
              onClick={() => removeNotification(index)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Simple component to demo user
const UserDemo: React.FC = () => {
  const { user, login, logout, updateName } = useUser();

  if (!user.isLoggedIn) {
    return (
      <div>
        <h3>User Status: Not logged in</h3>
        <button onClick={() => login("John Doe", "john@example.com")}>
          Login as John
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3>User Status: Logged in</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={() => updateName("Jane Doe")}>
        Change Name to Jane
      </button>
      <button onClick={logout} style={{ marginLeft: "10px" }}>
        Logout
      </button>
    </div>
  );
};

function App() {
  return (
    <div>
      <div className="card">
        <h1>Multi-State Zustand Store</h1>

        <UserDemo />
        <hr />

        <ThemeDemo />
        <hr />

        <NotificationDemo />
        <hr />

        <div>
          <h3>Counter</h3>
          <Counter />
          <CounterControls />
        </div>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
