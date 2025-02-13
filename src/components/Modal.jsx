import Pseudo from "./validation/Pseudo";
import Mdp from "./validation/Mdp";
import Cmdp from "./validation/Cmdp";
import { useEffect, useState } from "react";
import FirstName from "./validation/FirstName";
import Email from "./validation/Email";

export default function Modal({
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
  userId,
  setUserId,
}) {
  const [log, setLog] = useState("");
  const [message, setMess] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!log) {
      fetch("https://baro-backend.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom,
          prenom: prenom,
          email: email,
          mot_de_passe: password,
        }),
      })
        .then((req) => req.json())
        .then((res) => {
          setMess(res);
        });
    } else {
      try {
        fetch("https://baro-backend.onrender.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            email: email,
            mot_de_passe: password,
          }),
        })
          .then((req) => req.json())
          .then((res) => {
            setUToken(res.token);
            setMess(res.message);
            setUserId(res.user._id);
            setTimeout(() => {
              setShowModal(false);
            }, 100);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
  function toggleModal(e) {
    setShowModal(false);
  }
  function connected() {
    if (!utoken) {
      setLog(true);
    } else {
      if (window.confirm("voulez vous vous déconnecter?")) {
        setUserId("");
        setUToken("");
        setLog(false);
        setShowModal(false);
      }
    }
  }
  return (
    <div className="inset-0 bg-black/75 p-7 fixed" onClick={toggleModal}>
      <div
        className="bg-gray-100 m-auto max-w-[500px] mb-[10vh] relative p-7 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-gray-800 font-bold text-3xl">
            {!log ? "Inscription" : "Connexion"}
          </h2>
          <button
            className="border border-gray-700 rounded text-slate-50 py-1 px-3 hover:cursor-pointer bg-red-600 hover:bg-red-700"
            onClick={() => setShowModal(false)}
          >
            x
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <Pseudo nom={nom} setNom={setNom} />
          <FirstName nom={prenom} setPrenom={setPrenom} />
          <Email nom={email} setEmail={setEmail} />
          <Mdp nom={password} setMdp={setMdp} />
          <div className="flex justify-between items-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
              Envoyer
            </button>
            <a
              className="text-blue-600 hover:text-blue-700 hover:cursor-pointer  mt-4"
              onClick={connected}
            >
              {!utoken ? "Se connecter" : "Me déconnecter"}
            </a>
          </div>
          {message && <p className="text-center">{message}!!!</p>}
        </form>
      </div>
    </div>
  );
}
