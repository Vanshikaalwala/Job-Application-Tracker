import { Button } from "@/components/ui/button";
import { ArrowRight} from "lucide-react";
import Link from "next/link";
import ImageTabs from "@/components/ui/image-tabs";

export default function Home() {
  return (
    <div className=" flex flex-col min-h-screen">
      <main className=" flex-1">
        {/* Hero Section */}
        <section>
          <div className=" container mx-auto px-4 py-32 text-center">
            <h1 className=" text-6xl mb-6 font-bold">
              A better way to track your job application
            </h1>
            <p className=" text-muted-foreground mb-16">
              Capture,organize and manage your job search in one place.
            </p>
            <div className=" flex flex-col items-center gap-4 py-6">
              <Link href="sign-up">
                <Button size="lg" className=" h-12 px-4">
                  Start for free <ArrowRight className=" ml-2"/>
                </Button>
              </Link>
              <p className=" text-muted-foreground text-sm">Free forever.No credit card required.</p>
            </div>
          </div>
        </section>

        {/* Hero Image Section */}
        <ImageTabs/>
        
      </main>
    </div>
  );
}
