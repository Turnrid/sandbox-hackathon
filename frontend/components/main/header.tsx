'use client';

import { BreadcrumbItem } from '@/components/ui/breadcrumb';
import { Bell, ChevronRight, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AddDeploymentDrawer } from '@/components/deployment/add-deployment-drawer';


interface BreadcrumbItemProps {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface DashboardHeaderProps {
  breadcrumbItems?: BreadcrumbItemProps[];
  userInitials?: string;
}

export function Header({
  breadcrumbItems = [],
  userInitials = 'JP',
}: DashboardHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const pathName = usePathname();
  return (
    <>
    <div className="bg-[#273142] px-4 py-2 text-white text-sm flex items-center justify-between">
      <Breadcrumb className="text-white">
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <BreadcrumbItem key={index}>
              {!item.isActive ? (
                <BreadcrumbLink asChild>
                  <Link href={item.href || '#'} className="hover:underline">
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbLink>{item.label}</BreadcrumbLink>
              )}
              {index < breadcrumbItems.length - 1 && (
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-2">
        {pathName === '/deployments' && (
          <Button 
            onClick={() => setIsDrawerOpen(true)}
            className="bg-[#3f51b5] hover:bg-blue-800 transition-colors"
          >
            + Add Deployment
          </Button>
        )}
        <Link href="/settings">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-[#3749a6]/50 rounded-full p-1"
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
        <Link href="/logout">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-[#3749a6]/50 rounded-full p-1"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#3749a6]/50 rounded-full p-1"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <div className="ml-2 h-6 w-6 bg-[#3749a6] rounded-full flex items-center justify-center text-white text-xs">
          {userInitials}
        </div>
      </div>
    </div>
          {/* ✅ Drawer */}
          <AddDeploymentDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
    </>
  );
}
