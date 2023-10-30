import { useFormContext } from "react-hook-form";

export const Input = ({ name, label, className, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...props}
        id={name}
        className={`border border-sky-700 p-2 rounded ${className}`}
        {...register(name)}
      />
      {errors[name]?.message && (
        <span className="text-sm text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
};

Input.displayName = "input";
