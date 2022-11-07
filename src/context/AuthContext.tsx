import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { _POST } from "../services/axios.method";
import { API_URLS } from "../utils/apiConstant";

type AuthContextType = {
  user: unknown;
  isAppLoading: boolean;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
  token: string;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAppLoading: false,
  onLogin: async () => {
    return;
  },
  onLogout: async () => {
    return;
  },
  token: "",
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: any) => {
  // const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const onLogin = async (email: string, password: string) => {
    console.log("login", email, password);
    const res = await _POST(API_URLS.LOGIN, { username: email, password });
    setUser(res.data.user);
    setToken(res.data.token);
    localStorage.setItem("token", JSON.stringify(res.data.token));
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return;
  };
  const onLogout = async () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    return;
  };

  const checkLocalStorage = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
    if (token) {
      setToken(JSON.parse(token));
    }
    setLoading(false);
  };

  React.useEffect(() => {
    checkLocalStorage();
  }, []);

  const context = {
    user,
    isAppLoading: loading,
    onLogin,
    onLogout,
    token,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
