import {Search, X} from "lucide-react";

const Searchbar = () => {
  return (
    <div className="bg-white/80 text-gray-700 flex gap-2 px-2 items-center text-sm h-8 rounded-md w-80">
      <Search size={16}/>
      <input className="h-full flex-1" type="text" placeholder="Rechercher ..."/>
      <button>
        <X size={18} className="text-red-600"/>
      </button>
    </div>
  )
}
export default Searchbar
