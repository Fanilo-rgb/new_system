import {Search, X} from "lucide-react";

const Searchbar = () => {
  return (
    <div className="bg-white/80 text-gray-700 flex gap-2 px-2 items-center text-sm h-9 rounded-md w-52 sm:w-80 transition-all">
      <Search size={16}/>
      <input className="h-full flex-1 w-full" type="text" placeholder="Rechercher ..."/>
      <button>
        <X size={18} className="text-red-600"/>
      </button>
    </div>
  )
}
export default Searchbar
