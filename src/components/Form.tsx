import { useState, type ReactNode } from "react";

interface Field {
  name: string;
  type: string;
  min?: number;
  step?: number;
  placeholder: string;
  required?: boolean;
}

interface FormProps {
  title: string;
  fields: Field[];
  children?: ReactNode;
  submitLabel?: string;
  onSubmit: (values: Record<string, string>) => void | Promise<void>;
  withBackground?: boolean;
}

function Form({
  title,
  fields,
  children,
  onSubmit,
  submitLabel = "Submit",
  withBackground = true,
}: FormProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(values);
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen p-4 ${
        withBackground ? "min-h-screen bg-gray-100" : ""
      }`}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              min={field.min}
              step={field.step}
              placeholder={field.placeholder}
              required={field.required}
              value={values[field.name] || ""}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          ))}
          {children && <div className="mt-2 text-center">{children}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
