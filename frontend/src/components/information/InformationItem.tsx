import {ChevronDown, Pencil, Trash2} from "lucide-react";
import InformationWrapper from "./InformationWrapper.tsx";
import InformationDetails from "./InformationDetails.tsx";
import Information from "./Information.tsx";
import {useSelectItem} from "../../../stores/store.ts";
import {AnimatePresence, motion } from "motion/react";

type informationItemProps = {
  data: {
    _id: string;
    number_card: string;
    name: string;
    surname: string;
    cin: string;
    phone: string;
  };
}

const InformationItem = ({data}: informationItemProps) => {
  const { selectedItem } = useSelectItem()

  const isOpen = selectedItem === data._id;

  return (
    <li className="relative">
      <Main data={data} />
      <AnimatePresence>
        {isOpen && (
          <Details />
        )}
      </AnimatePresence>
    </li>
  )
}
export default InformationItem

const Main = ({data}: informationItemProps) => {
  const { setSelectedItem, selectedItem } = useSelectItem();

  const isOpen = selectedItem === data._id;

  return (
    <div className="flex gap-2 items-center justify-between text-sm hover:bg-primary/10 transition-all text-gray-500 p-2">
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedItem(data._id)}
          className="h-8 w-8 grid place-items-center rounded-xl hover:bg-black/10 transition-all"
        >
            <span className={`
              ${isOpen && "rotate-180"} transition-all
            `}>
              <ChevronDown size={18}/>
            </span>
        </button>
        <span className=" w-18 flex items-center select-none">
            {data.number_card}
          </span>
      </div>
      <span className="w-80 md:w-96 select-none truncate">
          {data.name + " " + data.surname}
        </span>
      <span className="w-28 select-none truncate">
          {data.phone}
        </span>
      <span className="w-44 select-none truncate">
          {data.cin}
        </span>
      <div className="flex gap-2">
        <button className="h-8 w-8 grid place-items-center rounded-xl bg-black/10 hover:bg-black/20 hover:text-gray-800 transition-all">
          <Pencil size={16}/>
        </button>
        <button className="h-8 w-8 grid place-items-center rounded-xl bg-black/10 hover:bg-red-200 hover:text-red-500 transition-all">
          <Trash2 size={16}/>
        </button>
      </div>
    </div>
  )
}

const Details = () => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0, padding:0 }}
      animate={{ height: 200, opacity: 1, paddingLeft: 48, padding: 8 }}
      exit={{ opacity: 0, height: 0, padding:0 }}
      className="border-b-2 border-gray-700 pl-12 flex flex-col justify-between p-2 gap-4 overflow-hidden"
    >
      <InformationWrapper title={"Consultant"}>
        <InformationDetails title="Nom et prenom">
          <Information text="Andriambololona"/>
          <Information text="Faniloniaina Princy"/>
        </InformationDetails>
        <InformationDetails title="Details">
          <Information text="18003435"/>
          <Information text="+261 34 88 339 81"/>
          <Information text="101 000 000 000 000"/>
        </InformationDetails>
        <InformationDetails title="Adresse">
          <Information text="Lot blablabla"/>
        </InformationDetails>
      </InformationWrapper>
    </motion.div>
  )
}
