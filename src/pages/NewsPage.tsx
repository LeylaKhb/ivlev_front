import {Helmet, HelmetProvider} from "react-helmet-async";
import React, {useEffect, useState} from "react";
import "../styles/news.css";
import {News} from "../models/News";
import NewsList from "../components/news/NewsList";

export const NewsPage = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch("https://kodrf.ru/api/news")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Ошибка загрузки новостей");
                }
                return res.json();
            })
            .then((data) => {
                setNews(data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    if (loading) {
        return (
            <div className="page_content">
                <div className="spinner-wrapper" style={{ marginTop: 80 }}>
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="page_content" style={{ flexFlow: "column", minHeight: "90vh", justifyContent: "flex-start" }}>
            <HelmetProvider>
                <Helmet title="Новости" />
            </HelmetProvider>

            <h1 style={{ marginTop: 110 }} className="all_news_title">
                Лента новостей
            </h1>

            <NewsList news={news} itemsPerPage={5} />
        </div>
    );
};
