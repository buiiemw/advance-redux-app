import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { NavLink, useLocation } from "react-router-dom";

type MenuItem = {
  label: string;
  icon: any;
  href: string;
};

export const MainListItems = () => {
  const location = useLocation();

  const menuItem: Array<MenuItem> = [
    {
      label: "หน้าหลัก",
      icon: <DashboardIcon />,
      href: "/dashboard",
    },
    {
      label: "ยื่นใบลา",
      icon: <PeopleIcon />,
      href: "/dashboard/request-for-leave",
    },
    {
      label: "จัดการข้อมูลการลา",
      icon: <ManageAccountsIcon />,
      href: "/dashboard/manage-leave",
    },
  ];

  return (
    <React.Fragment>
      {menuItem.map((item) => (
        <ListItemButton
          key={item.label}
          component={NavLink}
          to={item.href}
          sx={{
            backgroundColor: location.pathname === item.href ? "grey.400" : "",
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};
