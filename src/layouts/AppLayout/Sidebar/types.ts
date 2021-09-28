import React from 'react';

export interface SidebarMenuItem {
  IconComponent: React.ComponentType<any>;
  path: string;
  text: string;
}

export type SidebarMenuItems = ReadonlyArray<SidebarMenuItem>
