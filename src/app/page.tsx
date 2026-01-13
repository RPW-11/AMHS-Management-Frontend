import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <Button>
        Tear me
      </Button>
      <Button variant={"secondary"}>
        Tear me
      </Button>
      <div className="bg-[oklch(42.4%_0.199_265.638)] text-white p-8">  
        <button className="bg-[oklch(70%_0.18_65.638)]">Accent Button</button>  
        <button className="bg-[oklch(85%_0.08_265.638)]">Subtle Button</button>  
      </div> 
    </div>
  );
}
