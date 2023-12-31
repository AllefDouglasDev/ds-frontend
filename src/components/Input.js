import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

const Component = forwardRef(({ asTextarea, ...props }, ref) => {
  return asTextarea ? (
    <textarea {...props} ref={ref}></textarea>
  ) : (
    <input {...props} ref={ref} />
  );
});

Component.displayName = "input";

export const Input = ({
  containerClassName,
  name,
  label,
  className,
  asTextarea = false,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <Component
        asTextarea={asTextarea}
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
