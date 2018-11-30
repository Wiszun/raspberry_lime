import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = (props) => {
    return(
      <footer>
        <p>&copy; 2014 RASPBERRY KINGDOM</p>
        <nav>
          <ul>
            <li><NavLink to="/cookies">Cookies</NavLink></li>
            <li><NavLink to="/privacy">Privacy</NavLink></li>
          </ul>
        </nav>
        <p>Design by <strong>Wizard of Oz</strong></p>
      </footer>
    )

};

export default Footer;
