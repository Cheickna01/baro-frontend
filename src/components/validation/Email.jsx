export default function Email({email,setEmail}) {
  return (
    <>
        <label htmlFor="email">Votre email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="block border border-black  mx-auto w-[100%] rounded p-2 mt-2 text-black" type="email" name="" id="email" placeholder={email}/>
    </>
  )
}