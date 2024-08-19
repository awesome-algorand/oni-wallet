import {Button} from "@/components/ui/button.tsx";
import {ChevronRight} from "lucide-react";
import {ListItem, ListItemProps} from "@/components/ui/list-item.tsx";
import {forwardRef} from "react";

export type AssetListItemProps = {
    index: string,
    name: string,
    amount: number,
    logo: string,
}

export const AssetListItem = forwardRef<ListItemProps, any>(({index, name, amount, logo, ...props}: AssetListItemProps) => {
    return (
        <ListItem
            id={index}
            title={name}
            description={`Amount: ${amount}`}
            adornmentLeft={<img src={logo} alt={`Logo for ${name}`}/>}
            adornmentRight={<Button variant="ghost"><ChevronRight/></Button>}
            {...props}
        />
    )
})
