import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import BasicTableCollectUsers from "../../components/tables/BasicTables/BasicTableCollectUsers";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

export default function UsersCollect() {
  return (
    <>
      <PageBreadcrumb pageTitle="Utenti da incassare" />
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
