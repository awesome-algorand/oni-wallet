import { Button } from "@/components/ui/button.tsx";
import {
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer.tsx";
import { SendTransactionForm } from "@/forms/send-transaction-form.tsx";

export function SendTransactionDrawer() {
	return (
		<DrawerContent>
			<div className="mx-auto w-full">
				<DrawerHeader>
					<DrawerTitle>{"Send Payment"}</DrawerTitle>
					<DrawerDescription />
				</DrawerHeader>
				<div className="p-4 pb-0">
					<div className="flex items-center justify-center">
						<SendTransactionForm />
					</div>
					<div className="my-3" />
				</div>
				<DrawerFooter className="flex-row">
					<DrawerClose asChild>
						<Button variant="outline" className="flex-1">
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</div>
		</DrawerContent>
	);
}
