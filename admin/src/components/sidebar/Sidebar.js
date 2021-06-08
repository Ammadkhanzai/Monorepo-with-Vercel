import { Link, useLocation } from "react-router-dom";
import { getUser } from '../../utils/common';
import { AiOutlineHome } from "react-icons/ai";
import {SidebarLinks} from './SidebarLinks';

export const Sidebar = ({ activeClass }) => {
  const location = useLocation();
  const permissions = getUser()

  function findInPermissions(object) {
    return Object.keys(object).filter(key => object[key] === true);
  }

  const menu = findInPermissions(permissions)
  return (
    <>
    <div id="wrapper">
      <div id="sidebar-wrapper" >
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            File Instant
            </li>
          {menu.map((link, key) => {

            const linkSlug =
              "/admin/" + link.split(/(?=[A-Z])/).join("-").toLowerCase();

            return (
              <li key={key}>
                <Link
                  to={linkSlug}
                  key={key}
                  className={linkSlug === location.pathname ? activeClass : ""}
                >
                  {link.split(/(?=[A-Z])/).join(" ").toUpperCase()}
                </Link>
              </li>
            );

          })}
        </ul>
      </div>
    </div>

    <div id="wrapper-min">
      <div id="sidebar-wrapper-min" >
        <ul className="sidebar-nav-min">
        {SidebarLinks.map((val, key) => {
          const linkSlug =
            "/admin/" + val.title.split(" ").join("-").toLowerCase();
          
            return (
            <li key={key}>
              <Link
                to={linkSlug}
                key={key}
                className={linkSlug === location.pathname ? activeClass : ""}
              >
                {val.icon}
              </Link>
            </li>
          );
        })}
        </ul>
      </div>
    </div>
</>
  );
};