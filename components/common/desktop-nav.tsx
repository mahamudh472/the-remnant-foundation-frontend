"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const PROGRAMS_ITEMS = [
  {
    name: "Skills Development School",
    href: "/programs/skills",
    highlight: true,
  },
  { name: "Reform", href: "/programs/reform" },
  { name: "Ignite", href: "/programs/ignite" },
]

const COURSES_ITEMS = [
  { name: "All Classes", href: "/courses", highlight: true },
  { name: "Kids (5–10)", href: "/courses?age=kids" },
  { name: "Teen (14–18)", href: "/courses?age=teen" },
  { name: "Young Adults (19–25)", href: "/courses?age=young-adults" },
]

function NavDropdown({
  label,
  active,
  items,
  width = "w-56",
}: {
  label: string
  active: boolean
  items: { name: string; href: string; highlight?: boolean }[]
  width?: string
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "bg-transparent px-3 font-semibold hover:bg-transparent focus:bg-transparent data-popup-open:bg-transparent data-open:bg-transparent data-open:hover:bg-transparent data-open:focus:bg-transparent",
              active ? "text-[#4CC0D8]" : "text-[#1D1D1D]"
            )}
          >
            {label}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white">
            <ul className={cn("p-2", width)}>
              {items.map((item) => (
                <li key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50",
                        item.highlight ? "text-[#4CC0D8]" : "text-[#1D1D1D]"
                      )}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href)
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 text-sm font-semibold transition-colors hover:text-[#4CC0D8]",
        isActive ? "text-[#4CC0D8]" : "text-[#1D1D1D]"
      )}
    >
      {label}
    </Link>
  )
}

export function DesktopNav() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex lg:items-center">
      <NavLink href="/" label="Home" />

      <NavDropdown
        label="Programs"
        active={pathname.startsWith("/programs")}
        items={PROGRAMS_ITEMS}
        width="w-64"
      />

      <NavLink href="/partnership" label="Partnership" />
      <NavLink href="/events" label="Events" />

      <NavDropdown
        label="Courses"
        active={pathname.startsWith("/courses")}
        items={COURSES_ITEMS}
        width="w-56"
      />

      <NavLink href="/contact" label="Contact" />
    </div>
  )
}
