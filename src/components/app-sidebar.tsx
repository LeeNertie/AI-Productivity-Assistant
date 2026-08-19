import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Mail, NotebookPen, CalendarClock, Search, Bot, Sparkles } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, desc: "Overview of your AI workspace" },
  { title: "Email Generator", url: "/email", icon: Mail, desc: "Draft professional emails in any tone" },
  { title: "Notes Summarizer", url: "/notes", icon: NotebookPen, desc: "Turn raw notes into decisions & actions" },
  { title: "Task Planner", url: "/planner", icon: CalendarClock, desc: "Prioritise and time-block your work" },
  { title: "Research Assistant", url: "/research", icon: Search, desc: "Summarise topics with insights" },
  { title: "AI Chatbot", url: "/chat", icon: Bot, desc: "Ask Aria anything about your work" },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (router) => router.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-1 py-2">
          <span className="gradient-primary flex size-8 shrink-0 items-center justify-center rounded-lg text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          {!collapsed && (
            <div className="leading-tight">
              <p className="text-sm font-semibold text-sidebar-foreground">Aria Workspace</p>
              <p className="text-xs text-sidebar-foreground/60">AI Productivity Assistant</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={currentPath === item.url} tooltip={item.title}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed && (
          <p className="px-2 py-1 text-xs leading-relaxed text-sidebar-foreground/60">
            AI output can be wrong. Always review before sending or acting.
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
