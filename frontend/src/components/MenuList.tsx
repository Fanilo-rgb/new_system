import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

type menuListProps = {
  onToggle: () => void;
  link: { placeholder: string; to: string }[];
};

const MenuList = ({ onToggle, link }: menuListProps) => {
  const linkList = link.map((l, index) => (
    <motion.li
      key={index}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        delay: index * 0.08,
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="w-full flex"
    >
      <Link
        to={l.to}
        onClick={onToggle}
        className="w-full bg-transparent hover:bg-black/10 px-2 py-1 rounded-md transition-all"
      >
        {l.placeholder}
      </Link>
    </motion.li>
  ));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)", y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute right-0 top-12 bg-white/90 w-fit rounded-xl overflow-hidden text-sm shadow-lg"
    >
      <ul className="p-2 flex flex-col gap-2 w-48">
        <AnimatePresence>{linkList}</AnimatePresence>
      </ul>
    </motion.div>
  );
};

export default MenuList;
