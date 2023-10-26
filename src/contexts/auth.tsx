import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children } : any) => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const userLocal: string = localStorage.getItem("user") as string;
    const user = JSON.parse(userLocal);

    setUser(user);
  }, []);

  const signin = (user : any) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};