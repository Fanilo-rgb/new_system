import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import InformationWrapper from "./InformationWrapper.tsx";
import InformationDetails from "./InformationDetails.tsx";
import Information from "./Information.tsx";
import { useSelectItem } from "../../../stores/store.ts";
import { AnimatePresence, motion } from "motion/react";
import {type distributorType, useDistributorStore} from "../../../stores/distributorStore.ts";
import { useEffect } from "react";

type informationItemProps = {
  index: number;
  data: distributorType;
};

const InformationItem = ({ data, index }: informationItemProps) => {
  const { selectedItem } = useSelectItem();
  const isOpen = selectedItem === data._id;

  const { fetchExtraInfo } = useDistributorStore();

  useEffect(() => {
    if (isOpen) {
      fetchExtraInfo(data._id);
    }
  }, [isOpen, data._id, fetchExtraInfo]);

  return (
    <motion.li
      initial={{ translateY: -20 }}
      animate={{ translateY: 0 }}
      transition={{ delay: 0.1 * (index + 1) }}
      className="relative"
    >
      <Main data={data} />
      <AnimatePresence>{isOpen && <Details />}</AnimatePresence>
    </motion.li>
  );
};
export default InformationItem;

const Main = ({ data }: { data: informationItemProps["data"] }) => {
  const { setSelectedItem, selectedItem } = useSelectItem();
  const isOpen = selectedItem === data._id;

  return (
    <div className="flex gap-2 items-center justify-between text-sm hover:bg-primary/10 transition-all text-gray-500 p-2">
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedItem(data._id)}
          className="h-8 w-8 grid place-items-center rounded-xl hover:bg-black/10 transition-all"
        >
          <span className={`${isOpen ? "rotate-180" : ""} transition-all`}>
            <ChevronDown size={18} />
          </span>
        </button>
        <span className="w-18 flex items-center select-none">
          {data.numberCard}
        </span>
      </div>
      <span className="w-80 md:w-96 select-none truncate">
        {data.name + " " + data.surname}
      </span>
      <span className="w-28 select-none truncate">{data.phone}</span>
      <span className="w-44 select-none truncate">{data.cin}</span>
      <div className="flex gap-2">
        <button className="h-8 w-8 grid place-items-center rounded-xl bg-black/10 hover:bg-black/20 hover:text-gray-800 transition-all">
          <Pencil size={16} />
        </button>
        <button className="h-8 w-8 grid place-items-center rounded-xl bg-black/10 hover:bg-red-200 hover:text-red-500 transition-all">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const Details = () => {
  const { extraInfo } = useDistributorStore();

  if (!extraInfo) return null

  const { numberCard, name, surname, phone, cin, address, upline, sponsor } = extraInfo

  return (
    <motion.div
      initial={{ height: 0, opacity: 0, padding: 0 }}
      animate={{ height: "auto", opacity: 1, paddingLeft: 48, padding: 8 }}
      exit={{ opacity: 0, height: 0, padding: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b-2 border-gray-700 pl-12 flex flex-col justify-between p-2 gap-4 overflow-hidden"
    >
      <InformationWrapper title={"Consultant"}>
        <InformationDetails title="Nom et prénom">
          <Information text={ name } />
          <Information text={ surname } />
        </InformationDetails>
        <InformationDetails title="Détails">
          <Information text={ numberCard } />
          <Information text={ phone } />
          <Information text={ cin } />
        </InformationDetails>
        <InformationDetails title="Adresse">
          <Information text={ address } />
        </InformationDetails>
      </InformationWrapper>
      { upline && (
        <InformationWrapper title={"Upline"}>
          <InformationDetails title="Nom et prénom">
            <Information text={ upline.name } />
            <Information text={ upline.surname } />
          </InformationDetails>
          <InformationDetails title="Détails">
            <Information text={ upline.numberCard } />
            <Information text={ upline.phone } />
            <Information text={ upline.cin } />
          </InformationDetails>
        </InformationWrapper>
      ) }
      { sponsor && (
        <InformationWrapper title={"Sponsor"}>
          <InformationDetails title="Nom et prénom">
            <Information text={ sponsor.name } />
            <Information text={ sponsor.surname } />
          </InformationDetails>
          <InformationDetails title="Détails">
            <Information text={ sponsor.numberCard } />
            <Information text={ sponsor.phone } />
            <Information text={ sponsor.cin } />
          </InformationDetails>
        </InformationWrapper>
      ) }
    </motion.div>
  );
};
