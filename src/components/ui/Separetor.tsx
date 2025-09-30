export const Separetor = ({
  marginY = "5",
  color,
}: {
  marginY?: string;
  color: string;
}) => {
  return (
    <div
      className={`border border-${color}-200 dark:border-${color}-800 my-${marginY}`}
    ></div>
  );
};
