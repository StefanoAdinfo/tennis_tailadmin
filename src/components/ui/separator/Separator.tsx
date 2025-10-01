export const Separator = ({
  color = "gray",
  className = "",
}: {
  color?: string;
  className?: string;
}) => {
  return (
    <div
      className={`border-[0.8px] border-${color}-100 dark:border-${color}-700 ${className}`}
    ></div>
  );
};
