import Sidebar from "@/components/sidebar";
import Header from "@/components/header/header";
import ProtectedRouteWrapper from "@/components/protected-route-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRouteWrapper>
      <div className="flex overflow-x-hidden w-full">
          <Sidebar />
          <main className="ml-64 flex-1 flex flex-col relative">
            <div className="sticky top-0 w-full bg-gray-100 z-10">
              <Header />
            </div>
            <div className="p-6 flex-1">
              {children}
            </div>
          </main>
      </div>
    </ProtectedRouteWrapper>
  );
}
