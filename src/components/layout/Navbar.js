import React, {useState} from 'react';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
    const [isActive, setActive] = useState(false);

    const showMenu = () =>{
        setActive(!isActive);
    }

    return (
        <nav className="container navbar has-shadow" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <img src={logo} alt="Logo site" width="200" height="300"/>
                <a role="button" className={isActive ? "navbar-burger burger is-active": "navbar-burger burger"} onClick={showMenu} data-target="menu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="menu" className={isActive ? "navbar-menu is-active" : "navbar-menu"}>
                <div className="navbar-end">
                    <a href="/" className="navbar-item">
                        Accueil
                    </a>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a href="#" className="navbar-item has-badge-rounded has-badge-dark">
                            Daniele
                        </a>
                        <div className="navbar-dropdown">
                            <a href="#" className="navbar-item">
                                Mon profil
                            </a>
                            <a href="#" className="navbar-item">
                                Déconnexion
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
