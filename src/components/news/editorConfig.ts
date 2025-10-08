import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";


const imageUploadUrl = "https://kodrf.ru/api/upload-editor-image";
export const editorConfig = (holder: HTMLElement, data: any = {blocks: []}) => ({
    holder,
    placeholder: "Полное описание",
    tools: {
        header: {
            class: Header as any,
            inlineToolbar: ["link", "bold", "italic"],
            config: {placeholder: "Введите заголовок"},
            shortcut: "CMD+SHIFT+H",
        },
        paragraph: {
            class: Paragraph as any,
            inlineToolbar: true,
            config: {placeholder: "Введите текст..."},
            shortcut: "CMD+SHIFT+P",
        },
        image: {
            class: ImageTool as any,
            config: {
                endpoints: {byFile: imageUploadUrl || ""},
            },
            shortcut: "CMD+SHIFT+I",
        },
        list: {
            class: List as any,
            shortcut: "CMD+SHIFT+L",
        },
    },
    data,
    i18n: {
        messages: {
            toolNames: {
                "Text": "Параграф",
                "Heading": "Заголовок",
                "Ordered List": "Нумерованный список",
                "Unordered List": "Маркированный список",
                "Warning": "Примечание",
                "Checklist": "Чеклист",
                "Quote": "Цитата",
                "Code": "Код",
                "Delimiter": "Разделитель",
                "Raw HTML": "HTML-фрагмент",
                "Table": "Таблица",
                "Link": "Ссылка",
                "Marker": "Маркер",
                "Bold": "Полужирный",
                "Italic": "Курсив",
                "InlineCode": "Моноширинный",
                "Image": "Картинка",
            },
            tools: {
                list: {
                    Ordered: "Упорядоченный",
                    Unordered: "Неупорядоченный",
                    Checklist: "Чеклист",
                },
                image: {
                    "Select an Image": "Выберите изображение",
                    Caption: "Подпись",
                },
            },
            ui: {
                "blockTunes": {
                    "toggler": {
                        "Click to tune": "Нажмите, чтобы настроить",
                        "or drag to move": "или перетащите"
                    },
                },
                "inlineToolbar": {
                    "converter": {
                        "Convert to": "Конвертировать в"
                    }
                },
                "toolbar": {
                    "toolbox": {
                        "Add": "Добавить",
                    }
                },
                "popover": {
                    "Filter": "Поиск",
                    "Nothing found": "Ничего не найдено",
                    /**
                     * Translation of "Convert To"  at the Block Tunes Popover
                     */
                    "Convert to": "Конвертировать в",
                }
            },
        },
    },
});
