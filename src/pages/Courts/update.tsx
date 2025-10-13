import { useParams } from "react-router";
import ComponentCard from "../../components/common/ComponentCard";
import { CourtForm } from "../../components/form/court-form/CourtForm";

export default function Upadte() {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6">
          <ComponentCard>
            <CourtForm id={id} />
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
