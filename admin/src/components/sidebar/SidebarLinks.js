import {
  AiOutlineDashboard,
  AiOutlineHome,
  AiOutlineBranches,
  AiOutlineAppstoreAdd,
  AiFillInfoCircle,
  AiOutlineAlert
} from "react-icons/ai";

import { ImStatsDots } from "react-icons/im";
import { GrUserManager } from "react-icons/gr";

export const SidebarLinks = [
  {
    title: "Dashboard",
    icon: <AiOutlineDashboard />
  },
  {
    title: "Home Management",
    icon: <AiOutlineHome />
  },
  {
    title: "Softwares Categories",
    icon: <AiOutlineBranches />
  },
  {
    title: "Softwares Management",
    icon: <AiOutlineAppstoreAdd />
  },
  {
    title: "Info Pages",
    icon: <AiFillInfoCircle />
  },
  {
    title: "Detail Statics",
    icon: <ImStatsDots />
  },
  {
    title: "Staff Management",
    icon: <GrUserManager />
  },
  {
    title: "Alerts And Notifications",
    icon: <AiOutlineAlert />
  }
];