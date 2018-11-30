import React from 'react'
import Raspberry from '../common/navigationRaspberry.png'
import MobileRaspberry from '../common/mobileRaspberry.png'
import { NavLink } from 'react-router-dom'

const Navigation = ({toggleNavigation, activeNavigation}) => {
    let classes = "";
    let navActive = "";
    activeNavigation ? classes = "burger activeBurger" : classes = "burger";
    activeNavigation ? navActive = "navActive" : navActive="";
    return(
      <React.Fragment>
        <nav id="mainNavigation" className={navActive}>
          <ul>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/offer'>Offer</NavLink></li>
            <li className="desktopLink"><NavLink to='/'><img src={Raspberry} alt=""/></NavLink></li>
            <li className="mobileLink"><NavLink to='/'><img src={MobileRaspberry} alt=""/></NavLink></li>
            <li><NavLink to='/gallery'>Gallery</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
          </ul>
        </nav>
        <div className={classes} onClick={toggleNavigation}>
          <div className="burgerBar"></div>
          <div className="burgerBar"></div>
          <div className="burgerBar"></div>
        </div>
      </React.Fragment>
    )

};

export default Navigation;
