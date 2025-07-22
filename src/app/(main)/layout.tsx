import Sidebar from "@/components/sidebar";
import Header from "@/components/header/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex overflow-x-hidden w-full">
        <Sidebar />
        <main className="ml-64 flex-1 relative">
          <div className="absolute sticky top-0 w-full bg-gray-100 z-10">
            <Header />
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
    </div>
  );
}
