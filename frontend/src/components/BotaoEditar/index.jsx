const BotaoEditar = ({ children, onClick }) => {
   return (
      <>
         <button
         type="button"
         className="text-white bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-cyan-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-sky-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-600 ease-in-out"
         onClick={onClick}
         >
            {children}
         </button>
      </>
   )
}

export default BotaoEditar