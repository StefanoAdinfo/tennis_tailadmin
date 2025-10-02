import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import UsersCollect from "./pages/ToCollect/UsersCollect";
import ReservationCollect from "./pages/ToCollect/ReservationCollect";
import Revenue from "./pages/Revenue";
import Users from "./pages/Users";
import UsersShow from "./pages/Users/show";
import UsersUpdate from "./pages/Users/update";

import Courts from "./pages/Courts";
import CourtsCreate from "./pages/Courts/create";
import CourtsUpdate from "./pages/Courts/update";
import Booking from "./pages/Booking";
import "react-day-picker/dist/style.css";
import { CalendarProvider } from "@/calendar/contexts/calendar-context";
import { getEvents, get_Courts } from "~/calendar/requests";

// Fetch your events and users data
const events = await getEvents();
const courts = await get_Courts();

// Rimuove la prima lettera e la rende grande e sostituisci - con spazio
// g = global verifica tutta la stringa
const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");

export default function App() {
  // Divide la stringa ogni volta che trova uno slash /, restituendo un array, e eleimina gli elementi vuoti con filter(Boolean)
  const segments = location.pathname.split("/").filter(Boolean);
  return (
    <>
      <CalendarProvider courts={courts} events={events}>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Dashboard Layout */}
            <Route element={<AppLayout />}>
              {/* Menu  */}
              <Route index path="/" element={<Home />} />
              <Route path="/calendario" element={<Calendar />} />
              {/* Pagamenti */}
              <Route path="/utenti-da-incassare" element={<UsersCollect />} />
              <Route
                path="/partite-da-incassare"
                element={<ReservationCollect />}
              />
              <Route path="/incassi" element={<Revenue />} />
              {/* Anagrafica */}
              <Route path="/utenti" element={<Users />} />
              <Route path="/utenti/:id" element={<UsersShow />} />
              <Route path="/utenti/:id/modifica" element={<UsersUpdate />} />
              <Route path="/campi" element={<Courts />} />
              <Route path="/campi/creazione" element={<CourtsCreate />} />
              <Route path="/campi/modifica/:id" element={<CourtsUpdate />} />
              {/* Prenota */}
              <Route path="/prenota" element={<Booking />} />
              {/* Profile */}
              <Route path="/profile" element={<UserProfiles />} />

              {/* Others Page */}
              <Route path="/blank" element={<Blank />} />

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />

              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />

              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>

            {/* Auth Layout */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CalendarProvider>
    </>
  );
}
