// import { dashboardRoutes } from "../layouts/Dashboard/DashboardLayout";
// import { landingRoutes } from "../layouts/Landing/LandingLayout";

import React from "react";
import { dashboardRoutes } from "../layouts/dashboard/DashboardLayout";
import { unauthenticatedLayoutRoutes } from "../layouts/unauthenticated/UnauthenticatedLayout";
import { verificationLayoutRoutes } from "../layouts/verification/Verification";
import { welcomeRoutes } from "../layouts/welcome/WelcomeLayout";

enum Environments {
    Production = "production",
    Staging = "staging",
    Int = "int",
    Development = "development"
}

enum Roles {
    Admin = "Admin",
    StyleAdvisor = "StyleAdvisor"
}

export interface RouteConfig {
    path: string;
    element: React.ReactNode;
    isPublic?: boolean;
    roles?: string[];
    disabledEnvironments?: Environments[];
    leafNodes?: RouteConfig[];
    loading?: React.ReactNode;
    error?: React.ReactNode;
    menuItem?: {
        name: string;
        icon: React.ReactNode;
    }
}

export const routes: RouteConfig[] = [
    unauthenticatedLayoutRoutes,
    verificationLayoutRoutes,
    welcomeRoutes,
    dashboardRoutes
];