import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AgencyLayout } from "@/components/agency/AgencyLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  Edit,
  Save,
  X,
  Building2,
  Mail,
  Phone,
  Calendar,
  MapPin,
  User,
  Briefcase,
  MessageSquare,
  FileText,
  CreditCard,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock client data - in real app, this would come from API
const getClientById = (id: string) => ({
  id,
  name: "Marie Dubois",
  company: "TechCorp",
  email: "marie@techcorp.com",
  phone: "+33 1 23 45 67 89",
  address: "123 Avenue des Champs-Élysées, 75008 Paris",
  position: "Directrice Marketing",
  status: "active" as const,
  registrationDate: "2023-06-15",
  lastContact: "2024-01-15",
  totalProjects: 3,
  activeProjects: 1,
  totalRevenue: 45000,
  avatar: "/placeholder.svg",
  notes: "Cliente fidèle depuis 2023. Très réactive et professionnelle. Préfère les communications par email.",
  projects: [
    {
      id: "1",
      name: "Refonte Site Web",
      status: "En cours",
      progress: 75,
      startDate: "2024-01-01",
      budget: 15000
    },
    {
      id: "2", 
      name: "Campagne SEO",
      status: "Terminé",
      progress: 100,
      startDate: "2023-09-01",
      budget: 8000
    },
    {
      id: "3",
      name: "Application Mobile",
      status: "En attente",
      progress: 0,
      startDate: "2024-02-01",
      budget: 22000
    }
  ],
  interactions: [
    {
      id: "1",
      type: "email",
      subject: "Validation maquettes",
      date: "2024-01-15",
      summary: "Validation des nouvelles maquettes pour la refonte"
    },
    {
      id: "2",
      type: "meeting", 
      subject: "Point projet hebdomadaire",
      date: "2024-01-12",
      summary: "Suivi de l'avancement du projet de refonte"
    },
    {
      id: "3",
      type: "call",
      subject: "Briefing application mobile",
      date: "2024-01-08",
      summary: "Premier briefing pour le projet d'application mobile"
    }
  ]
});

export default function ClientProfile() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() => {
    const client = getClientById(id || "1");
    return {
      name: client.name,
      company: client.company,
      email: client.email,
      phone: client.phone,
      position: client.position,
      address: client.address,
      notes: client.notes
    };
  });

  const client = getClientById(id || "1");

  const handleSave = () => {
    // Here you would save to your backend
    setIsEditing(false);
    toast({
      title: "Profil mis à jour",
      description: "Les informations du client ont été sauvegardées avec succès.",
    });
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: client.name,
      company: client.company,
      email: client.email,
      phone: client.phone,
      position: client.position,
      address: client.address,
      notes: client.notes
    });
    setIsEditing(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success/10 text-success">Actif</Badge>;
      case 'En cours':
        return <Badge className="bg-primary/10 text-primary">En cours</Badge>;
      case 'Terminé':
        return <Badge className="bg-success/10 text-success">Terminé</Badge>;
      case 'En attente':
        return <Badge className="bg-warning/10 text-warning">En attente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <AgencyLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/agency/clients">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux clients
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={client.avatar} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
                <p className="text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {client.company}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {getStatusBadge(client.status)}
            {isEditing ? (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave} className="bg-success hover:bg-success/90">
                  <Save className="mr-2 h-4 w-4" />
                  Sauvegarder
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </Button>
            )}
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="billing">Facturation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Client Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-border shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Informations Client
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nom complet</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Entreprise</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="position">Poste</Label>
                          <Input
                            id="position"
                            value={formData.position}
                            onChange={(e) => setFormData({...formData, position: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Adresse</Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="notes">Notes</Label>
                          <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            rows={3}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium">{client.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Téléphone:</span>
                            <span className="font-medium">{client.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Poste:</span>
                            <span className="font-medium">{client.position}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Adresse:</span>
                            <span className="font-medium">{client.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Client depuis:</span>
                            <span className="font-medium">
                              {new Date(client.registrationDate).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Dernier contact:</span>
                            <span className="font-medium">
                              {new Date(client.lastContact).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                        {client.notes && (
                          <div className="md:col-span-2 pt-4 border-t border-border">
                            <h4 className="font-medium mb-2">Notes:</h4>
                            <p className="text-sm text-muted-foreground">{client.notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Stats */}
              <div className="space-y-6">
                <Card className="border-border shadow-soft">
                  <CardHeader>
                    <CardTitle>Statistiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-gradient-card rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {client.totalProjects}
                      </div>
                      <div className="text-sm text-muted-foreground">Projets Total</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-card rounded-lg">
                      <div className="text-2xl font-bold text-success">
                        {client.activeProjects}
                      </div>
                      <div className="text-sm text-muted-foreground">Projets Actifs</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-card rounded-lg">
                      <div className="text-2xl font-bold text-accent">
                        €{client.totalRevenue.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Revenus Total</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="border-border shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Projets du Client
                </CardTitle>
                <CardDescription>
                  Historique et suivi de tous les projets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {client.projects.map((project) => (
                    <div key={project.id} className="p-4 border border-border rounded-lg bg-card-subtle">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{project.name}</h4>
                        {getStatusBadge(project.status)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Début:</span>
                          <span className="ml-2 font-medium">
                            {new Date(project.startDate).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Budget:</span>
                          <span className="ml-2 font-medium">€{project.budget.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Progression:</span>
                          <span className="ml-2 font-medium">{project.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-6">
            <Card className="border-border shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Historique des Interactions
                </CardTitle>
                <CardDescription>
                  Communications et échanges avec le client
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {client.interactions.map((interaction) => (
                    <div key={interaction.id} className="flex gap-4 p-4 border border-border rounded-lg bg-card-subtle">
                      <div className="p-2 bg-primary/10 rounded-lg w-fit">
                        {getInteractionIcon(interaction.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{interaction.subject}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(interaction.date).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{interaction.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="border-border shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Informations de Facturation
                </CardTitle>
                <CardDescription>
                  Suivi financier et facturation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucune facture pour le moment</h3>
                  <p className="text-muted-foreground mb-4">
                    Les factures apparaîtront ici une fois les projets lancés
                  </p>
                  <Button variant="outline">
                    Créer une facture
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AgencyLayout>
  );
}