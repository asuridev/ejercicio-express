import { createContext, useState } from "react";

export const AppContext = createContext();

const initialState = {
  isLogin:false,
  user:null,
}

export const Provider = ({ children }) =>{
  const [appstate, setAppSatate] = useState(initialState);

  const login = (user)=>{
    setAppSatate({
      ...appstate,
      isLogin:true,
      user
    });
  }

  const logout = (user)=>{
    setAppSatate({
      ...appstate,
      isLogin:false,
      user:null
    });
  }

  return (
    <AppContext.Provider value={{
      ...appstate,
      login,
      logout
    }}>
      {
        children
      }
    </AppContext.Provider>
  )
}