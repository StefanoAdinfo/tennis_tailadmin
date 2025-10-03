import ComponentCard from "../../components/common/ComponentCard";
import BasicTableCollectGames from "../../components/tables/BasicTables/BasicTableCollectGames";

export default function ReservationCollect() {
  return (
    <>
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
