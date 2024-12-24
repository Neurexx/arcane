// "use client"
// import { JSX, useState } from "react"
// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"

// // Type for the menu items
// interface MenuItem {
//   title: string
//   url: string
//   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
// }

// // Menu items.
// const items: MenuItem[] = [
//   {
//     title: "Dashboard",
//     url: "/student",
//     icon: Home,
//   },
//   {
//     title: "Online Exams",
//     url: "#",
//     icon: Home,
//   },
//   {
//     title: "Scheduled Exams",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Materials",
//     url: "/student/materials",
//     icon: Calendar,
//   },
//   {
//     title: "Doubts",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ]

// export function AppSidebar(): JSX.Element {
//   const [activeItem, setActiveItem] = useState<string | null>(null)
//   const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

//   // Function to toggle the active state of a menu item
//   const handleItemClick = (itemTitle: string): void => {
//     setActiveItem(itemTitle)
//   }

//   // Function to toggle the sidebar collapse
//   const toggleSidebar = (): void => {
//     setIsCollapsed(!isCollapsed)
//   }

//   return (
//     <Sidebar className="bg-gray-800 text-white w-64 shadow-lg transition-all duration-300 ease-in-out">
//       <SidebarContent className="space-y-4 py-4 px-2">
//         <button
//           className="bg-gray-700 text-white p-2 rounded-full fixed top-4 right-4 md:hidden"
//           onClick={toggleSidebar}
//         >
//           {isCollapsed ? ">" : "<"}
//         </button>
//         <SidebarGroup>
//           <SidebarGroupLabel className="text-lg font-bold text-black">
//             Application
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton
//                     onClick={() => handleItemClick(item.title)}
//                     className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ease-in-out ${
//                       activeItem === item.title
//                         ? "bg-blue-600 text-white"
//                         : "hover:bg-blue-400 text-black"
//                     }`}
//                   >
//                     <item.icon className="w-5 h-5" />
//                     <span
//                       className={`${
//                         isCollapsed ? "hidden" : "block"
//                       } transition-all duration-200`}
//                     >
//                       {item.title}
//                     </span>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   )
// }
