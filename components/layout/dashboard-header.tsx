"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function DashboardHeader() {
  const pathname = usePathname()

  // Generate breadcrumbs from pathname
  const pathSegments = pathname.split("/").filter(Boolean)
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/")
    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
    return { href, label }
  })

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      {/* Mobile brand */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="p-1.5 rounded-md">
          <Image
            src="/icon-btp-cfa.png"
            alt="BTP CFA IDF"
            width={24}
            height={24}
            className="h-12 w-12 object-contain"
          />
        </div>
        <div>
          <h1 className="font-semibold text-sm">BTP CFA IDF</h1>
        </div>
      </div>

      {/* Desktop breadcrumbs */}
      <div className="hidden md:block">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.length > 1 && (
              <>
                <BreadcrumbSeparator />
                {breadcrumbs.slice(1).map((crumb, index) => (
                  <BreadcrumbItem key={crumb.href}>
                    {index === breadcrumbs.length - 2 ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </BreadcrumbItem>
                ))}
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
