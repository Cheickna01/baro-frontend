import Pseudo from "./validation/Pseudo";
import Prenom from "./validation/prenom";
import Email from "./validation/Email";
import Mdp from "./validation/Mdp";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function UpdateUser(
  {utoken,
  setUToken,
  nom,
  prenom,
  email,
  password,
  setNom,
  setPrenom,
  setEmail,
  setMdp}
) {
    const [message,setMessage] = useState("")
    function handleSubmit(e){
        e.preventDefault()
       if( window.confirm("Voulez-vous vraiment mettre à jour vos informations?")){
            fetch("http://localhost:4000/updateuser", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": `Bearer ${utoken}`
                },
                body: JSON.stringify({ nom: nom, prenom: prenom, email: email, mot_de_passe: password })
            }).then(req=>req.json()).then(res=>{
                setMessage(res)
                setTimeout(() => {
                    setMessage("")
                    setUToken("")
                }, 1000);
            })
        }
        
    }
  return (
    <div className="p-7">
      <form onSubmit={handleSubmit}>
        <Pseudo nom={nom} setNom={setNom} />
        <Prenom nom={prenom} setPrenom={setPrenom} />
        <Email nom={email} setEmail={setEmail} />
        <Mdp nom={password} setMdp={setMdp} />
        <div className="flex justify-between items-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
            Envoyer
          </button>
          <Link to="/" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4">
            Annuler
          </Link>
        </div>
        {message && <p className="text-center">{message}!!!</p>}
      </form>
    </div>
  );
}
