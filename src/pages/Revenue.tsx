import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import BasicTableRevenue from "../components/tables/BasicTables/BasicTableRevenue";
import PageBreadcrumb from "../components/common/PageBreadCrumb";

export default function Revenue() {
  return (
    <>
      <PageBreadcrumb pageTitle="Incassi" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <ComponentCard title="Incassi">
            <BasicTableRevenue />
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
