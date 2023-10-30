export function Button({ className, ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 text-center font-bold text-lg rounded bg-sky-600 text-white ${className}`}
    />
  );
}
