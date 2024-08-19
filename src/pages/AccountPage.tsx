import {Button} from "@/components/ui/button.tsx";
import {MoveDownRight, MoveUpRight, SlidersHorizontal} from "lucide-react";
import {
    Drawer,
    DrawerTrigger
} from "@/components/ui/drawer.tsx";
import {forwardRef, useState} from "react";
import {WalletManager} from "@txnlab/use-wallet-react";
import {useWallet} from "@/hooks/use-wallet.ts";
import {useIconAssets, usePrice} from "@/hooks/use-tinyman.ts";
import {useAccountWatcher} from "@/hooks/use-algorand/use-account-watcher.ts";
import {QrCodeDrawer} from "@/drawers/qr-code-drawer.tsx";
import {SendTransactionDrawer} from "@/drawers/send-transaction-drawer.tsx";
import {OptInDrawer} from "@/drawers/opt-in-drawer.tsx";
import {Account} from "@/hooks/use-algorand/types.gen.ts";
import {AssetListItem} from "@/components/asset-list-item.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

type DrawerType = "send" | "receive" | "opt-in"

/**
 * AccountPageDrawer
 *
 * Handle the different drawers for the account page
 *
 * @param type
 * @param manager
 * @param info
 * @constructor
 */
function AccountPageDrawer({type, manager, info}: { type: DrawerType, manager: WalletManager, info: Account }) {
    if (type === "opt-in") {
        return <OptInDrawer info={info}/>
    }
    if (type === "receive") {
        return <QrCodeDrawer manager={manager}/>
    }
    return <SendTransactionDrawer/>
}

/**
 * Send/Receive Buttons
 */
const PaymentButton = forwardRef<HTMLButtonElement, any>((props, ref) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Button
                ref={ref}
                onClick={props.onClick}
                className="rounded-3xl w-10 max-w-10 p-1">
                {props.icon}
            </Button>
            <h4>{props.label}</h4>
        </div>
    )
})

export type Asset = {
    index: string,
    name: string,
    unitName: string,
    logo: string,
    amount: number
}

/**
 * AssetHoldings
 *
 * Display the users asset holdings
 *
 * @param assets
 * @constructor
 */
export function AssetHoldings({assets}: { assets: Asset[] }) {
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
    return (
        <div className="px-2.5 w-full flex-1">
            <Dialog onOpenChange={(open) => {
                if (!open) setSelectedAsset(null)
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{selectedAsset?.unitName}</DialogTitle>
                        <DialogDescription>
                            {selectedAsset?.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <h1>Work in Progress!</h1>
                        <h2>This could be a page</h2>
                    </div>
                </DialogContent>

                {assets.map((asset) => (
                    <DialogTrigger asChild><AssetListItem onClick={() => setSelectedAsset(asset)} key={asset.index}
                                                          index={asset.index} name={asset.name}
                                                          logo={asset.logo} amount={asset.amount}/></DialogTrigger>
                ))}
            </Dialog>
        </div>
    )
}

export function AccountPage() {
    // Drawer State
    const [drawerType, setDrawerType] = useState<DrawerType>("send")

    // ❤ TxnLab Use Wallet
    const manager = useWallet()
    // ❤ Tinyman Icons
    const icons = useIconAssets()
    // ❤ Tinyman Prices
    const algoPrice = usePrice(0)

    // Watch the current account
    const info = useAccountWatcher()

    // Map icons to assets
    const assets = icons.filter((icon) => {
        if (typeof info?.data?.assets === 'undefined') return false
        // Always allow Algorand as an asset
        if (icon.index === "0") return true

        // Check if the asset is in the account
        return info.data.assets.some((asset) =>
            asset["asset-id"].toString() === icon.index
        )
    }).map((icon) => {
        if (typeof info?.data?.assets === 'undefined') throw new Error('Assets are undefined')

        // Check if the asset has a logo or if it is the ALGO token
        const asset = icon.index === "0" ?
            // ALGO token data is not in the asset array, it is in the parent object
            info.data :
            // Find the asset in the account
            info.data.assets.find((asset) => asset["asset-id"].toString() === icon.index)

        // TODO: Set Precision of amount
        return {
            ...icon,
            amount: asset?.amount || 0
        }
    })

    // Handle Loading State
    // TODO: allow for partial updates to the page, instead of a full page spinner
    if (info.isLoading || typeof info.data === 'undefined' || typeof algoPrice.data === 'undefined')
        return (
            <div className="flex h-full justify-center align-middle items-center">
                <Spinner className="h-40 w-40"/>
            </div>
        )

    return (
        <Drawer>
            {/* Page Drawer */}
            <AccountPageDrawer type={drawerType} manager={manager} info={info.data}/>
            <div className="h-full flex flex-col p-2">
                {/* Account Information */}
                <div className="grid w-full justify-center items-center text-center gap-2 my-4">
                    <h1 className="text-4xl bold">
                        {info.data.amount / 1000000 || 0} ALGO
                    </h1>
                    <h1 className="text mb-4">
                        ${Math.round((algoPrice.data * (info.data.amount / 1000000)) * 100) / 100} USD
                    </h1>
                    <div className="grid grid-cols-2 gap-20">
                        <DrawerTrigger asChild>
                            <PaymentButton
                                icon={<MoveDownRight/>}
                                label="Receive"
                                onClick={() => setDrawerType("receive")}
                            />
                        </DrawerTrigger>
                        <DrawerTrigger asChild>
                            <PaymentButton
                                icon={<MoveUpRight/>}
                                label="Send"
                                onClick={() => setDrawerType("send")}
                            />
                        </DrawerTrigger>

                    </div>
                </div>

                {/* Account Holdings */}
                <AssetHoldings assets={assets}/>

                {/* Manage Opt-in */}
                <div className="grid w-full justify-center">
                    <DrawerTrigger asChild>
                        <Button
                            variant="ghost"
                            onClick={() => setDrawerType("opt-in")}
                        >
                            <SlidersHorizontal/> Manage ASA opt-ins
                        </Button>
                    </DrawerTrigger>
                </div>
            </div>
        </Drawer>
    )
}
