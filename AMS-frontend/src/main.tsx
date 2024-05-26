import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import { ContextProvider } from "./context/ContextProvider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
            <Toaster />
        </ContextProvider>
    </React.StrictMode>
);
