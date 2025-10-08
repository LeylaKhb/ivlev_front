import React from "react";
import {Helmet, HelmetProvider} from "react-helmet-async";

const PageNotFound: React.FC = () => {
    return (
        <div className="page_content" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh", background: "#f9f9fb" }}>
            <HelmetProvider>
                <Helmet title="Страница не найдена"/>
            </HelmetProvider>
            <div style={{ textAlign: "center", maxWidth: 600, padding: "0 20px" }}>
                <h1 style={{ fontSize: 80, marginBottom: 20, color: "#9986F4", fontWeight: "bold", animation: "fadeInDown 1s" }}>
                    404
                </h1>
                <p style={{ fontSize: 24, color: "#333", marginBottom: 40 }}>
                    Страница не найдена
                </p>
                <a href="/"
                   style={{
                       display: "inline-block",
                       padding: "12px 30px",
                       fontSize: 18,
                       fontWeight: "500",
                       color: "#fff",
                       backgroundColor: "#9986F4",
                       borderRadius: 8,
                       textDecoration: "none",
                       transition: "background-color 0.3s, transform 0.2s",
                   }}
                   onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#7a5ce8")}
                   onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#9986F4")}
                >
                    Перейти на главную →
                </a>
            </div>

            {/* Анимация ключевых кадров */}
            <style>
                {`
          @keyframes fadeInDown {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
            </style>
        </div>
    )
}
export default PageNotFound;