import { useState, useEffect } from "react";
import axios from "axios";
import { AgencyLayout } from "@/components/agency/AgencyLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Client } from "@/types/clients";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Building2,
  Mail,
  Phone,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



const API_URL = "http://127.0.0.1:8000/api/clients";

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "pending" as Client["status"],
  });
  const { toast } = useToast();

  // Charger les clients depuis Laravel
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get(API_URL);
      setClients(res.data as Client[]);
    } catch (error) {
      console.error("Erreur lors du chargement des clients", error);
    }
  };

  // Créer un client
  const handleCreateClient = async () => {
    if (!newClient.name || !newClient.email) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir au minimum le nom et l'email.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await axios.post<Client>(API_URL, newClient);
      setClients((prev) => [...prev, res.data]);

      toast({
        title: "Client créé",
        description: `${newClient.name} a été ajouté avec succès.`,
      });

      setNewClient({ name: "", company: "", email: "", phone: "", status: "pending" });
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le client.",
        variant: "destructive",
      });
    }
  };

  // Supprimer un client
  const handleDeleteClient = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setClients((prev) => prev.filter((client) => client.id !== id));

      toast({
        title: "Client supprimé",
        description: "Le client a été supprimé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le client.",
        variant: "destructive",
      });
    }
  };

  // Mettre à jour un client (exemple basique : changer le statut)
  const handleUpdateStatus = async (id: number, status: Client["status"]) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, { status });
     setClients((prev) =>
  prev.map((client) => (client.id === id ? (res.data as Client) : client))
);

      toast({
        title: "Client mis à jour",
        description: `Le statut a été modifié.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le client.",
        variant: "destructive",
      });
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Client["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Actif</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">En attente</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactif</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <AgencyLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestion des Clients</h1>
            <p className="text-muted-foreground">
              Gérez vos {clients.length} clients et leurs projets
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Nouveau Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau client</DialogTitle>
                <DialogDescription>
                  Saisissez les informations du nouveau client. Les champs nom et email sont obligatoires.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nom *
                  </Label>
                  <Input
                    id="name"
                    value={newClient.name}
                    onChange={(e) => setNewClient((prev) => ({ ...prev, name: e.target.value }))}
                    className="col-span-3"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">
                    Entreprise
                  </Label>
                  <Input
                    id="company"
                    value={newClient.company}
                    onChange={(e) => setNewClient((prev) => ({ ...prev, company: e.target.value }))}
                    className="col-span-3"
                    placeholder="TechCorp"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient((prev) => ({ ...prev, email: e.target.value }))}
                    className="col-span-3"
                    placeholder="jean@techcorp.com"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Téléphone
                  </Label>
                  <Input
                    id="phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient((prev) => ({ ...prev, phone: e.target.value }))}
                    className="col-span-3"
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Statut
                  </Label>
                  <Select
                    value={newClient.status}
                    onValueChange={(value: Client["status"]) =>
                      setNewClient((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateClient}>Créer le client</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="border-border shadow-soft">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, entreprise ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="border-border shadow-soft hover:shadow-medium transition-smooth group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {getInitials(client.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {client.company}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-smooth">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/agency/clients/${client.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir le profil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(client.id, "active")}>
                        <Edit className="mr-2 h-4 w-4" />
                        Activer
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClient(client.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Statut</span>
                  {getStatusBadge(client.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Dernier contact:{" "}
                      {client.lastContact
                        ? new Date(client.lastContact).toLocaleDateString("fr-FR")
                        : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm font-medium">
                    {client.projects} projet{client.projects !== 1 ? "s" : ""}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/agency/clients/${client.id}`}>Voir détails</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <Card className="border-border shadow-soft">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Aucun client trouvé
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Aucun client ne correspond à vos critères de recherche.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AgencyLayout>
  );
}
