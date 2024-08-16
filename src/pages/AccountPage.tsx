import {Button} from "@/components/ui/button.tsx";
import {MoveDownRight, ChevronRight, MoveUpRight, SlidersHorizontal} from "lucide-react";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer.tsx";
import {forwardRef, useState} from "react";
import {ListItem} from "@/components/ui/list-item.tsx";
import {WalletManager} from "@txnlab/use-wallet-react";
import {useWallet} from "@/hooks/use-wallet.ts";
import {SendTransactionForm} from "@/forms/send-transaction-form.tsx";
type DrawerType = "send" | "receive" | "opt-in"

function OptInDrawer({manager}: { manager: WalletManager }) {
    return (
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Manage ASA opt-ins</DrawerTitle>
                <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="px-2.5 w-full overflow-auto max-h-[35rem]">
                <ListItem id={"1"} title="hello" description="hello" adornmentLeft={<></>} adornmentRight={<></>}/>
                <ListItem id={"1"} title="hello" description="hello" adornmentLeft={<></>} adornmentRight={<></>}/>
                <ListItem id={"1"} title="hello" description="hello" adornmentLeft={<></>} adornmentRight={<></>}/>
                <ListItem id={"1"} title="hello" description="hello" adornmentLeft={<></>} adornmentRight={<></>}/>
                <ListItem id={"1"} title="hello" description="hello" adornmentLeft={<></>} adornmentRight={<></>}/>
                <ListItem id={"1"} title="hello" description="hello" adornmentLeft={<></>} adornmentRight={<></>}/>
                <ListItem id={"1"} title="hello" description="hello" adornmentLeft={<></>} adornmentRight={<></>}/>
                <ListItem id={"1"} title="hello" description="hello" adornmentLeft={<></>} adornmentRight={<></>}/>
                <ListItem id={"1"} title="hello" description="hello" adornmentLeft={<></>} adornmentRight={<></>}/>
                <ListItem id={"1"} title="hello" description="hello" adornmentLeft={<></>} adornmentRight={<></>}/>
                <ListItem id={"1"} title="hello" description="hello" adornmentLeft={<></>} adornmentRight={<></>}/>
            </div>
            <DrawerFooter className="flex-row">
                <DrawerClose asChild>
                    <Button variant="outline" className="flex-1">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>

        </DrawerContent>
    )
}

function ReceiverAddressDrawer() {
    return (
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Receiver Address</DrawerTitle>
                <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                    <img src="/qr.png"/>
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

function SendTransactionDrawer() {
    return (
        <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                    <DrawerTitle>{"Send Payment"}</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                    <div className="flex items-center justify-center space-x-2">
                        <SendTransactionForm/>
                    </div>
                    <div className="mt-3 h-[120px]">
                    </div>
                </div>
                <DrawerFooter className="flex-row">
                    <DrawerClose asChild>
                        <Button variant="outline" className="flex-1">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </div>
        </DrawerContent>
    )
}

function AccountPageDrawer({type, manager}: { type: DrawerType, manager: WalletManager }) {
    if (type === "opt-in") {
        return <OptInDrawer manager={manager}/>
    }
    if (type === "receive") {
        return <ReceiverAddressDrawer/>
    }
    return <SendTransactionDrawer/>
}

const PaymentButton = forwardRef<HTMLButtonElement, any>((props, ref) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Button ref={ref} onClick={props.onClick} className="rounded-3xl w-10 max-w-10 p-1">{props.icon}</Button>
            <h4>{props.label}</h4>
        </div>
    )
})

export function AccountPage() {
    const manager = useWallet()
    const [drawerType, setDrawerType] = useState<DrawerType>("send")
    const assets = [
        {
            assetId: "0",
            assetName: "ALGO",
            assetAmount: 356,
            logo: "https://asa-list.tinyman.org/assets/0/icon.svg",
        },
        {
            assetId: "1",
            assetName: "USDC",
            assetAmount: 150,
            logo: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
        },
        {
            assetId: "2",
            assetName: "AKTA",
            assetAmount: 150,
            logo: "https://asa-list.tinyman.org/assets/523683256/icon.svg",
        },
    ]
    return (
        <Drawer>
            <AccountPageDrawer type={drawerType} manager={manager}/>
            <div className="h-full flex flex-col p-2">
                <div className="grid w-full justify-center items-center text-center gap-2 my-4">
                    <h1 className="text-4xl bold">356 ALGO</h1>
                    <h1 className="text mb-4">$11.06 USD</h1>
                    <div className="grid grid-cols-2 gap-20">
                        <DrawerTrigger asChild><PaymentButton icon={<MoveDownRight/>} label="Recieve"
                                                              onClick={() => setDrawerType("receive")}/></DrawerTrigger>
                        <DrawerTrigger asChild><PaymentButton icon={<MoveUpRight/>} label="Send"
                                                              onClick={() => setDrawerType("send")}/></DrawerTrigger>

                    </div>
                </div>


                <div className="px-2.5 w-full flex-1">
                    {assets.map((asset) => (
                        <ListItem key={asset.assetId} id={asset.assetId} title={asset.assetName} description=""
                                  adornmentLeft={<img src={asset.logo}/>}
                                  adornmentRight={<Button variant="ghost"><ChevronRight/></Button>}/>
                    ))}
                </div>


                <div className="grid w-full justify-center">
                    <DrawerTrigger asChild><Button variant="ghost"
                                                   onClick={() => setDrawerType("opt-in")}><SlidersHorizontal/> Manage
                        ASA
                        opt-ins</Button></DrawerTrigger>
                </div>
            </div>
        </Drawer>
    )
}
