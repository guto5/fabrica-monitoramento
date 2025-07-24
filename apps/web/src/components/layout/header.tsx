"use client";

import { Factory, Settings, Wifi, WifiOff } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

type HeaderProps = {
  connectionStatus: boolean;
};

export function Header({ connectionStatus }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Factory className="h-6 w-6 text-primary" />
          <span className="font-headline">Painel de Controle</span>
        </a>
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <Badge variant={connectionStatus ? "default" : "destructive"} className="gap-2 transition-colors">
            {connectionStatus ? (
              <Wifi className="h-4 w-4" />
            ) : (
              <WifiOff className="h-4 w-4" />
            )}
            <span>{connectionStatus ? "Conectado" : "Offline"}</span>
          </Badge>
        </div>
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Configurações</span>
        </Button>
      </div>
    </header>
  );
}
