import {
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer.tsx";
import {ListItem} from "@/components/ui/list-item.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Account} from "@/hooks/use-algorand/types.gen.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useIconAssets} from "@/hooks/use-tinyman.ts";
import {makeAssetTransferTxnWithSuggestedParamsFromObject, waitForConfirmation} from "algosdk";
import {manager} from "@/lib/manager.ts";
import { CircleCheckBig } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import {useToast} from "@/components/ui/use-toast.ts";

export function OptInAssetListItem({asset, info}: {info: Account, asset: {index: string, name: string, unitName: string, logo: string}}) {
    const [isOptedIn, setIsOptedIn] = useState(info.assets ? info.assets.some(a=>a["asset-id"].toString() === asset.index) : false)
    const [isPending, setIsPending] = useState(false)
    const { toast } = useToast()
    return (
        <ListItem
            disable={isOptedIn}
            onClick={()=>{
                if(isOptedIn || isPending) return
                console.log("Clicked")
                async function optInToAsset(){
                    setIsPending(true)
                    const suggestedParams = await manager.algodClient.getTransactionParams().do();
                    const txn = makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: manager.activeAddress as string,
                        suggestedParams,
                        assetIndex: parseInt(asset.index),
                        to: manager.activeAddress as string,
                        amount: 0,
                    })
                    const signedTxn = await manager.signTransactions([txn])
                        .then((txns)=>txns.filter(txn=>txn!==null))
                    const { txId } = await manager.algodClient.sendRawTransaction(signedTxn).do();
                   await waitForConfirmation(manager.algodClient, txId, 4);
                    setIsOptedIn(true)
                    setIsPending(false)
                }
                optInToAsset().catch((e)=> {
                    setIsPending(false)
                    console.log(e.message.split(':'))
                    toast({
                        title: "Insufficient funds",
                        description: "Ensure you have enough funds to opt-in to this asset.",
                    })
                })
            }}
            id={asset.index.toString()}
            title={asset.name}
            description={asset.unitName}
            adornmentLeft={<img src={asset.logo}/>}
            adornmentRight={isOptedIn ? <CircleCheckBig/> : isPending ? <Spinner/> : <></>}
        />
    )
}

export function OptInDrawer({info}: {info: Account}) {
    const icons = useIconAssets().filter((i)=>i.index !== "0")
    return (
        <DrawerContent className="px-2">
            <DrawerHeader>
                <DrawerTitle>Manage ASA opt-ins</DrawerTitle>
                <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <Input type="search" placeholder="Filter by Name" />
            <Tabs defaultValue="verified" className="w-full">
                <TabsList className="w-full rounded-none bg-background">
                    <TabsTrigger value="verified">Verified</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <TabsContent value="verified" className="mt-0">
                    <div className="w-full overflow-auto max-h-[20rem]">
                        {icons.map(asset => (
                            <OptInAssetListItem key={asset.index} info={info} asset={asset}/>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="all" className="mt-0">
                    <div className="w-full overflow-auto max-h-[20rem]">
                        {icons.map(asset => (
                            <OptInAssetListItem key={asset.index} info={info} asset={asset}/>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
            <DrawerFooter className="flex-row">
                <DrawerClose asChild>
                    <Button variant="outline" className="flex-1">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>

        </DrawerContent>
    )
}
