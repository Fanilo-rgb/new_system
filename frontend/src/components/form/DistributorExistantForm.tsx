
import { motion } from "motion/react";
import React, { useState } from "react";
import {useDistributorStore} from "../../../stores/distributorStore.ts";
import GenderSelector from "./GenderSelector.tsx";
import Button from "../Button.tsx";
import FormField from "./FormField.tsx";

const DistributorExistantForm = () => {
  const [formData, setFormData] = useState({
    _id: "",
    numberCard: "",
    name: "",
    surname: "",
    gender: "",
  })

  const { createDistributor } = useDistributorStore();

  const handleChange = (field: string, value: string | null) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit =  async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const {success, message} = await createDistributor(formData)
    console.log(success, message)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, translateY: -10, height:384 }}
      animate={{ opacity: 1, translateY: 0, height:"auto" }}
      className="flex flex-col gap-3 mt-3"
    >
      <FormField
        onChange={(e) => handleChange("numberCard", e.target.value)}
        placeholder="Numéro Carte"
      />
      <FormField
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Nom"
      />
      <FormField
        onChange={(e) => handleChange("surname", e.target.value)}
        placeholder="Prénom"
      />
      <GenderSelector
        selected={formData.gender as "male" | "female" | ""}
        onChange={(value) => handleChange("gender", value === "male" ? "male" : "female")}
      />
      <Button
        type="submit"
        className="mt-2 w-full"
      >
        Enregistrer
      </Button>
    </motion.form>
  );
};

export default DistributorExistantForm;
