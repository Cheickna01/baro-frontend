import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import { useEffect, useState } from "react";
import UpdateUser from "./UpdateUser";
export default function Main() {
    const [showModal, setShowModal] = useState(true)
    const [showCompte, setShowCompte] = useState("")
    const [utoken, setUToken] = useState("")
    const [token, setToken] = useState("")
    const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setMdp] = useState("");
  const [mess,setMss] = useState()
  const [monMessage,setMonMessage] = useState("")
  const [sub,setSub] = useState("")
  const [mesUpdate,setMesUpdate] = useState({nom:"",prenom:"",message:"",date:""})
  const [userId,setUserId] = useState("")
  return (
    <div className="">
      <Header setShowModal={setShowModal} showModal={showModal} utoken={utoken} setUToken={setUToken} prenom={prenom} setShowCompte={setShowCompte}/>
      <Routes>
        <Route path="/" element={<Home showModal={showModal} setShowModal={setShowModal} utoken={utoken} setUToken={setUToken} nom={nom} prenom={prenom} email={email} password={password} setNom={setNom} setPrenom={setPrenom} setEmail={setEmail} setMdp={setMdp} mess={mess} setMss={setMss} monMessage={monMessage} setMonMessage={setMonMessage} sub={sub} setSub={setSub} mesUpdate={mesUpdate} setMesUpdate={setMesUpdate} userId={userId} setUserId={setUserId} showCompte={showCompte} setShowCompte={setShowCompte}/>}/>


        {utoken && <Route path="/userupdate" element={<UpdateUser utoken={utoken} setUToken={setUToken} nom={nom} prenom={prenom} email={email} password={password} setNom={setNom} setPrenom={setPrenom} setEmail={setEmail} setMdp={setMdp}/>}/>}



        <Route path="*" element={<Home showModal={showModal} setShowModal={setShowModal} utoken={utoken} setUToken={setUToken} nom={nom} prenom={prenom} email={email} password={password} setNom={setNom} setPrenom={setPrenom} setEmail={setEmail} setMdp={setMdp} mess={mess} setMss={setMss} monMessage={monMessage} setMonMessage={setMonMessage} sub={sub} setSub={setSub} mesUpdate={mesUpdate} setMesUpdate={setMesUpdate} userId={userId} setUserId={setUserId} showCompte={showCompte} setShowCompte={setShowCompte}/>}/>
      </Routes>
    </div>
  );
}
