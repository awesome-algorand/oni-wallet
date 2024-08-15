import {Outlet, useLocation, LinkProps} from "react-router-dom";
import {Coins, Grid2X2, ArrowLeftRight, Settings, Bell, ChevronDown} from 'lucide-react'
import {Link} from 'react-router-dom'
import {ReactElement} from "react";
import {motion} from 'framer-motion'
import {Tauri} from "@/icons/Tauri.tsx";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Plus,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle, DrawerTrigger
} from "@/components/ui/drawer.tsx";
import * as React from "react";
export type MobileBottomNavLinkProps = {
    icon: ReactElement,
    active?: boolean,
    label?: string,
} & LinkProps

export function MobileBottomNavLink({icon, label, active, className, ...rest}: MobileBottomNavLinkProps){
    return (
        <Link role="button"
            className={cn("mobile-bottom-nav-link inline-flex flex-col items-center justify-center group", className)}
            {...rest}
        >
                {icon}
            {label && <span className="text-sm">{label}</span>}
        </Link>
    )
}

export const WalletMenu = React.forwardRef<HTMLDivElement, any>((props, ref) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" >Wallet 1 <ChevronDown/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Accounts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                    <span>Wallet 1</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span>Wallet 2</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={props.onClick} ref={ref}>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Add / Create new wallet</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
})

function WalletDrawer() {
    return (
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Create Address</DrawerTitle>
                <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">

                </div>
                <div className="mt-3 h-[120px]">
                </div>
            </div>
            <DrawerFooter className="flex-row">
                <DrawerClose asChild>
                    <Button variant="outline" className="flex-1">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    )
}

export function MobileLayout(){
    const location = useLocation()

    const indicatorPositions = {
        "/": { left: "0.9rem" },
        "/explore": { left: "6.4rem" },
        "/activity": { left: "12rem" },
        "/settings": { left: "17.68rem" },
    }
    return (
        <>
            <header className="w-full h-16 border grid grid-cols-3 px-4 items-center justify-center align-middle">
                <Tauri className="h-8"/>
                <Drawer>
                    <WalletDrawer/>
                    <DrawerTrigger asChild><WalletMenu/></DrawerTrigger>
                </Drawer>
                <Bell className="ml-auto"/>
            </header>
            <main className="flex-1 py-2 overflow-auto">
                <Outlet/>
            </main>
            <nav className="w-full h-16 border">
                <div className="relative grid h-full max-w-sm grid-cols-4 mx-auto font-medium">
                    <motion.div
                        className="absolute bg-primary h-1 w-16 top-0"
                        animate={location.pathname}
                        variants={indicatorPositions}
                    />
                    <MobileBottomNavLink
                        to="/"
                        icon={<Coins/>}
                        // label="Account"
                    />
                    <MobileBottomNavLink
                        to="/explore"
                        icon={<Grid2X2/>}
                        // label="Explore"
                    />
                    <MobileBottomNavLink
                        to="/activity"
                        icon={<ArrowLeftRight/>}
                        // label="Activity"
                    />
                    <MobileBottomNavLink
                        to="/settings"
                        icon={<Settings/>}
                        // label="Settings"
                    />
                </div>
            </nav>

        </>
    )
}
