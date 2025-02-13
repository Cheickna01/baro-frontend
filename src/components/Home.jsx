import Input from "./Input";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import Compte from "./Compte";
import Update from "./Update";
import Action from "./Action";

export default function Home({
  showModal,
  setShowModal,
  utoken,
  setUToken,
  nom,
  prenom,
  email,
  password,
  setNom,
  setPrenom,
  setEmail,
  setMdp,
  mess,
  setMss,
  monMessage,
  setMonMessage,
  sub,
  setSub,
  mesUpdate,
  setMesUpdate,
  userId,
  setUserId,
  showCompte,
  setShowCompte,
}) {
  const [update, setUpdate] = useState({
    statue: false,
    message: "",
    name: "",
    id: ""
  });
  const [id, setId] = useState("");
  const modal = createPortal(
    <Modal
      setShowModal={setShowModal}
      utoken={utoken}
      setUToken={setUToken}
      nom={nom}
      prenom={prenom}
      email={email}
      password={password}
      setNom={setNom}
      setPrenom={setPrenom}
      setEmail={setEmail}
      setMdp={setMdp}
      userId={userId}
      setUserId={setUserId}
    />,
    document.body
  );
  const compteModal = createPortal(
    <Compte
      showCompte={showCompte}
      setShowCompte={setShowCompte}
      utoken={utoken}
      setUtoken={setUToken}
    />,
    document.body
  );
  const updateModal = createPortal(
    <Update mesUpdate={mesUpdate} update={update} setUpdate={setUpdate} />,
    document.body
  );
  const [reply, setReplay] = useState({
    statue: false,
    message: "",
    name: "",
    id: ""
  });
  const [day, setDay] = useState("");

  return (
    <div className="bg-gray-900 text-gray-100 max-w-4xl mx-auto p-6 border border-gray-700 shadow rounded h-screen flex flex-col justify-around">
        <div className="bag lg:max-h-[550px] max-h-[600px] overflow-auto scrollbar-hide flex-grow rounded-lg">
          <MessageList
            utoken={utoken}
            mess={mess}
            setMss={setMss}
            sub={sub}
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
            setDay={setDay}
            update={update}
            id={id}
          />
        </div>
        <Input
          monMessage={monMessage}
          setMonMessage={setMonMessage}
          utoken={utoken}
          sub={sub}
          setSub={setSub}
          update={update}
          setUpdate={setUpdate}
          mesUpdate={mesUpdate}
          setMesUpdate={setMesUpdate}
          id={id}
          reply={reply}
          setReplay={setReplay}
          setDay={setDay}
          setMss={setMss}
        />
      {(!utoken || showModal) && modal}
      {utoken && showCompte && compteModal}
      {/*update && updateModal*/}
    </div>
  );
}
