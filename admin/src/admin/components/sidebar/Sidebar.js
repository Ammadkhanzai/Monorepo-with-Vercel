import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "./SidebarLinks";
import { getUser } from '../../../utils/common';

export const Sidebar = ({ activeClass }) => {
  const location = useLocation();
  const permissions = getUser()
  
  function findInPermissions(object) {
    return Object.keys(object).filter(key => object[key] === true);
  }

  const menu = findInPermissions(permissions)  



  return (
    // <div className="admin_sidebar">
    //   <div className="px-2 mb-4">
    //     <h2>FileInstant</h2>
    //   </div>
    //   <ul>
    //     {/* {sidebarLinks.map((link, key) => {
    //       const linkSlug =
    //         "/admin/" + link.title.split(" ").join("-").toLowerCase();

    //       return (
    //         <li key={key}>
    //           <Link
    //             to={linkSlug}
    //             key={key}
    //             className={linkSlug === location.pathname ? activeClass : ""}
    //           >
    //             {link.title}
    //           </Link>
    //         </li>
    //       );
    //     })} */}
    //     {menu.map((link, key) => {

    //     const linkSlug =
    //       "/admin/" + link.split(/(?=[A-Z])/).join("-").toLowerCase();

    //     return (
    //       <li key={key}>
    //         <Link
    //           to={linkSlug}
    //           key={key}
    //           className={linkSlug === location.pathname ? activeClass : ""}
    //         >
    //           {link.split(/(?=[A-Z])/).join(" ").toUpperCase()}
    //         </Link>
    //       </li>
    //     );

    //     })}
    //   </ul>
    // </div>


    <div id="wrapper">
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#">
                        Start Bootstrap
                    </a>
                </li>
                <li>
                    <a href="#">Dashboard</a>
                </li>
                <li>
                    <a href="#">Shortcuts</a>
                </li>
                <li>
                    <a href="#">Overview</a>
                </li>
                <li>
                    <a href="#">Events</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Services</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
            </ul>
        </div>

        
        {/* <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1>Simple Sidebar</h1>
                        <p>This template has a responsive menu toggling system. The menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will appear/disappear. On small screens, the page content will be pushed off canvas.</p>
                        <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>.</p>
                        <a href="#menu-toggle" class="btn btn-default" id="menu-toggle">Toggle Menu</a>
                    </div>
                </div>
            </div>
        </div>
        */}
    </div>
    
  );
};
