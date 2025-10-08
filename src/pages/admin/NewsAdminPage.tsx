import React, {useEffect, useState} from "react";
import {HelmetProvider} from "react-helmet-async";
import {Helmet} from "react-helmet";
import AdminLayout from "../../components/layout/AdminLayout";
import Popup from "../../components/Popup";
import {News} from "../../models/News";
import NewsList from "../../components/news/NewsList";

const NewsAdminPage: React.FC = () => {
    const [news, setNews] = useState<News[]>([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isEditPopupVisible, setIsEditPopupVisible] = useState<Record<number, boolean>>({});

    useEffect(() => {
        fetch("https://kodrf.ru/api/news")
            .then((res) => res.json())
            .then((data) => setNews(data))
            .catch((err) => console.error("Ошибка загрузки новостей:", err));
    }, []);

    function handleCreate() {
        setIsPopupVisible(true);
        document.body.style.overflow = "hidden";
    }

    function closePopup() {
        setIsPopupVisible(false);
        document.body.style.overflow = "scroll";
    }

    const setEditPopupFalse = (id: number) => {
        setIsEditPopupVisible((prev) => ({...prev, [id]: false}));
        document.body.style.overflow = "scroll";
    };

    const setEditPopupTrue = (id: number) => {
        setIsEditPopupVisible((prev) => ({ ...prev, [id]: true }));
        document.body.style.overflow = "hidden";
    };

    return (
        <AdminLayout isPopupVisible={isPopupVisible}>
            <HelmetProvider>
                <Helmet title="Админка новостей"/>
            </HelmetProvider>

            <div className="page_content" style={{flexDirection: "column"}}>
                <div className="admin-header" style={{
                    marginTop: 110,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginBottom: 30,
                    textAlign: "center"
                }}>
                    <h1>Управление новостями</h1>
                    <button className="change_password_button" onClick={handleCreate}>
                        Создать новость
                    </button>
                </div>

                <NewsList
                    news={news}
                    isAdmin
                    itemsPerPage={10}
                    onEyeClick={(id) => setEditPopupTrue(id)}
                />
                {news.map((newsItem) => (
                    <div key={newsItem.id}>
                        <Popup
                            isVisible={!!(newsItem.id && isEditPopupVisible[newsItem.id])}
                            setVisibleFalse={() => newsItem.id && setEditPopupFalse(newsItem.id)}
                            content="news"
                            news={newsItem}
                        />
                    </div>
                ))}


                <Popup
                    isVisible={isPopupVisible}
                    setVisibleFalse={closePopup}
                    content="news"
                />
            </div>
        </AdminLayout>
    );
};

export default NewsAdminPage;
