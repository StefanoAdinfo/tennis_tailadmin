import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
// import BasicTableUsers from "../../components/tables/BasicTables/BasicTableUsers";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { useLocation, useParams } from "react-router";
import { Reservation } from "../../lib/type";
import DataCard from "../../components/ui/card/DataCard";
import {
  CalendarOff,
  CalendarPlus,
  EnvelopeIcon,
  EuroIcon,
  WalletMinimal,
} from "../../icons";
import Avatar from "../../components/ui/my_avatar/Avatar";
import { Separator } from "../../components/ui/separator/Separator";
import Switch from "../../components/form/switch/Switch";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";

import BasicTablePlayedGames from "../../components/tables/BasicTables/BasicTablePlayedGames";

const tableData: Reservation[] = [
  {
    id: "1",
    user: {
      id: "1",
      name: "Giuseppe",
      surname: "Verdi",
      email: "giuseppe.verdi@example.com",
      role: "utente",
      memeber_type: "socio",
      is_active: true,
      junior: false,
      avatar: "/images/user/user-35.jpg",
      card: "141124214124",
      phone_number: "555-123-4567",
    },
    court: {
      id: "1",
      name: "Campo 1",
      picturePath: null,
      court_type: "",
      location: "",
      active: 0,
      price_socio: 0,
      price_non_socio: 0,
      price_lights: 0,
      price_junior: 0,
      special_days: null,
      timetable: null,
    },
    startDate: "17/06/2025 - 13:00",
    endDate: "17/06/2025 - 14:00",
    is_double: false,
    is_cancelled: false,
    phone_number: "555-123-4567",
    total_amount: 90,
    lights_cost: 0,
    is_paid: false,
    note: "",
    partecipants: [
      {
        id: "p101",
        name: "Mario",
        surname: "Rossi",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "mario.rossi@example.com",
        avatar: null,
      },
      {
        id: "p102",
        name: "Luisa",
        surname: "Verdi",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "luisa.verdi@example.com",
        avatar: null,
      },
    ],
    court_name: "Campo 3",
    date: "30/06/2025 - 15:00",
    duration: "1h",
    light: false,
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Lucia",
      surname: "Blu",
      email: "lucia.blu@example.com",
      role: "utente",
      memeber_type: "socio",
      is_active: true,
      junior: false,
      avatar: "/images/user/user-35.jpg",
      card: "141124214124",
      phone_number: "555-123-4567",
    },
    court: {
      id: "2",
      name: "Campo 2",
      picturePath: null,
      court_type: "",
      location: "",
      active: 0,
      price_socio: 0,
      price_non_socio: 0,
      price_lights: 0,
      price_junior: 0,
      special_days: null,
      timetable: null,
    },
    startDate: "30/06/2025 - 13:00",
    endDate: "30/06/2025 - 14:00",
    is_double: true,
    is_cancelled: false,
    phone_number: "555-987-6543",
    total_amount: 75,
    lights_cost: 0,
    is_paid: false,
    note: "",
    partecipants: [
      {
        id: "p201",
        name: "Giovanni",
        surname: "Bianchi",
        credit: 10,
        is_paid: false,
        total_amount: 20.4,
        email: "giovanni.bianchi@example.com",
        avatar: null,
      },
      {
        id: "p202",
        name: "Anna",
        surname: "Neri",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "anna.neri@example.com",
        avatar: null,
      },
      {
        id: "p203",
        name: "Paolo",
        surname: "Gialli",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "paolo.gialli@example.com",
        avatar: null,
      },
    ],
    court_name: "Campo 3",
    date: "30/06/2025 - 15:00",
    duration: "1h",
    light: false,
  },
  {
    id: "3",
    user: {
      id: "3",
      name: "Francesca",
      surname: "Bruno",
      email: "francesca.bruno@example.com",
      role: "utente",
      memeber_type: "socio",
      is_active: true,
      junior: false,
      avatar: "/images/user/user-35.jpg",
      card: "141124214124",
      phone_number: "555-123-4567",
    },
    court: {
      id: "3",
      name: "Campo 3",
      picturePath: null,
      court_type: "",
      location: "",
      active: 0,
      price_socio: 0,
      price_non_socio: 0,
      price_lights: 0,
      price_junior: 0,
      special_days: null,
      timetable: null,
    },
    startDate: "30/06/2025 - 15:00",
    endDate: "30/06/2025 - 16:00",
    is_double: true,
    is_cancelled: false,
    phone_number: "555-123-4567",
    total_amount: 75,
    lights_cost: 0,
    is_paid: true,
    note: "",
    partecipants: [
      {
        id: "p301",
        name: "Andrea",
        surname: "Gialli",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "andrea.gialli@example.com",
        avatar: null,
      },
      {
        id: "p302",
        name: "Giulia",
        surname: "Verdi",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "giulia.verdi@example.com",
        avatar: null,
      },
      {
        id: null,
        name: "Giovanni",
        surname: null,
        credit: null,
        is_paid: null,
        total_amount: null,
        email: null,
        avatar: null,
      },
    ],
    court_name: "Campo 3",
    date: "30/06/2025 - 15:00",
    duration: "1h",
    light: false,
  },
  {
    id: "4",
    user: {
      id: "4",
      name: "Giuseppe",
      surname: "Verdi",
      email: "giuseppe.verdi@example.com",
      role: "utente",
      memeber_type: "socio",
      is_active: true,
      junior: false,
      avatar: "/images/user/user-35.jpg",
      card: "141124214124",
      phone_number: "555-123-4567",
    },
    court: {
      id: "4",
      name: "Campo 3",
      picturePath: null,
      court_type: "",
      location: "",
      active: 0,
      price_socio: 0,
      price_non_socio: 0,
      price_lights: 0,
      price_junior: 0,
      special_days: null,
      timetable: null,
    },
    startDate: "30/06/2025 - 15:00",
    endDate: "30/06/2025 - 16:00",
    is_double: true,
    is_cancelled: false,
    phone_number: "555-123-4567",
    total_amount: 75,
    lights_cost: 0,
    is_paid: true,
    note: "",
    partecipants: [
      {
        id: "p401",
        name: "Giuseppe",
        surname: "Verdi",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "giuseppe.verdi@example.com",
        avatar: null,
      },
      {
        id: "p402",
        name: "Giulia",
        surname: "Verdi",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "giulia.verdi@example.com",
        avatar: null,
      },
      {
        id: "p403",
        name: "Andrea",
        surname: "Gialli",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "andrea.gialli@example.com",
        avatar: null,
      },
      {
        id: "p404",
        name: "Francesca",
        surname: "Bruno",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "francesca.bruno@example.com",
        avatar: null,
      },
    ],
    court_name: "Campo 3",
    date: "30/06/2025 - 15:00",
    duration: "1h",
    light: false,
  },
  {
    id: "5",
    user: {
      id: "5",
      name: "Francesca",
      surname: "Bruno",
      email: "francesca.bruno@example.com",
      role: "utente",
      memeber_type: "socio",
      is_active: true,
      junior: false,
      avatar: "/images/user/user-35.jpg",
      card: "141124214124",
      phone_number: "555-123-4567",
    },
    court: {
      id: "5",
      name: "Campo 3",
      picturePath: null,
      court_type: "",
      location: "",
      active: 0,
      price_socio: 0,
      price_non_socio: 0,
      price_lights: 0,
      price_junior: 0,
      special_days: null,
      timetable: null,
    },
    startDate: "30/06/2025 - 15:00",
    endDate: "30/06/2025 - 16:00",
    is_double: true,
    is_cancelled: false,
    phone_number: "555-123-4567",
    total_amount: 75,
    lights_cost: 0,
    is_paid: true,
    note: "",
    partecipants: [
      {
        id: "p501",
        name: "Francesca",
        surname: "Bruno",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "francesca.bruno@example.com",
        avatar: null,
      },
      {
        id: "p502",
        name: "Giulia",
        surname: "Verdi",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "giulia.verdi@example.com",
        avatar: null,
      },
      {
        id: null,
        name: "Giovanni",
        surname: null,
        credit: null,
        is_paid: null,
        total_amount: null,
        email: null,
        avatar: null,
      },
      {
        id: "p504",
        name: "Andrea",
        surname: "Gialli",
        credit: 10,
        is_paid: true,
        total_amount: 20.4,
        email: "andrea.gialli@example.com",
        avatar: null,
      },
    ],
    court_name: "Campo 3",
    date: "30/06/2025 - 15:00",
    duration: "1h",
    light: false,
  },
];

export default function UsersShow() {
  const { id } = useParams<{ id: string }>();

  const optionsRole = [
    { value: "user", label: "Utente" },
    { value: "cashier", label: "Cassiere" },
    { value: "admin", label: "Amministratore" },
  ];
  const optionsMember = [
    { value: "socio", label: "Socio" },
    { value: "non_socio", label: "Non socio" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  // const countries = [
  //   { code: "IT", label: "+39" },
  //   { code: "US", label: "+1" },
  //   { code: "GB", label: "+44" },
  //   { code: "CA", label: "+1" },
  //   { code: "AU", label: "+61" },
  // ];
  // const handlePhoneNumberChange = (phoneNumber: string) => {
  //   console.log("Updated phone number:", phoneNumber);
  // };

  const user = tableData.find((item) => item.id === id);

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <ComponentCard title="Statistiche utente">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
              <DataCard
                icon={<CalendarOff />}
                title={"Partite annullate"}
                result={"10"}
                badgeStatus={"success"}
                percentage={11.01}
              />
              <DataCard
                icon={<CalendarPlus />}
                title={"Partite Prenotate"}
                result={"89"}
                badgeStatus={"error"}
                percentage={1.01}
              />
              <DataCard
                icon={<WalletMinimal />}
                title={"Totale pagato"}
                result={"2350€"}
                badgeStatus={"success"}
                percentage={8.01}
              />
              <DataCard
                icon={<EuroIcon />}
                title={"Totale da pagare"}
                result={"145"}
                badgeStatus={"error"}
                percentage={3.01}
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:items-stretch">
              <ComponentCard className="w-full lg:w-2xs ">
                <Avatar
                  avatar={user?.user.avatar}
                  userName={"Stefano"}
                  userSurname={"D'aniello"}
                  size={150}
                />
                <Separator className="my-8" />
                <div className="flex items-center space-x-2 mb-4">
                  <Switch label={""} defaultChecked={user?.user.junior} />
                  <Label htmlFor="airplane-mode">Junior</Label>
                </div>
                <div className="flex items-center space-x-2 my-4">
                  <Switch label={""} defaultChecked={user?.user.is_active} />
                  <Label htmlFor="airplane-mode">Attivo</Label>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Switch label={""} defaultChecked={!user?.user.is_active} />
                  <Label htmlFor="airplane-mode">Bannato</Label>
                </div>
              </ComponentCard>
              {/* Form */}
              <ComponentCard className="w-full lg:flex-1 flex flex-col justify-center">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <Label className="mb-1" htmlFor="name">
                      Nome
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      onChange={(e) => console.log(e.target.value)}
                      value={user?.user.name}
                    />
                  </div>
                  <div className="w-full">
                    <Label className="mb-1" htmlFor="surname">
                      Cognome
                    </Label>
                    <Input
                      type="text"
                      id="surname"
                      onChange={(e) => console.log(e.target.value)}
                      value={user?.user.surname}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="w-full">
                    <Label className="mb-1">Email</Label>
                    <div className="relative">
                      <Input
                        placeholder="inserisci la tua email"
                        type="text"
                        className="pl-[62px]"
                        onChange={(e) => console.log(e.target.value)}
                        value={user?.user.email}
                      />
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                        <EnvelopeIcon className="size-6" />
                      </span>
                    </div>
                  </div>
                  <div className="w-full">
                    <Label className="mb-1">Telefono</Label>
                    {/* <PhoneInput
                      selectPosition="start"
                      countries={countries}
                      placeholder="+1 (555) 000-0000"
                      onChange={handlePhoneNumberChange}
                    /> */}
                    <Input
                      type="phone"
                      id="phone"
                      onChange={(e) => console.log(e.target.value)}
                      value={user?.user.phone_number}
                    />
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-4 mt-4">
                  <div className="w-full">
                    <Label className="mb-1" htmlFor="card">
                      Tessera
                    </Label>
                    <Input
                      type="text"
                      id="card"
                      onChange={(e) => console.log(e.target.value)}
                      value={user?.user.card}
                    />
                  </div>
                  <div className="w-full">
                    <Label className="mb-1">Ruolo</Label>
                    <Select
                      options={optionsRole}
                      placeholder="Select an option"
                      onChange={handleSelectChange}
                      className="dark:bg-dark-900"
                      defaultValue={user?.user.role}
                    />
                  </div>
                  <div className="w-full">
                    <Label className="mb-1">Membro</Label>
                    <Select
                      options={optionsMember}
                      placeholder="Select an option"
                      onChange={handleSelectChange}
                      className="dark:bg-dark-900"
                      defaultValue={user?.user.memeber_type}
                    />
                  </div>
                </div>
              </ComponentCard>
            </div>

            <div className="col-span-12 space-y-6">
              <ComponentCard title="Partite giocate">
                <BasicTablePlayedGames />
              </ComponentCard>
            </div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
