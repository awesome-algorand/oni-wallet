import {WalletManager} from "@txnlab/use-wallet-react";
import {
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer.tsx";
import {QRCode} from "@/components/ui/qr-code.tsx";
import {Button} from "@/components/ui/button.tsx";

export function QrCodeDrawer({manager}: {manager: WalletManager}) {
    return (
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Receiver Address</DrawerTitle>
                <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                    <QRCode manager={manager}/>
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
