import { useState } from "react";
import { Link, useNavigate } from "react-router"; // Assicurati di usare 'react-router-dom'
import { toast } from "sonner"; // *** 1. Importa la funzione toast da Sonner ***

import { ChevronLeftIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

// Rimuovi la funzione showToast di placeholder

export default function ResendActivationEmailForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Per favore, inserisci la tua email.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      toast.success(`Istruzioni inviate correttamente.`, {
        description: ` Controlla la tua email.`,
        duration: 5000,
      });

      navigate("/signin");
    }, 1500);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/signin" // Torna alla pagina di Login
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Torna al Login
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Reinvia email di attivazione
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Inserisci la tua email per ricevere il link di attivazione
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email-reset">
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    id="email-reset"
                    type="email"
                    placeholder="info@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <Button className="w-full" size="sm" disabled={isLoading}>
                    {isLoading ? "Invio in corso..." : "Invia"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
