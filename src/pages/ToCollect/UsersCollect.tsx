import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableCollectUsers from "../../components/tables/BasicTables/BasicTableCollectUsers";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function UsersCollect() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Utenti da incasare" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <ComponentCard title="Utenti da incasare">
            <BasicTableCollectUsers />
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
