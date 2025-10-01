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
import Courts from "./pages/Courts";
import Booking from "./pages/Booking";

<script src="https://cdn.jsdelivr.net/npm/flowbite@2.3.0/dist/flowbite.min.js"></script>;
export default function App() {
  return (
    <>
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
            <Route path="/campi" element={<Courts />} />
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
    </>
  );
}
