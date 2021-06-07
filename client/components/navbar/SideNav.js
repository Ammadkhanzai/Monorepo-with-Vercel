
import Link from 'next/link'

import { NavbarData } from "./NavbarData";

const SideNav = ({ cName, toggleSidebar }) => {
  return (
    
    <div className={cName}>
     <ul>
        {NavbarData.map((data, index) => (
          <Link key={index} href={data.path}>
          <li onClick={toggleSidebar}>
              {data.icon}
              {data.title}
          </li>
          </Link>
        ))}
      </ul>
    </div>
    
  );
};

export default SideNav;
