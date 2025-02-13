import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000", { transports: ["websocket"] });
export default function EmojModal({
  showEmojis,
  emojis,
  setShowEmojis,
  update,
  setUpdate,
  mesUpdate,
  utoken,
  setSub,
  id,
  mes,
}) {
  useEffect(() => {
    socket.on("update-message", (updatedMessage) => {
      setSub(true);
    });

    return () => {
      socket.off("update-message");
    };
  }, []);
  function handleReact(e) {
      fetch("http://localhost:4000/updatemessage", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${utoken}`,
        },
        body: JSON.stringify({
          message_id: id,
          message: mesUpdate.message,
          reaction: e,
        }),
      })
        .then((req) => req.json())
        .then((res) => {
          setUpdate({ ...update, statue: false });
          setSub(true);
          setShowEmojis(false);
          socket.emit("update-message", res);
        });
    
  }
  return (
    <div
      className="inset-0 bg-black/20 fixed"
      onClick={() => setShowEmojis(false)}
    >
      <div
        className="emoj-item flex  flex-wrap max-w-[400px] max-h-[250px] overflow-auto bg-gray-800 mr-auto rounded-lg mt-28 ml-20 gap-2 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {showEmojis &&
          emojis.map((emoji) => (
            <div
              className="emoji cursor-pointer"
              onClick={() => handleReact(emoji.htmlCode[0])}
            >
              <span dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }} />
            </div>
          ))}
      </div>
    </div>
  );
}
