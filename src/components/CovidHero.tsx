import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Heart, Info, TrendingUp } from "lucide-react";
import heroImage from "@/assets/covid-hero.jpg";

const CovidHero = () => {
  const stats = [
    { label: "Total Cases", value: "704M+", trend: "+0.1%", icon: TrendingUp },
    { label: "Recovered", value: "674M+", trend: "+0.2%", icon: Heart },
    { label: "Vaccinated", value: "13.5B", trend: "+0.05%", icon: Shield },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Healthcare professionals in protective equipment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-secondary/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <Badge variant="outline" className="mb-6 border-white/30 text-white bg-white/10 backdrop-blur-sm">
            <Info className="w-4 h-4 mr-2" />
            Latest COVID-19 Updates
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
            Stay Informed.
            <br />
            <span className="bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
              Stay Protected.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Get the latest COVID-19 information, guidelines, and resources to keep yourself and your community safe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
            >
              View Guidelines
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Find Testing Centers
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary-glow" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-white/80 mb-2">{stat.label}</div>
                <Badge variant="secondary" className="text-xs">
                  {stat.trend} this week
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CovidHero;