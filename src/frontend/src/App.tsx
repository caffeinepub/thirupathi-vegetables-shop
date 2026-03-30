import { Toaster } from "@/components/ui/sonner";
import { AdminOrdersPage } from "./pages/AdminOrdersPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  const path = window.location.pathname;

  return (
    <>
      {path === "/admin/orders" ? <AdminOrdersPage /> : <HomePage />}
      <Toaster />
    </>
  );
}
