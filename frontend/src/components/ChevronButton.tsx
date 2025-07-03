import {ChevronDown} from "lucide-react";
import {type JSX} from "react";
import MenuList from "./MenuList.tsx";

type chevronButtonProps = {
  icon: JSX.Element;
  isActive: boolean;
  onToggle: () => void;
  link: { placeholder: string; to: string }[];
}

const ChevronButton = ({ icon, onToggle, isActive, link } : chevronButtonProps) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 h-10 px-2 link"
      >
        {icon}
        <div>
          <ChevronDown size={18}/>
        </div>
      </button>
      {isActive && <MenuList onToggle={onToggle} link={link} />}
    </div>
  )
}
export default ChevronButton
