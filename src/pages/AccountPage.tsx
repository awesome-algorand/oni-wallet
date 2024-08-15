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
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Slider} from "@/components/ui/slider.tsx";

type DrawerType = "send" | "receive" | "opt-in"

function OptInDrawer() {
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

const formSchema = z.object({
    receiver: z.string().length(5, {message: "Receiver must be 5 characters."}),
    assetId: z.number(),
    quantity: z.number().min(1, {message: "Quantity must be at least 1."}),
    notes: z.string(),
})

function SendTransactionDrawer({type}: { type: DrawerType }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            receiver: "",
            assetId: 0,
            quantity: 0,
            notes: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                    <DrawerTitle>{type === "send" ? "Send Payment" : "Receiver Address"}</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                    <div className="flex items-center justify-center space-x-2">
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
                                                    // Max should be (Min-Balance + Fee) - Balance
                                                    max={1000}
                                                    onChange={(e: any) => form.setValue("quantity", parseInt(e.target.value))}
                                                />
                                                {/*<Input placeholder="shadcn" {...field} />*/}
                                            </FormControl>
                                            <FormDescription>
                                                {form.getValues("quantity")}
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
                            </form>
                        </Form>
                    </div>
                    <div className="mt-3 h-[120px]">
                    </div>
                </div>
                <DrawerFooter className="flex-row">
                    <DrawerClose asChild>
                        <Button variant="outline" className="flex-1">Cancel</Button>
                    </DrawerClose>
                    <DrawerClose asChild>
                        <Button className="flex-1" type="submit">Send</Button>
                    </DrawerClose>
                </DrawerFooter>
            </div>
        </DrawerContent>
    )
}

function AccountPageDrawer({type}: { type: DrawerType }) {
    if (type === "opt-in") {
        return <OptInDrawer/>
    }
    if (type === "receive") {
        return <ReceiverAddressDrawer/>
    }
    return <SendTransactionDrawer type={type}/>
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
            <AccountPageDrawer type={drawerType}/>
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
