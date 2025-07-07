import { useState } from "react";
import DistributorExistantForm from "./DistributorExistantForm.tsx";
import DistributorAdhesionForm from "./DistributorAdhesionForm.tsx";
import { motion } from "motion/react";
import HeaderWithClose from "../modal/HeaderWithClose.tsx";

const DistributorForm = () => {
  const [activeTab, setActiveTab] = useState<"Existant" | "Adhésion">("Existant");

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      className="flex flex-col gap-4 p-4 bg-white rounded-2xl shadow w-full max-w-md mx-auto h-fit overflow-auto"
    >
      <HeaderWithClose title="Ajout distributeur" />
      <div className="flex bg-gray-100 rounded-xl overflow-hidden mt-1">
        {["Existant", "Adhésion"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "Existant" | "Adhésion")}
            className={`flex-1 text-sm font-medium py-2 transition-all ${
              activeTab === tab
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Existant" ? (
        <DistributorExistantForm />
      ) : (
        <DistributorAdhesionForm />
      )}
    </motion.div>
  );
};

export default DistributorForm;
