"use client"

import * as React from "react"
import {
  Activity,
  BarChart3,
  ExternalLink,
  LayoutDashboard,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// 1. 管理ツールの定義（URLとアイコン）
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
  // --- ここから管理ツールセクション用 ---
  navAdmin: [
    {
      name: "Analytics (Umami)",
      url: "https://analytics.doradora58.com",
      icon: BarChart3,
      color: "text-blue-400",
    },
    {
      name: "Logging (Kibana)",
      url: "https://logs.doradora58.com",
      icon: Search,
      color: "text-pink-400",
    },
    {
      name: "Metrics (Grafana)",
      url: "https://grafana.doradora58.com",
      icon: Activity,
      color: "text-orange-400",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <ShieldCheck className="text-primary" />
          <span className="font-bold text-lg tracking-tight">Money Dashboard</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* 通常のメニュー */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} isActive={item.isActive}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* --- 管理ツールセクション --- */}
        <SidebarGroup>
          <SidebarGroupLabel>System Admin</SidebarGroupLabel>
          <SidebarMenu>
            {data.navAdmin.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild tooltip={item.name}>
                  {/* target="_blank" で別タブで開くように設定 */}
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <item.icon className={item.color} />
                    <span>{item.name}</span>
                    <ExternalLink className="ml-auto size-3 opacity-50" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}