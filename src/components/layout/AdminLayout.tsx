import React, {useState} from "react";
import {Link} from "react-router-dom";

const AdminLayout: React.FC<{ children: React.ReactNode, isPopupVisible?: boolean }> = ({children, isPopupVisible}) => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="admin-layout">
            {!isPopupVisible &&
              <button className="menu-button" onClick={toggleMenu}>
                Меню ≡
              </button>}

            <aside className={`sidebar ${isOpen ? "open" : ""}`}>
                <button className="close-button" onClick={toggleMenu}>
                    ×
                </button>
                <nav>
                    <ul>
                        <li>
                            <Link to="/admin_page" onClick={toggleMenu}>
                                Заказы
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/discount" onClick={toggleMenu}>
                                Персональная скидка
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/news" onClick={toggleMenu}>
                                Новости
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
