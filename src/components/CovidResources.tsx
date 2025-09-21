import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Calendar, 
  Phone, 
  ExternalLink,
  Syringe,
  TestTube,
  Heart,
  Building
} from "lucide-react";

const CovidResources = () => {
  const resources = [
    {
      icon: TestTube,
      title: "Testing Centers",
      description: "Find COVID-19 testing locations near you",
      items: [
        { name: "CVS Pharmacy", address: "123 Main St", hours: "9 AM - 7 PM", phone: "(555) 123-4567" },
        { name: "Walgreens", address: "456 Oak Ave", hours: "8 AM - 8 PM", phone: "(555) 234-5678" },
        { name: "Community Health Center", address: "789 Elm St", hours: "7 AM - 6 PM", phone: "(555) 345-6789" },
      ],
      color: "primary"
    },
    {
      icon: Syringe,
      title: "Vaccination Sites",
      description: "Get vaccinated at these authorized locations",
      items: [
        { name: "City Health Department", address: "321 Center St", hours: "8 AM - 5 PM", phone: "(555) 456-7890" },
        { name: "Regional Medical Center", address: "654 Hospital Rd", hours: "24/7", phone: "(555) 567-8901" },
        { name: "Community Pharmacy", address: "987 Park Ave", hours: "9 AM - 6 PM", phone: "(555) 678-9012" },
      ],
      color: "success"
    },
    {
      icon: Heart,
      title: "Mental Health Support",
      description: "Resources for emotional and mental wellbeing",
      items: [
        { name: "Crisis Helpline", address: "24/7 Support", hours: "Always Open", phone: "(555) 789-0123" },
        { name: "Counseling Center", address: "147 Wellness Way", hours: "9 AM - 8 PM", phone: "(555) 890-1234" },
        { name: "Support Groups", address: "258 Community Blvd", hours: "6 PM - 8 PM", phone: "(555) 901-2345" },
      ],
      color: "secondary"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'border-l-primary bg-primary/5';
      case 'success':
        return 'border-l-success bg-success/5';
      case 'secondary':
        return 'border-l-secondary bg-secondary/5';
      default:
        return 'border-l-primary bg-primary/5';
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">COVID-19 Resources</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find testing centers, vaccination sites, and support services in your area.
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <Card 
              key={resource.title}
              className={`p-6 shadow-lg border-l-4 ${getColorClasses(resource.color)} animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                  resource.color === 'primary' ? 'bg-primary/10' :
                  resource.color === 'success' ? 'bg-success/10' : 'bg-secondary/10'
                }`}>
                  <resource.icon className={`w-6 h-6 ${
                    resource.color === 'primary' ? 'text-primary' :
                    resource.color === 'success' ? 'text-success' : 'text-secondary'
                  }`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {resource.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-4 bg-card rounded-lg border border-border/50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        Open
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{item.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{item.hours}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{item.phone}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full mt-3"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Card className="inline-block p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <Building className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">Need More Help?</h3>
            <p className="text-muted-foreground mb-4">
              Contact your local health department for additional resources and information.
            </p>
            <Button variant="outline">
              Find Local Health Department
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CovidResources;