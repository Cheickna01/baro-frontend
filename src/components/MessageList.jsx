import { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
export default function MessageList({
  utoken,
  mess,
  setMss,
  sub,
  setSub,
  update,
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
  setDay,
  id
}) {
  useEffect(() => {
    if (utoken) {
      fetch("http://localhost:4000/messages", {
        method: "get",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${utoken}`,
        },
      })
        .then((req) => req.json())
        .then((res) => {
          setMss(res);
          setSub(false);
        });
    } else {
      setMss("");
    }
  }, [utoken, sub]);

  let mBox;
  if (mess) {
    mBox = mess.map((mes) => (
      <MessageBox
        mes={mes}
        key={mes._id}
        utoken={utoken}
        setSub={setSub}
        mesUpdate={mesUpdate}
        setMesUpdate={setMesUpdate}
        setUpdate={setUpdate}
        setId={setId}
        userId={userId}
        setUserId={setUserId}
        reply={reply}
        setReplay={setReplay}
        nom={nom}
        prenom={prenom}
        day={day}
        update={update}
        id={id}
      />
    ));
  }

  return <div className="rounded-lg">{mBox}</div>;
}
