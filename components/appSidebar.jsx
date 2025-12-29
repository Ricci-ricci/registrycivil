import {
  Home,
  Baby,
  HeartHandshake,
  HeartCrack,
  Skull,
  BarChart3,
  MapPin,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Naissances",
    url: "/naissance",
    icon: Baby, // 👶 naissance
  },
  {
    title: "Mariages",
    url: "/mariage",
    icon: HeartHandshake, // 💍 union
  },
  {
    title: "Divorces",
    url: "/divorces",
    icon: HeartCrack, // 💔 séparation
  },
  {
    title: "Décès",
    url: "/deces",
    icon: Skull, // ⚰️ décès
  },
  {
    title: "Statistiques",
    url: "/statistiques",
    icon: BarChart3, // 📊 stats
  },
  {
    title: "Fokontany / Villages",
    url: "/localisation",
    icon: MapPin, // 📍 lieu
  },
];
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>I am Spiderman</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
