import { useEffect, useState } from "react";
import { useRef } from "react";
import { io } from "socket.io-client";
const socket = io("https://baro-backend.onrender.com/", { transports: ["websocket"] });

export default function Input({
  monMessage,
  setMonMessage,
  utoken,
  sub,
  setSub,
  update,
  setUpdate,
  mesUpdate,
  setMesUpdate,
  id,
  reply,
  setReplay,
  setDay,
  setMss,
}) {
  const [statut, setStatut] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      // Ajouter le message à l'état local
      setSub(true);
    });

    socket.on("update-message", (updatedMessage) => {
      // Met à jour le message
      setSub(true);
    });

    socket.on("reply-message", (reply) => {
      // Ajouter la réponse
      setSub(true);
    });

    return () => {
      socket.off("message");
      socket.off("update-message");
      socket.off("reply-message");
    };
  }, []);

  function handleChange(e) {
    if (update.statue) {
      setMesUpdate({ ...mesUpdate, message: e.target.value });
    } else {
      setMonMessage(e.target.value);
      setMesUpdate(e.target.value);
    }
  }
  function handleSub(e) {
    e.preventDefault();
    const time = new Date();
    setDay(time.getDay());
    if (update.statue === false && reply.statue === false) {
      fetch("https://baro-backend.onrender.com/sendmessage", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${utoken}`,
        },
        body: JSON.stringify({ message: monMessage, time: time }),
      })
        .then((req) => req.json())
        .then((res) => {
          setMonMessage("");
          setStatut(res);
          setSub(true);
          setTimeout(() => {
            setStatut("");
          }, 1000);

          socket.emit("message", { message: res });
        });
    } else if (update.statue === true && reply.statue === false) {
      console.log(update.statue);
      fetch("https://baro-backend.onrender.com/updatemessage", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${utoken}`,
        },
        body: JSON.stringify({ message_id: id, message: mesUpdate.message }),
      })
        .then((req) => req.json())
        .then((res) => {
          setStatut(res);
          setUpdate({ ...update, statue: false });
          setSub(true);
          setTimeout(() => {
            setStatut("");
          }, 1000);

          socket.emit("update-message", res);
        })
        .catch((err) => {
          console.error("Erreur de la requête:", err); // Log l'erreur si la requête échoue
        }); 
    } else if (reply.statue === true) {
      fetch(`https://baro-backend.onrender.com/reply/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${utoken}`,
        },
        body: JSON.stringify({ message: monMessage, time: time }),
      })
        .then((req) => req.json())
        .then((res) => {
          setMonMessage("");
          setStatut(res);
          setSub(true);
          setReplay({ ...reply, statue: false });
          setTimeout(() => {
            setStatut("");
          }, 1000);

          socket.emit("reply-message", res);
        });
    }
  }


  return (
    <div className="mt-auto z-50">
      {reply.statue && (
        <div className="border-l-2 p-2 border-blue-400 bg-slate-800 rounded-t rounded-br cursor-pointer">
          <h3 className="text-blue-400 font-semibold flex">
            {reply.name}

            <span
              className="ml-auto text-slate-100"
              onClick={() => setReplay({ ...reply, statue: false })}
            >
              x
            </span>
          </h3>
          <p className="mt-2 text-gray-300">{reply.message}</p>
        </div>
      )}

      {update.statue === true && (
        <div className="border-l-2 p-2 border-blue-400 bg-slate-800 rounded-t rounded-br cursor-pointer">
          <h3 className="text-blue-400 font-semibold flex">
            {update.name}

            <span
              className="ml-auto text-slate-100"
              onClick={() => setUpdate({ ...update, statue: false })}
            >
              x
            </span>
          </h3>
          <p className="mt-2 text-gray-300">{update.message}</p>
        </div>
      )}
      <form
        className={
          !update.statue
            ? "mt-auto flex justify-between gap-5 items-center"
            : "mt-auto flex justify-between gap-5 items-center"
        }
        onSubmit={handleSub}
      >
        <input
          value={!update.statue ? monMessage : mesUpdate.message}
          className="w-full rounded bg-gray-600 h-8 p-1 overflow-hidden resize-none"
          onChange={handleChange}
        />
       <div
          className={`emojis cursor-pointer`}
        >
          <div className="emoj-one rounded-full bg-black/50 p-2">❤️</div>
        </div>
        <button
          type="submit"
          className="border border-gray-700 rounded-[50%] p-2 hover:cursor-pointer bg-green-600 hover:bg-green-700"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}
