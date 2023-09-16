import React from "react";
import './NavTab.css';
import { Link } from "react-router-dom";

function NavTab() {

    return(
<section className="navtab" aria-label="Навигация по странице">
    <a href='#project' className="navtab__link">О проекте</a>
    <a href='#techs' className="navtab__link">Технологии</a>
    <a href='#student' className="navtab__link">Студент</a>
</section>
    );
};

export default NavTab;