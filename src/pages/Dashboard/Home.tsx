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

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 ">
          <EcommerceMetrics />
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
