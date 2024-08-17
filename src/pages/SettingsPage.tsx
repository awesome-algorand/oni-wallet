import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Switch} from "@/components/ui/switch.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useWallet} from "@/hooks/use-wallet.ts";
import {NetworkId} from "@txnlab/use-wallet-react";
export function SettingsPage(){
    const manager = useWallet()
    console.log(manager)
    return (
        <div className="p-4">
        <Accordion type="single" collapsible className="w-full bg-accent rounded px-4">
            <AccordionItem value="item-1">
                <AccordionTrigger>Network Configuration</AccordionTrigger>
                <AccordionContent>
                    <Select value={manager.activeNetwork} onValueChange={(value: NetworkId)=>manager.setActiveNetwork(value)}>
                        <SelectTrigger className="w-full mb-4 overflow-visible">
                            <SelectValue placeholder="Mainnet" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Networks</SelectLabel>
                                <SelectItem value="mainnet">Mainnet</SelectItem>
                                <SelectItem value="testnet">Testnet</SelectItem>
                                <SelectItem value="betanet">Betanet</SelectItem>
                                <SelectItem value="localnet">Localnet</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select disabled>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Nodely" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Providers</SelectLabel>
                                <SelectItem value="nodely">Nodely</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Namespaces Configuration</AccordionTrigger>
                <AccordionContent>
                    Namespaces allows you to enter short aliases instead of having
                    to fully enter an Algorand Address
                    <div className="flex mt-2 align-middle justify-center items-center gap-2">
                        <img className="w-8 h-8 rounded-3xl" src="https://algorand-wallet-mainnet.b-cdn.net/media/collectible_primary_images/2023/10/13/cd1bd564f4184fa18524e9110d43bbdf.jpeg?width=1152&quality=70"/>
                        <h1 className="flex-1">NFDomains</h1>
                        <Switch id="nfd-switch" checked />
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Delete Wallet</AccordionTrigger>
                <AccordionContent>
                    Are you sure? This action is irreversible.
                    <Button variant="destructive" className="w-full my-4" onClick={()=>manager.wallets[0].disconnect()}>Confirm</Button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        </div>
    )
}
