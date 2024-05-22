import { ReactNode, createContext, useContext, useState } from "react";

interface StateContextI {
    user: any;
    token: string | null;
    setUser: (user: any) => void;
    setToken: (token: string | null) => void;
}

const StateContext = createContext<StateContextI>({
    user: null,
    token: null,
    setUser:()=>{},
    setToken:()=>{}
});

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>({});
    const [token, _setToken] = useState<string | null>(localStorage.getItem("ACCESS_TOKEN"));

    const setToken = (token: string | null) => {
        _setToken(token);

        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
