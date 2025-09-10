import { useState, useEffect } from "react";
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
import axios from "axios";
import { Client } from "@/types/clients";

const API_URL = "http://127.0.0.1:8000/api/clients";

export default function ClientProfile() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const [client, setClient] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Client>>({});

  // 🔹 Charger le client depuis l’API
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get<Client>(`${API_URL}/${id}`);
        setClient(res.data);
        setFormData(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement du client", error);
      }
    };

    if (id) fetchClient();
  }, [id]);

  const handleSave = async () => {
    try {
      if (!id) return;
      const res = await axios.put<Client>(`${API_URL}/${id}`, formData);
      setClient(res.data);
      setIsEditing(false);
      toast({
        title: "Profil mis à jour",
        description: "Les informations du client ont été sauvegardées avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde", error);
    }
  };

  const handleCancel = () => {
    if (client) setFormData(client);
    setIsEditing(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success">Actif</Badge>;
      case "inactive":
        return <Badge className="bg-destructive/10 text-destructive">Inactif</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning">En attente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (!client) {
    return (
      <AgencyLayout>
        <p className="p-6">Chargement du client...</p>
      </AgencyLayout>
    );
  }

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
                <AvatarImage src={client.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {client.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
                <p className="text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {client.company || "—"}
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

        {/* Exemple : onglet Vue d’ensemble */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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
                        value={formData.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        value={formData.company || ""}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={formData.phone || ""}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <p><Mail className="inline h-4 w-4 mr-1" /> {client.email}</p>
                    <p><Phone className="inline h-4 w-4 mr-1" /> {client.phone || "—"}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card className="border-border shadow-soft">
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={formData.notes || ""}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                ) : (
                  <p className="text-muted-foreground">{client.notes || "Aucune note"}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AgencyLayout>
  );
}
