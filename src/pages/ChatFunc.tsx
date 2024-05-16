import {useParams} from "react-router-dom";
import Chat from "./Chat";

export const ChatFunc = () => {
    const { id } = useParams();

    return (
        <div>
            <Chat dialogId={id} />
        </div>
    )
}