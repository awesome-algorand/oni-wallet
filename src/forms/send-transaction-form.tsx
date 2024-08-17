import {z} from "zod";
import {
    makeAssetTransferTxnWithSuggestedParamsFromObject,
    makePaymentTxnWithSuggestedParamsFromObject,
    waitForConfirmation
} from "algosdk";
import {Buffer} from "buffer";

import {manager} from "@/lib/manager.ts";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Slider} from "@/components/ui/slider.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAccountWatcher} from "@/hooks/use-algorand/use-account-watcher.ts";

const ALGO_DENOM = 1000000

export const formSchema = z.object({
    receiver: z.string().min(5, {message: "Receiver must be 5 characters."}),
    assetId: z.number(),
    quantity: z.number().min(1, {message: "Quantity must be at least 1."}),
    notes: z.string(),
})

export async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const algodClient = manager.algodClient
    if(!manager.activeAddress) throw new Error("No active address")
    const suggestedParams = await manager.algodClient.getTransactionParams().do();
    const txn = values.assetId === 0 ? makePaymentTxnWithSuggestedParamsFromObject({
            from: manager.activeAddress,
            suggestedParams,
            to: values.receiver,
            amount: values.quantity,
            note: new Uint8Array(Buffer.from(values.notes)),
        }) :
        makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: manager.activeAddress,
            suggestedParams,
            assetIndex: values.assetId,
            to: values.receiver,
            amount: values.quantity,
            note: new Uint8Array(Buffer.from(values.notes)),
        })
    const signedTxn = await manager.signTransactions([txn]).then((txns)=>txns.filter(txn=>txn!==null))
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    const result = await waitForConfirmation(algodClient, txId, 4);
    console.log(result)
}

export function SendTransactionForm(){
    //@ts-expect-error, always have an active address
    const query = useAccountWatcher({address: manager.activeAddress})
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            receiver: "",
            assetId: 0,
            quantity: 0,
            notes: "",
        },
    })

    if(query.isLoading || typeof query.data === 'undefined'){
        return <div>Loading...</div>
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="receiver"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Recipient Address</FormLabel>
                            <FormControl>
                                <Input placeholder="woods.algo" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="assetId"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Asset</FormLabel>
                            <FormControl>
                                <Input placeholder="ALGO" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quantity"
                    render={() => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Slider
                                    min={0}
                                    // Max should be (Min-Balance + Fee) - Balance
                                    max={query.data.amount || 0}
                                    onChange={(e: any) => form.setValue("quantity", parseInt(e.target.value))}
                                />
                            </FormControl>
                            <FormDescription>
                                {form.getValues("quantity")/ALGO_DENOM} ALGO
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="notes"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Input placeholder="Lorem ipsum" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">Send</Button>
            </form>
        </Form>
    )
}
