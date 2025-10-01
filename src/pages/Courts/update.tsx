import { useParams } from "react-router";
import { Separator } from "../../components/ui/separator/Separator";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";

export default function Upadte() {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Modifica campo" />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <ComponentCard>
            {/* <CourtForm  id={id}/> */}
            <div>form</div>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
