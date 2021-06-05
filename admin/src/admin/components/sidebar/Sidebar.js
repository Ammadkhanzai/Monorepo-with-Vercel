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
    <div className="admin_sidebar">
      <div className="px-2 mb-4">
        <h2>FileInstant</h2>
      </div>
      <ul>
        {/* {sidebarLinks.map((link, key) => {
          const linkSlug =
            "/admin/" + link.title.split(" ").join("-").toLowerCase();

          return (
            <li key={key}>
              <Link
                to={linkSlug}
                key={key}
                className={linkSlug === location.pathname ? activeClass : ""}
              >
                {link.title}
              </Link>
            </li>
          );
        })} */}
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
  );
};
