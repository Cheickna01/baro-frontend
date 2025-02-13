import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Compte({ showCompte, setShowCompte,utoken,setUtoken }) {
    const [infos,setInfos] = useState()
    console.log(infos)
    useEffect(()=>{
        fetch(`http://localhost:4000/user`,{
            method: "GET",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${utoken}`
            }
        }).then(req=>req.json()).then(res=>{
            setInfos(res)
        })
    },[])
  function handleClick(e) {
    setShowCompte(false);
  }
  function handleUpdate(){
    setShowCompte(false)
  }
  function disconnect(){
    if(window.confirm("voulez-vous vous deconnecter?")){
      setUtoken("")
    }
  }
  function handleDelete(){
    if(window.confirm("Voulez-vous vraiment supprimer votre compte?")){
        fetch("http://localhost:4000/deleteuser", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": `Bearer ${utoken}`
            }
        }).then(req=>req.json()).then(res=>{
            setUtoken("")
        })
    }
  }
  return (
    <div className="inset-0 fixed bg-black/50" onClick={handleClick}>
      <div
        className="bg-gray-100 lg:h-full lg:max-w-1/3 lg:rounded-s-lg lg:ms-auto lg:border-l lg:mt-0 lg:m-0 xs:m-auto xs:max-w-[450px] xs:mb-[10vh] relative xs:p-7 xs:mt-10 rounded-lg m-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8 p-2">
          <h2 className="font-bold text-3xl">
            Mes informations
          </h2>
          <button
            className="border border-gray-700 rounded text-slate-50 py-1 px-3 hover:cursor-pointer bg-red-600 hover:bg-red-700"
            onClick={() => setShowCompte(false)}
          >
            x
          </button>
        </div>

        <div className="rounded p-4">
            <div className="flex justify-around items-center mb-8">
                <p className="block text-4xl  flex-grow">Nom:</p>
                <p className="block text-2xl ">{infos && infos.nom}</p>
            </div>
            <div className="flex justify-around items-center mb-8">
                <p className="block text-4xl  flex-grow">Prenom:</p>
                <p className="block text-2xl ">{infos && infos.prenom}</p>
            </div>
            <div className="flex justify-around items-center mb-8">
                <p className="block text-4xl  flex-grow">Email:</p>
                <p className="block text-xl ">{infos && infos.email}</p>
            </div>
            <div className="flex justify-around items-center mb-8">
                <p className="block text-4xl  flex-grow">Mot de passe:</p>
                <p className="block text-2xl ">........</p>
            </div>
        </div>

        <div className="flex justify-center gap-3 items-center">
            <Link to="/userupdate" className="block bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mt-4"><i class="far fa-edit"></i></Link>

            <button className="block bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700 mt-4" onClick={disconnect}>Log-out <i class="fas fa-sign-out-alt"></i></button>
            
            <button className="block bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 mt-4" onClick={handleDelete}><i className="fas fa-trash"></i></button>
        </div>
      </div>
    </div>
  );
}
