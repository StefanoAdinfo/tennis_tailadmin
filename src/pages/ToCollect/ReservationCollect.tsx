import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableCollectGames from "../../components/tables/BasicTables/BasicTableCollectGames";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function ReservationCollect() {
  return (
    <>
      <PageBreadcrumb pageTitle="Partite da incassare" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <ComponentCard>
            <BasicTableCollectGames />
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
