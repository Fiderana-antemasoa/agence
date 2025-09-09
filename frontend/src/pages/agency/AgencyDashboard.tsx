import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  ShoppingCart, 
  DollarSign,
  ArrowUpRight,
  Calendar,
  Clock,
  Star
} from "lucide-react";
import { AgencyLayout } from "@/components/agency/AgencyLayout";

export default function AgencyDashboard() {
  const stats = [
    {
      title: "Clients Actifs",
      value: "12",
      change: "+2 ce mois",
      trend: "up",
      icon: Users,
      color: "primary"
    },
    {
      title: "Revenus",
      value: "€24,300",
      change: "+12% vs mois dernier",
      trend: "up",
      icon: DollarSign,
      color: "success"
    },
    {
      title: "Projets en cours",
      value: "8",
      change: "3 à livrer cette semaine",
      trend: "neutral",
      icon: Clock,
      color: "warning"
    },
    {
      title: "Satisfaction",
      value: "4.8/5",
      change: "Basé sur 24 avis",
      trend: "up",
      icon: Star,
      color: "accent"
    }
  ];

  const recentClients = [
    { name: "TechCorp", project: "Site E-commerce", status: "En cours", progress: 75 },
    { name: "StartupXYZ", project: "Application Mobile", status: "Validation", progress: 90 },
    { name: "LocalBiz", project: "Site Vitrine", status: "Nouveau", progress: 25 },
  ];

  const upcomingTasks = [
    { task: "Livraison projet TechCorp", due: "Demain", priority: "high" },
    { task: "Réunion client StartupXYZ", due: "Vendredi", priority: "medium" },
    { task: "Révisions LocalBiz", due: "Lundi prochain", priority: "low" },
  ];

  return (
    <AgencyLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-subtle rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Bonjour John 👋
              </h1>
              <p className="text-muted-foreground">
                Voici un aperçu de votre activité agence
              </p>
            </div>
            <Button className="bg-gradient-primary hover:bg-primary/90">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Nouveau Client
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border shadow-soft hover:shadow-medium transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                  <stat.icon className={`h-4 w-4 text-${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-success' : 'text-muted-foreground'}`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Clients */}
          <Card className="border-border shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Clients Récents
                <Button variant="ghost" size="sm">
                  Voir tout
                </Button>
              </CardTitle>
              <CardDescription>
                Derniers projets en cours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentClients.map((client, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card-subtle border border-border">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.project}</p>
                    <div className="flex items-center gap-2">
                      <Progress value={client.progress} className="w-20" />
                      <span className="text-xs text-muted-foreground">{client.progress}%</span>
                    </div>
                  </div>
                  <Badge 
                    variant={client.status === 'En cours' ? 'default' : client.status === 'Nouveau' ? 'secondary' : 'outline'}
                    className={client.status === 'En cours' ? 'bg-primary/10 text-primary' : ''}
                  >
                    {client.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="border-border shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Tâches à venir
              </CardTitle>
              <CardDescription>
                Prochaines échéances importantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card-subtle border border-border">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{task.task}</p>
                    <p className="text-sm text-muted-foreground">{task.due}</p>
                  </div>
                  <Badge 
                    variant={
                      task.priority === 'high' ? 'destructive' : 
                      task.priority === 'medium' ? 'default' : 'secondary'
                    }
                    className={
                      task.priority === 'high' ? '' :
                      task.priority === 'medium' ? 'bg-warning/10 text-warning' : ''
                    }
                  >
                    {task.priority === 'high' ? 'Urgent' : 
                     task.priority === 'medium' ? 'Moyen' : 'Faible'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AgencyLayout>
  );
}