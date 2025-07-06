type FormFieldProps = {
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormField = ({ placeholder, type = "text", value, onChange }: FormFieldProps) => (
  <div className="bg-gray-100 p-1 rounded-xl">
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      className="text-sm w-full rounded-lg p-2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      onChange={onChange}
    />
  </div>
);

export default FormField;

