import Button from "~/components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import { useEffect, useState } from "react";

export default function BasicTableOne() {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS50ZW5uaXNjbHVib3R0YXZpYW5vLml0L2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNzU5ODQ2ODc3LCJleHAiOjE3NTk4NTA0NzcsIm5iZiI6MTc1OTg0Njg3NywianRpIjoiQmlKSGloVkF4Tk9iSUZxdCIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwiZW1haWwiOiJzLmRhbmllbGxvQGFkaW5mby5pdCJ9.QXg9UDClLObiDl0vkozLhVsKL2ugglzD_jI4Ff86s0s";

  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page) => {
    if (page !== currentPage) setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (meta && currentPage < meta.last_page)
      setCurrentPage((prev) => prev + 1);
  };

  const renderPageNumbers = () => {
    if (!meta) return null;

    const pages = [];
    for (let i = 1; i <= meta.last_page; i++) {
      pages.push(
        <li onClick={() => handlePageClick(i)} key={i}>
          <button
            className={`${i == currentPage ? "bg-brand-500 text-white" : "hover:bg-brand-500/[0.08] dark:hover:bg-brand-500 dark:hover:text-white hover:text-brand-500"} flex h-10 w-10 items-center justify-center rounded-lg text-theme-sm font-medium text-gray-700 dark:text-gray-200`}
          >
            {i}
          </button>
        </li>
      );
    }

    return pages;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.tennisclubottaviano.it/api/UsersTotUnpaid?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Errore: ${response.status}`);
        }

        const result = await response.json();
        setData(result.data);
        setMeta(result.meta);
      } catch (error) {
        console.error("Errore durante il fetch dei dati:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Utente
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Totale
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                Azione
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((userUnpaid) => (
              <TableRow key={userUnpaid.user_id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {userUnpaid.surname}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {userUnpaid.total_amount}€
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm dark:text-gray-400 text-center">
                  <Button
                    variant="ghost"
                    className="text-green-500 hover:underline text-xs"
                  >
                    PAGA
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {meta && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-white/[0.05]">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentPage == 1}
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.58301 9.99868C2.58272 10.1909 2.65588 10.3833 2.80249 10.53L7.79915 15.5301C8.09194 15.8231 8.56682 15.8233 8.85981 15.5305C9.15281 15.2377 9.15297 14.7629 8.86018 14.4699L5.14009 10.7472L16.6675 10.7472C17.0817 10.7472 17.4175 10.4114 17.4175 9.99715C17.4175 9.58294 17.0817 9.24715 16.6675 9.24715L5.14554 9.24715L8.86017 5.53016C9.15297 5.23717 9.15282 4.7623 8.85983 4.4695C8.56684 4.1767 8.09197 4.17685 7.79917 4.46984L2.84167 9.43049C2.68321 9.568 2.58301 9.77087 2.58301 9.99715C2.58301 9.99766 2.58301 9.99817 2.58301 9.99868Z"
                    fill=""
                  ></path>
                </svg>
                <span className="hidden sm:inline">Previous</span>
              </Button>

              <ul className="hidden items-center gap-0.5 sm:flex">
                {renderPageNumbers()}
              </ul>

              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentPage === meta.last_page}
              >
                <span className="hidden sm:inline">Next</span>
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.4175 9.9986C17.4178 10.1909 17.3446 10.3832 17.198 10.53L12.2013 15.5301C11.9085 15.8231 11.4337 15.8233 11.1407 15.5305C10.8477 15.2377 10.8475 14.7629 11.1403 14.4699L14.8604 10.7472L3.33301 10.7472C2.91879 10.7472 2.58301 10.4114 2.58301 9.99715C2.58301 9.58294 2.91879 9.24715 3.33301 9.24715L14.8549 9.24715L11.1403 5.53016C10.8475 5.23717 10.8477 4.7623 11.1407 4.4695C11.4336 4.1767 11.9085 4.17685 12.2013 4.46984L17.1588 9.43049C17.3173 9.568 17.4175 9.77087 17.4175 9.99715C17.4175 9.99763 17.4175 9.99812 17.4175 9.9986Z"
                    fill=""
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
