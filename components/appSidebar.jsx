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
        icon: Baby,
    },
    {
        title: "Mariages",
        url: "/mariage",
        icon: HeartHandshake,
    },
    {
        title: "Divorces",
        url: "/divorces",
        icon: HeartCrack,
    },
    {
        title: "Décès",
        url: "/deces",
        icon: Skull,
    },
    {
        title: "Statistiques",
        url: "/statistics",
        icon: BarChart3,
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
