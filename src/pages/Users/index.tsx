import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableUsers from "../../components/tables/BasicTables/BasicTableUsers";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function UsersIndex() {
  return (
    <>
      <PageBreadcrumb pageTitle="Utenti" />
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
