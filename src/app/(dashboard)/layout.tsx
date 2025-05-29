import Providers from "./Providers";
import DashboardLayoutInner from "./DashboardLayoutInner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </Providers>
  );
}
