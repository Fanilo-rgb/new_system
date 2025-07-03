import Layout from "../components/Layout.tsx";
import Searchbar from "../components/Searchbar.tsx";
import Filter from "../components/Filter.tsx";
import {ChevronDown, Pencil, Plus, Trash2} from "lucide-react";

const Distributors = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <Searchbar/>
            <ul className="flex gap-2">
              <li>
                <Filter text="new"/>
              </li>
              <li>
                <Filter text="homme"/>
              </li>
              <li>
                <Filter text="femme"/>
              </li>
            </ul>
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-800 bg-primary h-10 px-4 rounded-xl">
            <Plus size={18}/>
            <span>Créer un distributeur</span>
          </button>
        </div>
        <div className="bg-white/90 h-full shadow-md rounded-2xl overflow-hidden">
          <ul>
            <li className="flex gap-2 text-gray-500 items-center justify-between p-2 text-sm hover:bg-primary/10 transition-all">
              <div className="flex gap-2">
                <button className="h-8 w-8 grid place-items-center rounded-xl hover:bg-black/10 transition-all">
                  <ChevronDown size={18}/>
                </button>
                <span className=" w-20 flex items-center select-none">
                  18003040
                </span>
              </div>
              <span className="w-80 md:w-96 select-none truncate">
                Andriambololona Faniloniaina Princy
              </span>
              <span className="w-24 select-none truncate">
                0348833981
              </span>
              <span className="w-44 select-none truncate">
                101 033 202 178 101
              </span>
              <div className="flex gap-2">
                <button className="h-8 w-8 grid place-items-center rounded-xl bg-black/10 hover:bg-black/20 hover:text-gray-800 transition-all">
                  <Pencil size={16}/>
                </button>
                <button className="h-8 w-8 grid place-items-center rounded-xl bg-black/10 hover:bg-red-200 hover:text-red-500 transition-all">
                  <Trash2 size={16}/>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
export default Distributors
