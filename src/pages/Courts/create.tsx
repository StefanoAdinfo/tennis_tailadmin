import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { CourtForm } from "../../components/form/court-form/CourtForm";

export default function Create() {
  return (
    <>
      <PageBreadcrumb pageTitle="Aggiungi campo" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <ComponentCard>
            <CourtForm />
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
