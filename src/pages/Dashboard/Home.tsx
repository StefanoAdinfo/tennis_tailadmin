import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
// import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
// import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableCollectGames from "../../components/tables/BasicTables/BasicTableCollectGames";
import BasicTableCollectUsers from "../../components/tables/BasicTables/BasicTableCollectUsers";
import BasicTableNextGame from "../../components/tables/BasicTables/BasicTableNextGame";
import DataCard from "~/components/ui/card/DataCard";
import { WalletMinimal, EuroIcon, CalendarPlus, CalendarOff } from "~/icons";
import FilterTableProva from "~/components/tables/FilterTables/FilterTableProva";
import BasicTableOne from "~/components/tables/BasicTables/BasicTableOne";
import BasicTableOneCopy from "~/components/tables/BasicTables/BasicTableOneCopy";
import TanstackTable from "~/components/tables/TanstackTable/TanstackTable";
import TanstackTableNextGame from "~/components/tables/TanstackTable/TanstackTableUser";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 ">
          {/* <EcommerceMetrics /> */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
            <DataCard
              icon={<WalletMinimal />}
              title={"Totale Incassato"}
              result={"10"}
              badgeStatus={"success"}
              percentage={11.01}
              bgIcon="bg-yellow-200 dark:bg-yellow-600"
            />
            <DataCard
              icon={<EuroIcon />}
              title={"Totale da incassare"}
              result={"89"}
              badgeStatus={"error"}
              percentage={1.01}
              bgIcon="bg-blue-200 dark:bg-blue-800"
            />
            <DataCard
              icon={<CalendarPlus />}
              title={"Totale Partite"}
              result={"2350€"}
              badgeStatus={"success"}
              percentage={8.01}
              bgIcon="bg-green-200 dark:bg-green-800"
            />
            <DataCard
              icon={<CalendarOff />}
              title={"Partite Annullate"}
              result={"145"}
              badgeStatus={"error"}
              percentage={3.01}
              bgIcon="bg-red-200 dark:bg-red-800"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 space-y-6">
          <ComponentCard
            title="Partite da incassare"
            buttonShow
            to="/partite-da-incassare"
          >
            <BasicTableCollectGames />
          </ComponentCard>
        </div>

        <div className="col-span-12 md:col-span-6 space-y-6">
          <ComponentCard
            title="Utenti da incassare"
            buttonShow
            to="/utenti-da-incassare"
          >
            <BasicTableCollectUsers />
          </ComponentCard>
        </div>

        <div className="col-span-12 space-y-6">
          <ComponentCard
            title="Prossime partite"
            buttonShow
            to="/calendario"
            buttonText="Calendario"
          >
            <BasicTableNextGame />
          </ComponentCard>
        </div>

        <div className="col-span-12 space-y-6">
          <ComponentCard title="Tabella Tanstack Table">
            <TanstackTable />
          </ComponentCard>
        </div>

        {/* <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div> */}

        {/* <div className="col-span-12">
          <StatisticsChart />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      </div>
    </>
  );
}
