import ResendActivationEmailForm from "~/components/auth/ResendActivationEmailForm";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";

export default function ResendActivationEmail() {
  return (
    <>
      <PageMeta
        title="React.js ResendActivationEmail Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <ResendActivationEmailForm />
      </AuthLayout>
    </>
  );
}
