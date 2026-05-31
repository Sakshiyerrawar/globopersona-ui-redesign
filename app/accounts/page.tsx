import { redirect } from "next/navigation";

export default function DeprecatedAccountsPage() {
  redirect("/email-accounts");
}