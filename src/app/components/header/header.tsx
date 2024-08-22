import { useState } from "react";
import "./header.css";


export const AppHeader = () => {
  const [isMenuOpen, setOpenMenu] = useState(false);

  const togglemenu = () => {
    setOpenMenu(!isMenuOpen);
  };
  return (
    <header className="header">
      <div className="header-title">Техническое задание </div>
      <nav className="header-nav">
        <div className="menu" onClick={togglemenu}>
          Меню
          {isMenuOpen && (
            <div className="dropdown">
            
              <a
                href="https://vk.com/totktovsetochnoznaet"
                className="dropdown-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                Разработчик
              </a>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
