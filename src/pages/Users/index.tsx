import ComponentCard from "../../components/common/ComponentCard";
import BasicTableUsers from "../../components/tables/BasicTables/BasicTableUsers";

export default function UsersIndex() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <ComponentCard title="Tabella Utenti">
            <BasicTableUsers />
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
