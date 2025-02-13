export default function Header({setShowModal,showModal,utoken,prenom,setShowCompte}) {
  function handleClick(e){
    if(!utoken){
      setShowModal(!showModal)
    }else{
      setShowCompte(true)
    }
  }
  return (
    <div className="border border-gray-700 rounded flex justify-between items-center sm:p-2 p-1">
      <h1 className="text-xl md:text-3xl font-bold sm:mb-4 text-center">Baro</h1>
      <div className="border border-gray-700 rounded-[50%] sm:p-3 p-2 hover:cursor-pointer bg-blue-600 hover:bg-blue-700" onClick={handleClick}>
      {!utoken ? <i className="fas fa-user"></i> : <p className="font-extrabold sm:text-2xl">{prenom.charAt(0).toUpperCase()}</p>}
      </div>
    </div>
  );
}
