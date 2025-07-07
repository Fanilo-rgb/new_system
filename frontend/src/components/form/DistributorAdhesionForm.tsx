import React, { useState } from "react";
import GenderSelector from "./GenderSelector";
import { motion } from "motion/react";
import Button from "../Button.tsx";
import FormField from "./FormField.tsx";

const mockDistributors = [
  { id: "1", name: "Andriambololona" },
  { id: "2", name: "Rakotoarisoa" },
  { id: "3", name: "Rasoamanana" },
];

const DistributorForm = () => {
  const [formData, setFormData] = useState({
    numberCard: "",
    name: "",
    surname: "",
    gender: "",
    cin: "",
    phone: "",
    address: "Antananarivo",
    postalCode: "101",
    upline: null,
    sponsor: null,
  });

  const [filteredList, setFilteredList] = useState<{ id: string; name: string }[]>([]);
  const [showUplineOptions, setShowUplineOptions] = useState(false);
  const [showSponsorOptions, setShowSponsorOptions] = useState(false);

  const handleChange = (field: string, value: string | null) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAutocomplete = (value: string, field: "upline" | "sponsor") => {
    const results = mockDistributors.filter((d) =>
      d.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(results);
    if (field === "upline") setShowUplineOptions(true);
    if (field === "sponsor") setShowSponsorOptions(true);
  };

  const handleSelect = (field: "upline" | "sponsor", distributor: any) => {
    setFormData({ ...formData, [field]: distributor.id });
    if (field === "upline") setShowUplineOptions(false);
    if (field === "sponsor") setShowSponsorOptions(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, translateY: -10, height:290 }}
      animate={{ opacity: 1, translateY: 0, height:384 }}
      className="flex flex-col gap-4 pr-1 bg-white rounded-2xl w-full max-w-md mx-auto overflow-auto"
    >
      <FormField
        placeholder="Numéro Carte"
        value={formData.numberCard}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("numberCard", e.target.value)}
      />
      <FormField
        placeholder="Nom"
        value={formData.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("name", e.target.value)}
      />
      <FormField
        placeholder="Prénom"
        value={formData.surname}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("surname", e.target.value)}
      />
      <GenderSelector
        selected={formData.gender as "male" | "female" | ""}
        onChange={(value) => handleChange("gender", value === "male" ? "male" : "female")}
      />
      <FormField
        placeholder="CIN"
        value={formData.cin}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("cin", e.target.value)}
      />
      <FormField
        placeholder="Téléphone"
        value={formData.phone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("phone", e.target.value)}
      />
      <FormField
        placeholder="Adresse"
        value={formData.address}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("address", e.target.value)}
      />
      <FormField
        placeholder="Code Postal"
        value={formData.postalCode}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("postalCode", e.target.value)}
        type="number"
      />

      {/* UPLINE Autocomplete */}
      <div className="relative">
        <input
          type="text"
          placeholder="Upline"
          onChange={(e) => handleAutocomplete(e.target.value, "upline")}
          className="w-full rounded-xl p-2 border border-gray-300 bg-white text-sm"
        />
        {showUplineOptions && (
          <ul className="absolute w-full bg-white border rounded-lg mt-1 shadow z-10">
            {filteredList.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect("upline", item)}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* SPONSOR Autocomplete */}
      <div className="relative">
        <input
          type="text"
          placeholder="Sponsor"
          onChange={(e) => handleAutocomplete(e.target.value, "sponsor")}
          className="w-full rounded-xl p-2 border border-gray-300 bg-white text-sm"
        />
        {showSponsorOptions && (
          <ul className="absolute w-full bg-white border rounded-lg mt-1 shadow z-10">
            {filteredList.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect("sponsor", item)}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button type="submit" className="w-full mt-2">
        Enregistrer
      </Button>
    </motion.form>
  );
};

export default DistributorForm;
