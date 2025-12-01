import { useState, useEffect } from "react";
import Login from "./components/Login";
import Carlist from "./components/CarList";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  const handleLogin = (newToken) => setToken(newToken);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    queryClient.removeQueries({ queryKey: ["cars"] });
  };

  return (
    <QueryClientProvider client={queryClient}>
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Car Shop
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>

          <Carlist token={token} />
        </>
      )}
    </QueryClientProvider>
  );
}

export default App;
