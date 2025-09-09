import { AgencyLayout } from "@/components/agency/AgencyLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Building2, User, Bell, Shield, CreditCard, Globe } from "lucide-react";

export default function AgencySettings() {
  return (
    <AgencyLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
          <p className="text-muted-foreground">Gérez les paramètres de votre agence</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agency Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Informations de l'agence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agency-name">Nom de l'agence</Label>
                    <Input id="agency-name" defaultValue="Mon Agence" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-email">Email principal</Label>
                    <Input id="agency-email" type="email" defaultValue="contact@monagence.fr" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="agency-phone">Téléphone</Label>
                    <Input id="agency-phone" defaultValue="+33 1 23 45 67 89" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-website">Site web</Label>
                    <Input id="agency-website" defaultValue="https://monagence.fr" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agency-address">Adresse</Label>
                  <Textarea id="agency-address" defaultValue="123 Rue de la République&#10;75001 Paris, France" rows={3} />
                </div>

                <Button>Enregistrer les modifications</Button>
              </CardContent>
            </Card>

            {/* User Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Gestion des utilisateurs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Jean Dupont</p>
                      <p className="text-sm text-muted-foreground">jean@monagence.fr</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>Administrateur</Badge>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Marie Martin</p>
                      <p className="text-sm text-muted-foreground">marie@monagence.fr</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Collaborateur</Badge>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Inviter un utilisateur
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Nouveaux clients</p>
                    <p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouveau client</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Commandes</p>
                    <p className="text-sm text-muted-foreground">Notifications pour les nouvelles commandes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Messages</p>
                    <p className="text-sm text-muted-foreground">Notifications pour les nouveaux messages clients</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Changer le mot de passe
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  Authentification à deux facteurs
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  Sessions actives
                </Button>
              </CardContent>
            </Card>

            {/* Billing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Facturation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <p className="font-medium">Plan Pro</p>
                  <p className="text-sm text-muted-foreground">99€/mois</p>
                </div>
                
                <Button variant="outline" className="w-full justify-start">
                  Gérer l'abonnement
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  Historique des factures
                </Button>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Préférences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Langue</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Fuseau horaire</Label>
                  <Select defaultValue="europe/paris">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe/paris">Europe/Paris</SelectItem>
                      <SelectItem value="europe/london">Europe/London</SelectItem>
                      <SelectItem value="america/new_york">America/New_York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AgencyLayout>
  );
}