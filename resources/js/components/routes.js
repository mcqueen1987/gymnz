import Dashboard from "./dashboard/Dashboard";
import Organization from "./Organization/Organization";
import React from "react";

export const routes = [
    {
        path: "/dashboard",
        exact: true,
        sidebar: () => <div>home!</div>,
        main: () => <Dashboard/>
    },
    {
        path: "/org",
        sidebar: () => <div>org!</div>,
        main: () => <Organization/>
    }
];
