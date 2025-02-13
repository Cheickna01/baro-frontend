
export default function Pseudo({nom,setNom}) {
  return (
    <>
        <label htmlFor="pseudo">Votre nom</label>
            <input value={nom} onChange={(e)=>setNom(e.target.value)} className="block border border-black  mx-auto w-[100%] rounded p-2 mt-2 text-black" type="text" name="" id="pseudo"/>

    </>
  )
}