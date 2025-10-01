export const Separator = ({
  marginY = "5",
  color = "gray",
}: {
  marginY?: string;
  color?: string;
}) => {
  return (
    <div
      className={`border-[0.8px] border-${color}-100 dark:border-${color}-700 my-${marginY}`}
    ></div>
  );
};
