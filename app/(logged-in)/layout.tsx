import UpgradeRequired from "@/components/common/upgrade-required";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { hasActivePlan } from "@/lib/user";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const hasActiveSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );
  // console.log(user.emailAddresses[0].emailAddress, "userEmail");
  // console.log(hasActiveSubscription, "hasActiveSubscription");

  if (!hasActiveSubscription) {
    return <UpgradeRequired />;
  }

  return <>{children}</>;
}
