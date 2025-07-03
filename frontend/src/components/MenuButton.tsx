import {Menu} from "lucide-react";
import HamburgerList from "./HamburgerList.tsx";

type menuButtonProps = {
  isActive: boolean;
  onToggle: () => void;
}

const MenuButton = ({ isActive, onToggle }: menuButtonProps) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center px-2.5 link h-10"
      >
        <Menu size={18}/>
      </button>
      { isActive && <HamburgerList/> }
    </div>
  )
}
export default MenuButton
