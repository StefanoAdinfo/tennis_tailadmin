import { Link } from "react-router";
import { ArrowRightIcon } from "../../icons";
import Button from "../ui/button/Button";
import { Separator } from "../ui/separator/Separator";

interface ComponentCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  customButton?: React.ReactNode;
  buttonShow?: boolean;
  buttonText?: string;
  to?: string;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  buttonShow = false,
  customButton = null,
  to,
  buttonText,
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {title && (
        <div className="mx-1">
          {/* Card Header */}
          <div className="px-6 py-5 flex justify-between items-center ">
            <div>
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                {title}
              </h3>
              {desc && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {desc}
                </p>
              )}
            </div>{" "}
            {buttonShow &&
              (customButton ? (
                customButton
              ) : (
                <Link to={to || "#"}>
                  <Button variant="outline">
                    {buttonText || "Vedi tutti"}
                    <ArrowRightIcon className="size-5 " fill="currentColor" />
                  </Button>
                </Link>
              ))}
          </div>
          <Separator />
        </div>
      )}

      {/* Card Body */}
      <div className="p-4 sm:p-6">
        <div className="space-y-6 ">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
