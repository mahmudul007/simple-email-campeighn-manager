import { AppSidebar } from "@/Components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export default function AuthenticatedLayout({ header, children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex items-center p-4 border-b">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mx-4 h-6" />
            {header && <div className="font-semibold">{header}</div>}
        </div>
        <div className="p-4">
            {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

