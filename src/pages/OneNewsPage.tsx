import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {News} from "../models/News";
import Output from "editorjs-react-renderer";
import {Helmet, HelmetProvider} from "react-helmet-async";

export const OneNewsPage = () => {
    const {id} = useParams();
    const [news, setNews] = useState<News>();
    const [loading, setLoading] = useState(true);
    const [descriptionJson, setDescriptionJson] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://kodrf.ru/api/news/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Ошибка загрузки новости");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data)
                if (data) setNews(data);
                setLoading(false)
            })
            .catch((e) => {
                console.error(e)
                navigate("/404", {replace: true});
            });
    }, [id, navigate]);

    useEffect(() => {
        if (!news) return;

        const loadEditorImages = async () => {
            try {
                const parsed = JSON.parse(news.description);
                const normalized = normalizeEditorData(parsed);

                // Подгружаем актуальные URL для всех image-блоков с mediaId
                const imageBlocks = normalized.blocks.filter(
                    (b: any) => b.type === "image" && b.data.file?.mediaId
                );

                await Promise.all(
                    imageBlocks.map(async (block: any) => {
                        try {
                            const res = await fetch(
                                `https://kodrf.ru/api/generate/${block.data.file.mediaId}`
                            );
                            const data = await res.json();
                            if (data.success) {
                                block.data.file.url = data.url;
                            }
                        } catch (err) {
                            console.error("Ошибка генерации URL для изображения:", err);
                        }
                    })
                );

                setDescriptionJson(normalized);
            } catch (err) {
                console.error("Ошибка обработки description:", err);
            }
        };

        loadEditorImages();
    }, [news]);

    function normalizeEditorData(data: any) {
        if (!data?.blocks) return data;

        const fixedBlocks = data.blocks.map((block: any) => {
            if (block.type === "list" && Array.isArray(block.data.items)) {
                block.data.items = block.data.items.map((i: any) =>
                    typeof i === "string" ? i : i.content || ""
                );
            }

            if (block.type === "table" && Array.isArray(block.data.content)) {
                block.data.content = block.data.content.map((row: any) =>
                    Array.isArray(row)
                        ? row.map((cell) => (typeof cell === "string" ? cell : JSON.stringify(cell)))
                        : []
                );
            }

            return block;
        });

        return { ...data, blocks: fixedBlocks };
    }

    if (loading || !news) {
        return (
            <div className="page_content">
                <div className="spinner-wrapper" style={{ marginTop: 80 }}>
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="page_content" style={{flexFlow: "column", minHeight: "90vh", justifyContent: "flex-start"}}>
            <HelmetProvider>
                <Helmet title={news.title}/>
            </HelmetProvider>
            <div className="news-container">

                <h1 style={{marginTop: 90}} className="all_news_title">{news.title}</h1>
                {descriptionJson && (
                    <div className="news-body">
                        <Output
                            data={descriptionJson}
                            renderers={{
                                image: (block: any) => (
                                    <div className="news-image-block">
                                        <img
                                            src={block.data.file.url}
                                            alt={block.data.caption || ""}
                                        />
                                        {block.data.caption && (
                                            <p className="news-image-caption">{block.data.caption}</p>
                                        )}
                                    </div>
                                ),
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};