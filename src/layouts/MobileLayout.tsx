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
import {WalletManager} from "@txnlab/use-wallet-react";
import {useWallet} from "@/hooks/use-wallet.ts";

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

type WalletMenuProps = {
    onClick: () => void
    manager: WalletManager
}
export const WalletMenu = React.forwardRef<HTMLDivElement, any>((props: WalletMenuProps, ref) => {
    const {manager} = props
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" >{props.manager.activeAccount?.name}<ChevronDown/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Accounts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {manager.activeWalletAccounts && manager.activeWalletAccounts.map((account) => (
                    <DropdownMenuItem onClick={()=>manager.wallets[0].setActiveAccount(account.address)} disabled={props.manager.activeAddress === account.address} key={account.address}>{account.name}</DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={props.onClick} ref={ref}>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Add / Create new wallet</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
})

function WalletDrawer({manager}: {manager: WalletManager}) {
    return (
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Create Address</DrawerTitle>
                <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                    <DrawerTrigger asChild><Button variant="outline" className="flex-1" onClick={()=>{
                        manager.wallets[0].connect({name:`Wallet ${manager.activeWalletAccounts ? manager.activeWalletAccounts.length + 1 : 1}`, manager})
                    }}>Create New Address</Button></DrawerTrigger>
                    <Button variant="outline" className="flex-1">Import Existing Address</Button>
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
    const manager = useWallet()
    const location = useLocation()

    const indicatorPositions = {
        "/": { left: "0.9rem" },
        "/explore": { left: "6.4rem" },
        "/activity": { left: "12rem" },
        "/settings": { left: "17.68rem" },
    }
    return (
        <>
            <header className="w-full h-16 border dark:border-none grid grid-cols-3 px-4 items-center justify-center align-middle">
                <Tauri className="h-8"/>
                <Drawer>
                    <WalletDrawer manager={manager}/>
                    <DrawerTrigger asChild><WalletMenu manager={manager}/></DrawerTrigger>
                </Drawer>
                <Bell className="ml-auto"/>
            </header>
            <main className="flex-1 py-2 overflow-auto">
                <Outlet/>
            </main>
            <nav className="w-full h-16 border dark:border-none">
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
