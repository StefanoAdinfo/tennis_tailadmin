import { Link } from "react-router";

interface BreadcrumbProps {
  urls: { name: string; path: string }[];
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({
  urls = [],
}: BreadcrumbProps) => {
  return (
    <nav className="mb-6">
      <ol className="flex items-center gap-1.5">
        <li className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/">Home</Link>
          <svg
            className="stroke-current"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
              stroke=""
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </li>
        {urls.map((url) => {
          return (
            <li className=" inline-flex items-center gap-1.5  text-sm text-gray-800 dark:text-gray-400">
              <Link to={url.path}>{url.name}</Link>
              {urls.indexOf(url) < urls.length - 1 && (
                <svg
                  className="stroke-current"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                    stroke=""
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default PageBreadcrumb;
