export default function Action({
  setShowAction,
  handleDelete,
  handleUpdate,
  mes,
  userId,
  reply,
  setReplay
}) {
  console.log(mes)
  function handleReplay(){
    setReplay({statue: true, message: mes.message,name: mes.user_name, id: mes.reply_id})
    setShowAction(false)
  }
  return (
    <div
      className="inset-0 fixed bg-black/75"
      onClick={() => setShowAction(false)}
    >
      <div
        className="bg-gray-900 w-96 m-auto p-7 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          <li className="hover:cursor-pointer text-gray-400" onClick={handleReplay}>Répondre</li>
          {mes.user_id === userId && 
            <>
              <li
                onClick={handleUpdate}
                className="hover:cursor-pointer text-gray-400"
              >
                Modifier
              </li>
              <li
                onClick={handleDelete}
                className="hover:cursor-pointer text-gray-400"
              >
                Supprimer
              </li>
            </>
          }
        </ul>
      </div>
    </div>
  );
}
