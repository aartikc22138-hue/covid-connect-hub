import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Thermometer, 
  Users, 
  Droplets, 
  Wind, 
  AlertTriangle,
  CheckCircle,
  Shield,
  Waves
} from "lucide-react";

const CovidGuidelines = () => {
  const symptoms = [
    { icon: Thermometer, text: "Fever or chills", severity: "high" },
    { icon: Wind, text: "Cough or shortness of breath", severity: "high" },
    { icon: Droplets, text: "Loss of taste or smell", severity: "medium" },
    { icon: AlertTriangle, text: "Fatigue or body aches", severity: "medium" },
  ];

  const preventionTips = [
    { icon: Shield, title: "Wear a Mask", description: "Cover your nose and mouth in public settings" },
    { icon: Waves, title: "Wash Hands", description: "Use soap and water for at least 20 seconds" },
    { icon: Users, title: "Social Distance", description: "Stay 6 feet apart from others when possible" },
    { icon: CheckCircle, title: "Get Vaccinated", description: "Stay up to date with COVID-19 vaccines" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">COVID-19 Guidelines</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed about symptoms and prevention measures to protect yourself and others.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Symptoms Section */}
          <div className="animate-fade-in">
            <Card className="p-8 shadow-lg border-l-4 border-l-warning">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-foreground">
                <AlertTriangle className="w-6 h-6 mr-3 text-warning" />
                Common Symptoms
              </h3>
              <div className="space-y-4">
                {symptoms.map((symptom, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                  >
                    <symptom.icon className="w-5 h-5 mr-4 text-primary" />
                    <span className="flex-1 text-foreground">{symptom.text}</span>
                    <Badge 
                      variant={symptom.severity === 'high' ? 'destructive' : 'secondary'}
                      className="ml-2"
                    >
                      {symptom.severity === 'high' ? 'High Alert' : 'Monitor'}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
                <p className="text-sm text-warning-foreground">
                  <strong>Important:</strong> If you experience any of these symptoms, 
                  especially fever and difficulty breathing, contact your healthcare provider immediately.
                </p>
              </div>
            </Card>
          </div>

          {/* Prevention Section */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="p-8 shadow-lg border-l-4 border-l-success">
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-foreground">
                <CheckCircle className="w-6 h-6 mr-3 text-success" />
                Prevention Tips
              </h3>
              <div className="space-y-6">
                {preventionTips.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <tip.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{tip.title}</h4>
                      <p className="text-muted-foreground text-sm">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
                <p className="text-sm text-success-foreground">
                  <strong>Remember:</strong> Following these guidelines helps protect not just you, 
                  but your entire community.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CovidGuidelines;