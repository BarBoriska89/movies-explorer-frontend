import React from "react";
import './NavTab.css';
import { Link } from "react-router-dom";

function NavTab() {

    return(
<nav aria-label="Навигация по странице">
    <ul className="navtab">
   <li className="navtab__item"><a href='#project' className="link navtab__link">О проекте</a></li>
   <li className="navtab__item"><a href='#techs' className="link navtab__link">Технологии</a></li>
   <li className="navtab__item"><a href='#student' className="link navtab__link">Студент</a></li>
    </ul>
</nav>
    );
};

export default NavTab;