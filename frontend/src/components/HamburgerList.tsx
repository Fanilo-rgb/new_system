import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import React from "react";

type listType = {
  title: string;
  links: { placeholder: string; url?: string; type?: string }[];
};

const list: listType[] = [
  {
    title: "+ Ajout",
    links: [
      { placeholder: "Ajout stock", url: "/" },
      { placeholder: "Ajout client" },
      { placeholder: "Ajout distributeur" },
    ],
  },
  {
    title: "Shop",
    links: [
      { placeholder: "Ventes", url: "/" },
      { placeholder: "Commandes", url: "/" },
      { placeholder: "Factures", url: "/" },
    ],
  },
];

const HamburgerList = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute right-0 top-12 bg-white/90 w-fit rounded-xl overflow-hidden text-sm shadow-lg"
    >
      <ul className="p-2 flex flex-col gap-2 w-48">
        <AnimatePresence>
          {list.map((item, index) => (
            <React.Fragment key={item.title}>
              <motion.li
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.1 }}
                className="w-full"
              >
                <p className="text-gray-600 text-xs py-2">{item.title}</p>
                <ul className="flex flex-col gap-1">
                  {item.links.map((link, i) => (
                    <li key={i} className="flex">
                      {link.url ? (
                        <Link
                          to={link.url}
                          className="bg-transparent hover:bg-black/10 w-full p-2 rounded-md transition-all"
                        >
                          {link.placeholder}
                        </Link>
                      ) : (
                        <button className="bg-transparent text-left hover:bg-black/10 w-full p-2 rounded-md transition-all">
                          {link.placeholder}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.li>

              {/* Séparateur sauf après le dernier élément */}
              {index !== list.length - 1 && (
                <motion.hr
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut", delay: index * 0.1 + 0.1 }}
                  className="border-t border-gray-300 w-32 mx-auto my-2"
                />
              )}
            </React.Fragment>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
};

export default HamburgerList;
