import React, { useState } from "react";
import { News } from "../../models/News";
import ReactPaginate from "react-paginate";
import "../../styles/news.css";
import Popup from "../Popup";

interface NewsListProps {
    news: News[];
    isAdmin?: boolean;
    itemsPerPage?: number;
    onEyeClick?: (index: number) => void;
}

const NewsList: React.FC<NewsListProps> = ({
                                               news,
                                               isAdmin,
                                               itemsPerPage = 5,
                                               onEyeClick
                                           }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * itemsPerPage;
    const currentItems = news.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(news.length / itemsPerPage);

    function handlePageClick({ selected }: { selected: number }) {
        setCurrentPage(selected);
    }

    function formatDate(dateInput: Date | string): string {
        const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear());
        return `${day}.${month}.${year}`;
    }

    function deleteNews(id: number): void {
        console.log(id)
        fetch("https://kodrf.ru/api/news/" + id + "/delete", {
            method: "POST",
        }).then(res => {
            res.json()
                .then (() => {
                    window.location.assign("http://localhost:3000/admin/news");
                })
        });
    }

    return (
        <div style={{ width: "100%" }}>
            <div className="news_container">
                {currentItems.map((newsItem) => (
                    <div
                        key={newsItem.id}
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            marginBottom: 20
                        }}
                    >
                        <a
                            className="news_item"
                            href={"/news/" + newsItem.id}
                            style={{ flex: 1, textDecoration: "none", color: "inherit" }}
                        >
                            <div className="news_image_wrapper">
                                <img
                                    className="news_image"
                                    src={newsItem.photoUrl}
                                    alt={newsItem.title}
                                />
                            </div>
                            <div className="news_main_block">
                                <div>
                                    <div className="news_date">{formatDate(newsItem.dateCreated)}</div>
                                    <h3 className="news_title">{newsItem.title}</h3>
                                    <div className="news_description">{newsItem.shortDescription}</div>
                                </div>
                                {!isAdmin && <span className="news_read_more">Подробнее →</span>}
                            </div>
                        </a>

                        {isAdmin && (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: 10,
                                    justifyContent: "center"
                                }}
                            >
                                <button
                                    className="action-btn eye-btn"
                                    onClick={() => onEyeClick ? onEyeClick(newsItem.id!) : null}
                                    title="Редактировать"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round"
                                         className="icon icon-tabler icons-tabler-outline icon-tabler-edit">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/>
                                        <path
                                            d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/>
                                        <path d="M16 5l3 3"/>
                                    </svg>
                                </button>
                                <button
                                    className="action-btn delete-btn"
                                    onClick={() => deleteNews(newsItem.id)}
                                    title="Удалить"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                         pointerEvents="none"
                                         viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path
                                            d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5-3h4a2 2 0 0 1 2 2v0H8v0a2 2 0 0 1 2-2z"></path>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {pageCount > 1 && (
                <ReactPaginate
                    previousLabel={"←"}
                    nextLabel={"→"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            )}
        </div>
    );
};

export default NewsList;
