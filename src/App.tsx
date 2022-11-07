import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthContext";
import { availableRoutes } from "./routes/availableRoutes";
import { PrivateRoute } from "./routes/privateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {" "}
        <AuthProvider>
          <Routes>
            {availableRoutes.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={
                  <PrivateRoute
                    Component={item.component}
                    isDashboard={item.isDashboard}
                    isPrivate={item.isPrivate}
                    isVisibleAfterLogin={item.visibleAfterLogin}
                  />
                }
              />
            ))}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
