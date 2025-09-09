import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Settings, 
  Building2,
  ChevronLeft
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/agency", 
    icon: LayoutDashboard,
    badge: null
  },
  { 
    title: "Clients", 
    url: "/agency/clients", 
    icon: Users,
    badge: "12"
  },
  { 
    title: "Offres", 
    url: "/agency/offers", 
    icon: ShoppingCart,
    badge: "3"
  },
  { 
    title: "Paramètres", 
    url: "/agency/settings", 
    icon: Settings,
    badge: null
  },
];

export function AgencySidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + "/");

  const getNavClasses = (path: string) => {
    const baseClasses = "w-full justify-start transition-smooth hover:bg-primary/5";
    return isActive(path) 
      ? `${baseClasses} bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary` 
      : `${baseClasses} text-muted-foreground hover:text-foreground`;
  };

  return (
    <Sidebar className="border-r border-border bg-card shadow-soft" collapsible="icon">
      {/* Agency Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-foreground">Mon Agence</h2>
              <p className="text-xs text-muted-foreground">Espace Pro</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClasses(item.url)}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="ml-auto bg-primary/10 text-primary text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Collapse Button */}
      <div className="p-4 border-t border-border">
        <SidebarTrigger className="w-full" />
      </div>
    </Sidebar>
  );
}