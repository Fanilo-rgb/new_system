import { X } from "lucide-react";
import {useModalStore} from "../../../stores/store.ts";

const HeaderWithClose = ({ title }: { title: string }) => {
  const { setShowModal } = useModalStore();

  return (
  <div className="flex justify-between items-center px-2">
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    <button
      onClick={() => setShowModal(false)}
      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
    >
      <X size={20} className="text-gray-500" />
    </button>
  </div>
)};

export default HeaderWithClose;


