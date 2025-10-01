export const Separator = ({
  marginY = "5",
  color = "gray",
}: {
  marginY?: string;
  color?: string;
}) => {
  return (
    <div
      className={`border border-${color}-200 dark:border-${color}-800 my-${marginY}`}
    ></div>
  );
};
