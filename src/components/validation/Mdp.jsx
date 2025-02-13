import Cmdp from "./Cmdp"


export default function Mdp({password,setMdp}) {

  return (
    <>
          <label className="block mt-8"  htmlFor="mdp">Votre mot de passe: au moins un chiffre et 6 caractères</label>
            <input value={password} onChange={(e)=>setMdp(e.target.value)} className="block border border-black mx-auto w-[100%] rounded p-2 mt-2 text-black" type="password" id="mdp" placeholder={password}/>
    </>
  )
}