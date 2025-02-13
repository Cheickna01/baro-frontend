import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Action from "./Action";
import Update from "./Update";
import EmojModal from "./EmojModal";
import ReactionsModal from "./ReactionsModal";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000", { transports: ["websocket"] });
export default function MessageBox({
  mes,
  utoken,
  setSub,
  mesUpdate,
  setMesUpdate,
  setUpdate,
  setId,
  userId,
  setUserId,
  reply,
  setReplay,
  nom,
  prenom,
  day,
  update,
  id,
}) {
  const [delstat, setDelStat] = useState("");

  useEffect(()=>{
    socket.on("delete-message",(deletedMessage)=>{
      console.log("📩 Message supprimé :", deletedMessage);
      setSub(true)
    })

    return ()=>{
      socket.off("delete-message")
    }
  },[])

  function formatDate(date) {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleString(undefined, options);
  }
  const ref = useRef(mes._id);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [mes]);
  let scrollToReplied = false;
  function handleReplayRef(e) {
    const element = document.getElementById(mes.reply_id);
    element.scrollIntoView({ behavior: "smooth" });
    element.classList.remove("bg-slate-900");
    element.classList.add("bg-slate-50/20");
    setTimeout(() => {
      element.classList.remove("bg-slate-50/20");
      element.classList.add("bg-slate-900");
    }, 1000);
  }

  function handleDelete() {
    if (window.confirm("Voulez vous supprimer ce message?")) {
      fetch("http://localhost:4000/deletemessage", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${utoken}`,
        },
        body: JSON.stringify({ message_id: mes._id }),
      })
        .then((req) => req.json())
        .then((res) => {
          setDelStat(true);
          setSub(true);

          socket.emit("delete-message")
        });
    }
  }

  function handleUpdate() {
    
    if (mes.user_id === userId) {
      console.log("hhh")
      setUpdate({
        statue: true,
        message: mes.message,
        name: mes.user_name,
        id: mes._id,
      });
      setMesUpdate({
        nom: mes.user_name,
        message: mes.message,
        date: mes.posted_at,
      });
      setId(mes._id);
      setShowAction(false);
    }
  }
  const [showAction, setShowAction] = useState("");
  const actionModal = createPortal(
    <Action
      setShowAction={setShowAction}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
      mes={mes}
      userId={userId}
      reply={reply}
      setReplay={setReplay}
    />,
    document.body
  );
  function handleAction(e) {
    setId(mes._id);
    setShowAction(true);
  }
  const fullName = nom + " " + prenom;
  const currentDate = new Date(mes.posted_at).getDay();
  const lastDate = new Date(mes.last_message_post).getDay() + 0;
  function formatDay(date) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  const [showEmojis, setShowEmojis] = useState("");

  const [emojis, setEmojis] = useState("");
  const emojmodal = createPortal(
    <EmojModal
      showEmojis={showEmojis}
      emojis={emojis}
      setShowEmojis={setShowEmojis}
      update={update}
      setUpdate={setUpdate}
      mesUpdate={mesUpdate}
      utoken={utoken}
      setSub={setSub}
      id={id}
      mes={mes}
    />,
    document.body
  );
  const categories = [
    "smileys-and-people",
    "animals-and-nature",
    "food-and-drink",
  ];
  useEffect(() => {
    fetch("https://emojihub.yurace.pro/api/all")
      .then((req) => req.json())
      .then((res) => {
        setEmojis(res);
      });
  }, []);

  function handleShowEmoj() {
    setId(mes._id);
    setMesUpdate(mes.message);
    setShowEmojis(true);
  }

  const [showReactions,setShowReactions] = useState("")
  const reactionsModal = createPortal(<ReactionsModal reactions={mes.reactions} showReactions={showReactions} setShowReactions={setShowReactions} mesUpdate={mesUpdate} utoken={utoken} update={update} setSub={setSub} setUpdate={setUpdate} id={id} userId={userId}/>, document.body)

  function handleReactions(){
    setId(mes._id)
    setShowReactions(true)
  }

  return (
    <>
      {lastDate && currentDate !== lastDate && (
        <div className="text-center w-28 m-auto">
          <p className="bg-gray-600 rounded-lg text-slate-400">
            {currentDate !== new Date().getDay()
              ? formatDay(mes.posted_at)
              : "Aujourd'hui"}
          </p>
        </div>
      )}
      <div ref={ref} className="flex gap-5 items-center">
        <div className="p-3 w-4/5" onDoubleClick={handleUpdate}>
          {mes.reply && (
            <div
              className="border-l-2 p-2 border-blue-400 bg-slate-800 rounded-t rounded-br cursor-pointer"
              onClick={handleReplayRef}
            >
              <h3 className="text-blue-400 font-semibold">
                {fullName === mes.reply_user_name
                  ? "Vous"
                  : mes.reply_user_name}
              </h3>
              <p className="mt-2 text-gray-300">{mes.reply_message}</p>
            </div>
          )}
          <div
            id={mes._id}
            className="bg-slate-900 p-4 mb-4 rounded-md shadow-md relative"
          >
            <span
              className="text-gray-400/45 absolute top-0 right-0 text-sm hover:cursor-pointer font-bold mr-1 "
              onClick={handleAction}
            >
              v
            </span>
            <div className="flex items-center justify-between">
              <h3 className="text-blue-400 font-semibold">{mes.user_name}</h3>
              <span className="text-sm text-gray-400">
                {formatDate(mes.posted_at)}
              </span>
            </div>
            <p className="mt-2 text-gray-300">{mes.message}</p>
            <div className="absolute bg-gray-700 p-1 rounded-full right-2 cursor-pointer" onClick={handleReactions}>
              {mes.reactions &&
                mes.reactions.slice(0,4).map((r,index) => (
                  <span
                  key={index}
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: r.reaction }}
                  />
                ))}
            </div>
          </div>
        </div>
        <div
          className={`emojis cursor-pointer ${mes._id}`}
          onClick={handleShowEmoj}
        >
          <div className="emoj-one rounded-full bg-black/50 p-2">❤️</div>
        </div>
        {/*mes.user_id === userId && (
          <div
            className="border border-gray-700 rounded-[50%] p-2 hover:cursor-pointer bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
          >
            <i className="fas fa-trash"></i>
          </div>
        )*/}
        {showAction && actionModal}
        {showEmojis && emojmodal}
        {showReactions && reactionsModal}
      </div>
    </>
  );
}
