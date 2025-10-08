import React from "react";

interface PhotoUploadBlockProps {
    photo: File | null;
    photoUrl?: string;
    handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PhotoUploadBlock({ photo, photoUrl, handlePhotoChange }: PhotoUploadBlockProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = () => fileInputRef.current?.click();

    const previewSrc = photo
        ? URL.createObjectURL(photo)
        : photoUrl
            ? photoUrl.startsWith("http")
                ? photoUrl
                : `https://kodrf.ru${photoUrl}`
            : null;

    return (
        <div style={{ marginBottom: 20 }}>
            <label
                style={{
                    display: "block",
                    marginBottom: 8,
                    fontWeight: 500,
                    color: "#555",
                }}
            >
                Фото новости (макс 10МБ)
            </label>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                style={{ display: "none" }}
            />

            <button
                type="button"
                onClick={handleClick}
                style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    backgroundColor: "#000",
                    color: "#fff",
                    fontWeight: 500,
                    borderRadius: 6,
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "background-color 0.2s",
                    border: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1f2937")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#000")}
            >
                Загрузить фото
            </button>

            {previewSrc && (
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
                    <img
                        src={previewSrc}
                        alt="preview"
                        style={{
                            width: 80,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: 4,
                            border: "1px solid #ddd",
                        }}
                    />
                    <span>{photo ? photo.name : "Текущее изображение"}</span>
                </div>
            )}
        </div>
    );
}
