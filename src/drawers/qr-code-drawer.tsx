import { Button } from "@/components/ui/button.tsx";
import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer.tsx";
import { QRCode } from "@/components/ui/qr-code.tsx";
import type { WalletManager } from "@txnlab/use-wallet-react";

export function QrCodeDrawer({ manager }: { manager: WalletManager }) {
	return (
		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle>Receiver Address</DrawerTitle>
				<DrawerDescription />
			</DrawerHeader>
			<div className="p-4 pb-0">
				<div className="flex items-center justify-center space-x-2">
					<QRCode manager={manager} />
				</div>
				<div className="mt-3 h-[120px]" />
			</div>
			<DrawerFooter className="flex-row">
				<DrawerClose asChild>
					<Button variant="outline" className="flex-1">
						Cancel
					</Button>
				</DrawerClose>
			</DrawerFooter>
		</DrawerContent>
	);
}
