import AllUsers from "@/components/all-users";
import MembersTable from "@/components/members-table";
import { getOrganizationBySlug } from "@/server/organizations";
import { getUsers } from "@/server/users";

type Params = Promise<{ slug: string }>;

export default async function OrganizationPage({ params }: { params: Params }) {
  const { slug } = await params;

  const organization = await getOrganizationBySlug(slug);
  const users = await getUsers(organization?.id || "");

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 py-10">
      <h1 className="font-bold text-2xl">{organization?.name}</h1>
      <MembersTable members={organization?.members || []} />
      <AllUsers organizationId={organization?.id || ""} users={users} />
    </div>
  );
}
