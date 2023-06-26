import React from "react";
import * as FaIcons from "react-icons/fa";
import { BsFillPenFill } from "react-icons/bs";

interface Data {
  title: string;
  path: string;
  icon: any;
  btnText?: any;
}

export const SidebarData: Data[] = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <FaIcons.FaHome />,
  },
  {
    title: "Ask a doctor",
    path: "/askdoctor",
    icon: <FaIcons.FaCommentAlt />,
  },
  {
    title: "Find hospital",
    path: "/findhospital",
    icon: <FaIcons.FaCross />,
  },
  {
    title: "First aid for kids",
    path: "/firstaid",
    icon: <FaIcons.FaFirstAid />,
  },
];

export const SuperAdminData = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <FaIcons.FaHome />,
  },
  {
    title: "Ask a doctor",
    path: "/askdoctor",
    icon: <FaIcons.FaCommentAlt />,
  },
  {
    title: "Find hospital",
    path: "/findhospital",
    icon: <FaIcons.FaCross />,
  },
  {
    title: "First aid for kids",
    path: "/firstaid",
    icon: <FaIcons.FaFirstAid />,
    btnText: <BsFillPenFill />,
  },
  {
    title: "Doctors",
    path: "/doctors",
    icon: <FaIcons.FaUserNurse />,
  },
  {
    title: "All articles",
    path: "/articles",
    icon: <FaIcons.FaBook />,
    btnText: <BsFillPenFill />,
  },
];
