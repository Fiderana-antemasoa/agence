import { useState, useEffect } from "react";
import { AgencyLayout } from "@/components/agency/AgencyLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter, ShoppingCart, Clock, CheckCircle, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-success/10 text-success border-success/20">
          <CheckCircle className="w-3 h-3 mr-1" />Active
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="secondary">
          <Clock className="w-3 h-3 mr-1" />En attente
        </Badge>
      );
    default:
      return <Badge variant="outline">Inconnu</Badge>;
  }
};

//composant!!!
export default function AgencyOffers() {
  const { toast } = useToast();

  // ✅ State pour stocker les offres
  const [offers, setOffers] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    validUntil: "",
  });

  const API_URL = "http://127.0.0.1:8000/api/offers";

  // Recherche
  const [searchTerm, setSearchTerm] = useState("");

// Édition
  const [editingOffer, setEditingOffer] = useState<any | null>(null);

  useEffect(() => {
    fetch(API_URL) // envoie une requête GET à Laravel
      .then(res => res.json()) // récupère les données JSON
      .then(data => setOffers(data)) // met à jour le state React
      .catch(err => console.error("Erreur API", err));
  }, []);

// Liste filtrée par recherche
  const filteredOffers = offers.filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchTerm.toLowerCase())
);



  const handleEditOffer = (offer: any) => {
    setEditingOffer(offer);       // On garde l’offre à modifier
    setNewOffer({
      title: offer.title,
      description: offer.description,
      price: offer.price,
      category: offer.category,
      validUntil: offer.validUntil || ""
  });
    setIsDialogOpen(true);
};
  const handleSellOffer = (offerId: number, title: string) => {
    setOffers(prev =>
      prev.map(o =>
        o.id === offerId ? { ...o, clientsCount: o.clientsCount + 1 } : o
      )
    );
    toast({
      title: "Vente enregistrée",
      description: `Un client ajouté à "${title}".`,
    });
  };


  const handleCreateOrUpdateOffer = () => {
    if (!newOffer.title || !newOffer.price || !newOffer.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const method = editingOffer ? "PUT" : "POST";
    const url = editingOffer ? `${API_URL}/${editingOffer.id}` : API_URL;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newOffer,
        status: editingOffer ? editingOffer.status : "active",
        clientsCount: editingOffer ? editingOffer.clientsCount : 0
      }),
    })
      .then(res => res.json())
      .then(savedOffer => {
        if (editingOffer) {
          setOffers(prev => prev.map(o => o.id === savedOffer.id ? savedOffer : o));
          toast({ title: "Offre modifiée", description: `"${savedOffer.title}" a été mise à jour.` });
        } else {
          setOffers(prev => [...prev, savedOffer]);
          toast({ title: "Offre créée", description: `"${savedOffer.title}" a été ajoutée avec succès.` });
        }
        setNewOffer({ title: "", description: "", price: "", category: "", validUntil: "" });
        setEditingOffer(null);
        setIsDialogOpen(false);
      })
      .catch(err => {
        console.error("Erreur API", err);
        toast({ title: "Erreur", description: "Impossible de sauvegarder l'offre.", variant: "destructive" });
      });
  };



  return (
    <AgencyLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Offres</h1>
            <p className="text-muted-foreground">Gérez vos offres et services clients</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle offre
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle offre</DialogTitle>
                <DialogDescription>
                  Ajoutez une nouvelle offre pour vos clients. Les champs marqués d'un * sont obligatoires.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Titre *
                  </Label>
                  <Input
                    id="title"
                    value={newOffer.title}
                    onChange={(e) => setNewOffer((prev) => ({ ...prev, title: e.target.value }))}
                    className="col-span-3"
                    placeholder="Pack Site Web Premium"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newOffer.description}
                    onChange={(e) => setNewOffer((prev) => ({ ...prev, description: e.target.value }))}
                    className="col-span-3"
                    placeholder="Description détaillée de l'offre..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Prix *
                  </Label>
                  <Input
                    id="price"
                    value={newOffer.price}
                    onChange={(e) => setNewOffer((prev) => ({ ...prev, price: e.target.value }))}
                    className="col-span-3"
                    placeholder="2,999€"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Catégorie *
                  </Label>
                  <Select
                    value={newOffer.category}
                    onValueChange={(value) => setNewOffer((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Site Web</SelectItem>
                      <SelectItem value="seo">SEO</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="consulting">Conseil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="validUntil" className="text-right">
                    Valide jusqu'au
                  </Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={newOffer.validUntil}
                    onChange={(e) => setNewOffer((prev) => ({ ...prev, validUntil: e.target.value }))}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleCreateOrUpdateOffer}>
                  {editingOffer ? "Enregistrer les modifications" : "Créer l'offre"}
                </Button>

              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* ✅ Filters gardés */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Rechercher une offre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />

              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="web">Site Web</SelectItem>
                  <SelectItem value="seo">SEO</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* ✅ Offers Grid gardée */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <Card key={offer.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{offer.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{offer.description}</p>
                  </div>
                  {getStatusBadge(offer.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{offer.price}</span>
                  <Badge variant="outline" className="text-xs">
                    {offer.clientsCount} clients
                  </Badge>
                </div>
                {offer.validUntil && (
                  <div className="text-xs text-muted-foreground">
                    Valide jusqu'au {new Date(offer.validUntil).toLocaleDateString("fr-FR")}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEditOffer(offer)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Modifier
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleSellOffer(offer.id, offer.title)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Vendre
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ✅ Stats gardées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Offres actives</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-success/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ventes ce mois</p>
                  <p className="text-2xl font-bold">25</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chiffre d'affaires</p>
                  <p className="text-2xl font-bold">47,500€</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AgencyLayout>
  );
}
