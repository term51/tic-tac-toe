import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
   return (
      <nav className="navbar navbar-dark bg-dark p-3">
         <ul className="nav nav-pills">
            <li className="nav-item">
               <NavLink exact to='/' className="nav-link text-light" href="#">Game</NavLink>
            </li>
            <li className="nav-item">
               <NavLink to='/settings' className="nav-link text-light" href="#">Settings</NavLink>
            </li>
         </ul>
      </nav>
   );
};

export default Navbar;