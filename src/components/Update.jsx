export default function Update({mesUpdate,update,setUpdate}) {
  function formatDate(date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleString(undefined, options);
  }
  return (
    <div className="inset-0 fixed bg-black/75" onClick={()=>setUpdate({...update,statue:false})}>
      <div className="shadow-lg p-3 w-4/5 z-50 m-auto mt-96" onClick={(e)=>e.stopPropagation()}>
        <div className="bg-gray-900 p-4 mb-4 rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-blue-400 font-semibold">{mesUpdate.nom}</h3>
            <span className="text-sm text-gray-400">
              {formatDate(mesUpdate.date)}
              </span>
          </div>
          <p className="mt-2 text-gray-300">
            {mesUpdate.message}
          </p>
        </div>
      </div>
    </div>
  )
}