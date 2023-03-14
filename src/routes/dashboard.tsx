
import { RouteObject } from "react-router-dom";
import DEditProfile from "../pages/dashboard/d-edit-profile";
import DHome from "../pages/dashboard/d-home";
import DLayout from "../pages/dashboard/d-layout";
import DLeave from "../pages/dashboard/d-leave";
import DManageLeave from "../pages/dashboard/d-manage-leave";
import PermissionDenied from "../pages/dashboard/permission-denied";

const routeDashboard: RouteObject[] = [
    {
        path: "/dashboard",
        element: <DLayout />,
        children: [
            {
                path: "", // localhost:4000/dashboard
                element: <DHome />
            },
            {
                path: "request-for-leave", // localhost:4000/dashboard/request-for-leave
                element: <DLeave />
            },
            {
                path: "manage-leave", // localhost:4000/dashboard/manage-leave
                element: <DManageLeave />
            },
            {
                path: "edit-profile", // localhost:4000/dashboard/edit-profile
                element: <DEditProfile />
            },
            {
                path: "permission-denied", // localhost:4000/dashboard/permission-denied
                element: <PermissionDenied />
            },
        ]
    }
];

export default routeDashboard;