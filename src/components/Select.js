import { useFormContext } from "react-hook-form";

export function Select({
  containerClassName,
  options,
  name,
  label,
  className,
  ...props
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        {...props}
        id={name}
        className={`border border-sky-700 p-2 rounded ${className}`}
        {...register(name)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name]?.message && (
        <span className="text-sm text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
}
