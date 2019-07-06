import React from 'react';
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// import Person from "@material-ui/icons/Person";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
import OrganizationIcon from '@material-ui/icons/ThreeDRotation';
import CoachIcon from '@material-ui/icons/SupervisorAccount';
import SettingsIcon from '@material-ui/icons/Settings';

// core components/views for Admin layout
import LinkedDashboard from "-views/Dashboard/Dashboard.jsx";
// import UserProfile from "-views/UserProfile/UserProfile.jsx";
// import TableList from "-views/TableList/TableList.jsx";
// import Typography from "-views/Typography/Typography.jsx";
// import Icons from "-views/Icons/Icons.jsx";
// import Maps from "-views/Maps/Maps.jsx";
// import NotificationsPage from "-views/Notifications/Notifications.jsx";
// import UpgradeToPro from "-views/UpgradeToPro/UpgradeToPro.jsx";
import Organization from "-views/Organization/Organization.jsx";
import LinkedCoach from "-views/Coach/Coach";
import Customers from "-views/Customer/Customers";
import Customer from "-views/Customer/Customer"
import GymSettings from "-views/GymSetting/GymSettings";

const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        rtlName: "لوحة القيادة",
        icon: Dashboard,
        component: LinkedDashboard,
        layout: "/admin"
    },
    {
        path: "/setting",
        name: "Setting",
        rtlName: "健身房管理页",
        icon: SettingsIcon,
        component: ()=><GymSettings/>,
        layout: "/admin"
    },
    {
        path: "/coach",
        name: "Coach",
        rtlName: "教练管理页",
        icon: CoachIcon,
        component: LinkedCoach,
        layout: "/admin"
    },
    {
        path: "/org",
        name: "Organization",
        rtlName: "分公司",
        icon: OrganizationIcon,
        component: Organization,
        layout: "/admin"
    },
    {
        path: "/customers",
        name: "Customer",
        rtlName: "",
        icon: OrganizationIcon,
        component: props => <Customers {...props}/>,
        layout: "/admin"
    },{
        path: "/customer/:id",
        name: "CustomerPage",
        rtlName: "",
        hideMenu: true,
        icon: OrganizationIcon,
        // props is to pass the url
        component: props => <Customer {...props}/>,
        layout: "/admin"
    },
    // {
    //     path: "/user",
    //     name: "User Profile",
    //     rtlName: "ملف تعريفي للمستخدم",
    //     icon: Person,
    //     component: UserProfile,
    //     layout: "/admin"
    // },
    // {
    //     path: "/table",
    //     name: "Table List",
    //     rtlName: "قائمة الجدول",
    //     icon: "content_paste",
    //     component: TableList,
    //     layout: "/admin"
    // },
    // {
    //     path: "/typography",
    //     name: "Typography",
    //     rtlName: "طباعة",
    //     icon: LibraryBooks,
    //     component: Typography,
    //     layout: "/admin"
    // },
    // {
    //     path: "/icons",
    //     name: "Icons",
    //     rtlName: "الرموز",
    //     icon: BubbleChart,
    //     component: Icons,
    //     layout: "/admin"
    // },
    // {
    //     path: "/maps",
    //     name: "Maps",
    //     rtlName: "خرائط",
    //     icon: LocationOn,
    //     component: Maps,
    //     layout: "/admin"
    // },
    // {
    //     path: "/notifications",
    //     name: "Notifications",
    //     rtlName: "إخطارات",
    //     icon: Notifications,
    //     component: NotificationsPage,
    //     layout: "/admin"
    // },
    // {
    //     path: "/upgrade-to-pro",
    //     name: "Upgrade To PRO",
    //     rtlName: "التطور للاحترافية",
    //     icon: Unarchive,
    //     component: UpgradeToPro,
    //     layout: "/admin"
    // },
    // {
    //     path: "/rtl-page",
    //     name: "RTL Support",
    //     rtlName: "پشتیبانی از راست به چپ",
    //     icon: Language,
    //     component: RTLPage,
    //     layout: "/rtl"
    // }
];

export default dashboardRoutes;
