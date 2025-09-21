import Navigation from "@/components/Navigation";
import CovidHero from "@/components/CovidHero";
import CovidGuidelines from "@/components/CovidGuidelines";
import CovidResources from "@/components/CovidResources";
import UserAuth from "@/components/UserAuth";
import CommentsSection from "@/components/CommentsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <section id="home">
          <CovidHero />
        </section>
        
        <section id="guidelines">
          <CovidGuidelines />
        </section>
        
        <section id="resources">
          <CovidResources />
        </section>
        
        <section id="community">
          <UserAuth />
          <CommentsSection />
        </section>
      </main>

      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">COVID-19 Information</h3>
              <p className="text-sm opacity-80">
                Providing reliable, up-to-date information to keep our community safe and informed.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#guidelines" className="hover:opacity-100">Guidelines</a></li>
                <li><a href="#resources" className="hover:opacity-100">Resources</a></li>
                <li><a href="#community" className="hover:opacity-100">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Emergency</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Emergency: 911</li>
                <li>Health Dept: (555) 123-4567</li>
                <li>Crisis Line: (555) 789-0123</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Stay Updated</h4>
              <p className="text-sm opacity-80 mb-3">
                Get the latest COVID-19 updates and health information.
              </p>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-60">
            <p>&copy; 2024 COVID-19 Information Portal. Built for community safety.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
