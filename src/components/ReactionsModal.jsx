import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("https://baro-backend.onrender.com/", { transports: ["websocket"] });
export default function ReactionsModal({
  reactions,
  showReactions,
  setShowReactions,
  mesUpdate,
  utoken,
  update,
  setSub,
  setUpdate,
  id,
  userId
}) {

  useEffect(() => {
      socket.on("update-message", (updatedMessage) => {
        setSub(true);
      });
  
      return () => {
        socket.off("update-message");
      };
    }, []);

  function handleRemoveReact(e){
    fetch("https://baro-backend.onrender.com/updatemessage",{
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "Authorization": `Bearer ${utoken}`
      },
      body: JSON.stringify({message_id: id,message: mesUpdate.message, reaction: e, del: true})
    }).then(req=>req.json()).then(res=>{
      setUpdate({...update,statue: false})
      setSub(true)
      setShowReactions(false)
      socket.emit("update-message", res);
    })
  }
  return (
    <div
      className="inset-0 bg-black/20 fixed"
      onClick={() => setShowReactions(false)}
    >
      <div
        className="emoj-item max-w-[400px] max-h-[180px] overflow-auto bg-gray-800 mr-auto rounded-lg mt-28 ml-20 gap-2 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {reactions &&
          reactions.map((reaction,index) => (
            <>
              <div key={index} className="emoji cursor-pointer flex justify-between items-center p-4 hover:bg-gray-600 rounded-lg transition-all" onClick={()=>handleRemoveReact(reaction.reaction)}>
                <p className="text-slate-100">{reaction.name} <br />
                  {userId === reaction.user_id && <small className="text-gray-400">Cliquez pour supprimer</small>}
                </p>
                <span
                  className="text-lg"
                  dangerouslySetInnerHTML={{ __html: reaction.reaction }}
                />
              </div>
            </>
          ))}
      </div>
    </div>
  );
}
