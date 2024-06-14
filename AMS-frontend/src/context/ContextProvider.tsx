import { ReactNode, createContext, useContext, useState } from "react";

interface StateContextI {
    user: any;
    token: string | null;
    fullSpinner: boolean;
    setUser: (user: any) => void;
    setToken: (token: string | null) => void;
    setFullSpinner: (fullSpinner: boolean) => void;
}

const StateContext = createContext<StateContextI>({
    user: null,
    token: null,
    fullSpinner: false,
    setUser: () => {},
    setToken: () => {},
    setFullSpinner: () => {},
});

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, _setUser] = useState<any>({});
    const [fullSpinner, _setFullSpinner] = useState<boolean>(false);
    const [token, _setToken] = useState<string | null>(
        localStorage.getItem("ACCESS_TOKEN")
    );

    const setToken = (token: string | null) => {
        _setToken(token);

        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setFullSpinner = (fullSpinnerState: boolean) => {
        _setFullSpinner(fullSpinnerState);
    };

    const setUser = (userData: any) => {
        localStorage.setItem("userDetails", JSON.stringify(userData));
        _setUser(userData);
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                fullSpinner,
                setFullSpinner,
                setUser,
                setToken,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
