
export default function FirstName({prenom,setPrenom}) {

  return (
    <>
        <label htmlFor="pseudo">Votre prenom</label>
            <input value={prenom} onChange={(e)=>setPrenom(e.target.value)}  className="block border border-black  mx-auto w-[100%] rounded p-2 mt-2 text-black" type="text" name="" id="prenom"/>

    </>
  )
}