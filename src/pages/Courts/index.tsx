import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableCourts from "../../components/tables/BasicTables/BasicTableCourts";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function Revenue() {
  return (
    <>
      <PageBreadcrumb pageTitle="Campi" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <ComponentCard
            title="Tabella Campi"
            buttonShow
            to="/campi/creazione"
            buttonText="Aggiungi campo"
          >
            <BasicTableCourts />
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
