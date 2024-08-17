import {
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer.tsx";
import {SendTransactionForm} from "@/forms/send-transaction-form.tsx";
import {Button} from "@/components/ui/button.tsx";

export function SendTransactionDrawer() {
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
