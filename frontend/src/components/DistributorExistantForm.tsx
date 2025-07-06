import FormField from "./FormField";
import Button from "./Button";
import { motion } from "motion/react";
import GenderSelector from "./GenderSelector.tsx";
import { useState } from "react";

const DistributorExistantForm = () => {
  const [formData, setFormData] = useState({
    gender: ""
  })

  const handleChange = (field: string, value: string | null) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <motion.form
      initial={{ opacity: 0, translateY: -10, height:384 }}
      animate={{ opacity: 1, translateY: 0, height:"auto" }}
      className="flex flex-col gap-3 mt-3"
    >
      <FormField placeholder="Numéro Carte" />
      <FormField placeholder="Nom" />
      <FormField placeholder="Prénom" />
      <GenderSelector
        selected={formData.gender as "male" | "female" | ""}
        onChange={(value) => handleChange("gender", value === "male" ? "male" : "female")}
      />
      <Button type="submit" className="mt-2 w-full">Rechercher</Button>
    </motion.form>
  );
};

export default DistributorExistantForm;
