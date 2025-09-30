export const Separetor = ({
  marginY,
  color,
}: {
  marginY: number;
  color: string;
}) => {
  return (
    <div
      className={`border border-${color}-200 dark:border-${color}-800 my-${marginY}`}
    ></div>
  );
};
