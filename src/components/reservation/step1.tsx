export default function Step1() {
  const cards = [
    {
      id: 1,
      date: "2025-04-10",
      day: "Lunedi",
      month: "Aprile",
      disabled: true,
      active: false,
    },
    {
      id: 2,
      date: "2025-04-11",
      day: "Martedi",
      month: "Aprile",
      disabled: true,
      active: false,
    },
    {
      id: 3,
      date: "2025-04-12",
      day: "Mercoledi",
      month: "Aprile",
      disabled: true,
      active: false,
    },
    {
      id: 4,
      date: "2025-04-13",
      day: "Giovedi",
      month: "Aprile",
      disabled: true,
      active: false,
    },
    {
      id: 5,
      date: "2025-04-14",
      day: "Venerdi",
      month: "Aprile",
      disabled: true,
      active: false,
    },
    {
      id: 6,
      date: "2025-04-15",
      day: "Sabato",
      month: "Aprile",
      disabled: false,
      active: true,
    },
    {
      id: 7,
      date: "2025-04-16",
      day: "Domenica",
      month: "Aprile",
      disabled: false,
      active: false,
    },
    {
      id: 8,
      date: "2025-04-17",
      day: "Lunedi",
      month: "Aprile",
      disabled: false,
      active: false,
    },
    {
      id: 9,
      date: "2025-04-18",
      day: "Martedi",
      month: "Aprile",
      disabled: false,
      active: false,
    },
    {
      id: 10,
      date: "2025-04-19",
      day: "Mercoledi",
      month: "Aprile",
      disabled: false,
      active: false,
    },
    {
      id: 11,
      date: "2025-04-20",
      day: "Giovedi",
      month: "Aprile",
      disabled: false,
      active: false,
    },
    {
      id: 12,
      date: "2025-04-21",
      day: "Venerdi",
      month: "Aprile",
      disabled: false,
      active: false,
    },
    {
      id: 13,
      date: "2025-04-22",
      day: "Sabato",
      month: "Aprile",
      disabled: false,
      active: false,
    },
    {
      id: 14,
      date: "2025-04-23",
      day: "Domenica",
      month: "Aprile",
      disabled: false,
      active: false,
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 md:grid-cols-5 lg:grid-cols-7 lg:gap-4">
      {cards.map((card) => {
        const data = new Date(card.date);
        return (
          <div key={card.id} className="flex items-center justify-center ">
            <div
              key={card.id}
              className={`flex flex-col items-center text-center rounded-xl shadow-none py-2 md:py-4 w-full border 
                    
                    ${
                      // STATO NORMALE: Sfondo bianco/scuro, bordo grigio chiaro/scuro
                      !card.active && !card.disabled
                        ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                        : ""
                    }
                    ${
                      // HOVER NORMALE: Bordo brand-600/gray-200
                      !card.active && !card.disabled
                        ? "hover:border-brand-600 dark:hover:border-gray-200 cursor-pointer transition-all hover:scale-105"
                        : ""
                    }
                    ${
                      // STATO DISABILITATO: Sfondo/testo grigio chiaro/scuro e opacità ridotta
                      !card.active && card.disabled
                        ? "cursor-not-allowed bg-gray-100 dark:bg-gray-900 text-gray-300 dark:text-gray-600 border-gray-200 dark:border-gray-700 opacity-70"
                        : ""
                    }
                    ${
                      // STATO ATTIVO: Sfondo brand-600, testo bianco, bordo brand-600
                      card.active && !card.disabled
                        ? "bg-brand-600 text-white border-brand-600"
                        : ""
                    }
                    `}
            >
              <div className="flex flex-col lg:gap-4">
                {/* Il testo erediterà il colore dal contenitore principale */}
                <p>{card.day}</p>
                <h4 className="text-4xl font-bold">{data.getDate()}</h4>
                <p>{card.month}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
