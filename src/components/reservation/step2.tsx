export default function Step2() {
  const dataSelected = {
    id: 1,
    date: new Date("2025-04-15"),
    day: "Lunedi",
    month: "Aprile",
    disabled: true,
    active: false,
  };
  const timeSlots = [
    {
      court_id: 1,
      name: "Campo 1",
      date: "2025-05-19",
      day_of_week: "monday",
      is_special_day: false,
      available_slots: [
        {
          start: "16:00",
          end: "17:00",
          duration: 60,
        },
        {
          start: "17:00",
          end: "18:00",
          duration: 60,
        },
        {
          start: "18:00",
          end: "19:00",
          duration: 60,
        },
        {
          start: "19:00",
          end: "20:00",
          duration: 60,
        },
        {
          start: "20:00",
          end: "21:00",
          duration: 60,
        },
        {
          start: "21:00",
          end: "22:00",
          duration: 60,
        },
      ],
      slot_duration: "1 ora",
    },
    {
      court_id: 3,
      name: "Campo test",
      date: "2025-05-19",
      day_of_week: "monday",
      is_special_day: false,
      available_slots: [
        {
          start: "16:00",
          end: "17:00",
          duration: 60,
        },
        {
          start: "17:00",
          end: "18:00",
          duration: 60,
        },
        {
          start: "18:00",
          end: "19:00",
          duration: 60,
        },
        {
          start: "19:00",
          end: "20:00",
          duration: 60,
        },
        {
          start: "20:00",
          end: "21:00",
          duration: 60,
        },
        {
          start: "21:00",
          end: "22:00",
          duration: 60,
        },
      ],
      slot_duration: "1 ora",
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-none bg-black text-white w-full lg:w-[250px] h-[250px] text-center shadow-none">
        <p className="text-2xl">{dataSelected.day}</p>
        <h4 className="text-6xl font-bold">{dataSelected.date.getDate()}</h4>
        <p className="text-2xl">{dataSelected.month}</p>
      </div>
      <div className="flex-1">
        {timeSlots.map((ts, index) => {
          return (
            <>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">{ts.name}</h3>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
                  {ts.available_slots.map((as) => (
                    <div className="py-2 px-1 md:px-3 border border-gray-200 bg-white shadow-none dark:border-gray-700 dark:bg-gray-800 flex flex-col items-center text-center rounded-xl hover:border hover:border-black cursor-pointer transition-all hover:scale-105">
                      <div className="text-xs md:text-base">
                        {`${as.start} - ${as.end}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {index + 1 < timeSlots.length && (
                <hr className="my-8 border-gray-200" />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
