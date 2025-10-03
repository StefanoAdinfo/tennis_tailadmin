import ComponentCard from "../../components/common/ComponentCard";
import BasicTableCollectUsers from "../../components/tables/BasicTables/BasicTableCollectUsers";

export default function UsersCollect() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <ComponentCard>
            <BasicTableCollectUsers />
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
