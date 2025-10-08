import React, { useEffect, useState, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { editorConfig } from "./editorConfig";
import { News } from "../../models/News";
import PhotoUploadBlock from "./PhotoUploadBlock";

interface NewsPopupProps {
    setVisibleFalse: () => void;
    newsItem?: News;
}

export const NewsPopup: React.FC<NewsPopupProps> = ({ setVisibleFalse, newsItem }) => {
    const [title, setTitle] = useState(newsItem?.title || "");
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string>(newsItem?.photoUrl || "");
    const [shortDescription, setShortDescription] = useState(newsItem?.shortDescription || "");
    const [mediaId, setMediaId] = useState<number | null>(null);
    const holderRef = useRef<HTMLDivElement | null>(null);
    const editorRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        if (!holderRef.current || editorRef.current) return;
        const data =
            newsItem?.description && newsItem.description !== ""
                ? JSON.parse(newsItem.description)
                : { blocks: [] };
        editorRef.current = new EditorJS(editorConfig(holderRef.current, data));
    }, [newsItem]);

    const MAX_UPLOAD_MB = 10;
    const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;

    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        if (file.size > MAX_UPLOAD_BYTES) {
            alert(`⚠️ Файл слишком большой. Максимум ${MAX_UPLOAD_MB} MB.`);
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("https://kodrf.ru/api/upload-photo", {
                method: "POST",
                body: formData,
            });

            if (res.status === 413) {
                alert("⚠️ Файл слишком большой. Пожалуйста, выберите изображение меньшего размера.");
                return;
            }

            if (!res.ok) throw new Error(`Ошибка загрузки фото (код ${res.status})`);

            const data = await res.json();
            setMediaId(data.id);
            setPhoto(file);
            setPhotoUrl("");
        } catch (err) {
            console.error(err);
            alert("Не удалось загрузить фото. Проверьте соединение или попробуйте позже.");
        }
    };

    const handleSave = async () => {
        try {
            if (!editorRef.current) return;
            const savedData = await editorRef.current.save();

            if (!title) return alert("Заголовок не заполнен");
            if (!shortDescription) return alert("Краткое описание не заполнено");
            if (!mediaId && !photoUrl) return alert("Фото не прикреплено");

            const id = newsItem?.id ?? 0;
            const body = JSON.stringify({
                id,
                title,
                shortDescription,
                description: JSON.stringify(savedData),
                mediaId,
            });

            const response = await fetch("https://kodrf.ru/api/news/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body,
            });

            if (!response.ok) throw new Error(`Ошибка при сохранении (${response.status})`);

            const result = await response.json();
            window.location.assign("https://ivlev-ff.ru/admin/news");
        } catch (err) {
            console.error(err);
            alert("Ошибка при сохранении новости");
        }
    };

    return (
        <div className="news-popup" onClick={(e) => e.stopPropagation()}>
            <div className="news-popup__title">
                {newsItem ? "Редактировать новость" : "Создать новость"}
            </div>

            <input
                type="text"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="news-popup__input"
            />

            <PhotoUploadBlock
                photo={photo}
                photoUrl={photoUrl}
                handlePhotoChange={handlePhotoChange}
            />

            <textarea
                placeholder="Краткое описание"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="news-popup__textarea"
            />

            <small className="news-popup__commands">
                <span>Быстрые команды для вставки:</span>
                <ul>
                    <li>CTRL+SHIFT+H - заголовок</li>
                    <li>CTRL+SHIFT+P - абзац</li>
                    <li>CTRL+SHIFT+I - изображение</li>
                    <li>CTRL+SHIFT+L - список</li>
                </ul>
                Начинать необходимо с новой строки. Дополнительно доступны настройки при выделении текста.
            </small>

            <div ref={holderRef} className="news-popup__editor" />

            <div className="news-popup__footer">
                <div onClick={setVisibleFalse} className="news-popup__button cancel_changes">
                    Отмена
                </div>
                <div onClick={handleSave} className="news-popup__button submit_changes">
                    Сохранить
                </div>
            </div>
        </div>
    );
};
