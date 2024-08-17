import {Button} from "@/components/ui/button.tsx";
import {ChevronRight} from "lucide-react";
import {ListItem} from "@/components/ui/list-item.tsx";

export type AssetListItemProps = {
    index: string,
    name: string,
    amount: number,
    logo: string,
}

export function AssetListItem({index, name, amount, logo}: AssetListItemProps){
    return (
        <ListItem id={index} title={name} description={`Amount: ${amount}`}
              adornmentLeft={<img src={logo}/>}
              adornmentRight={<Button variant="ghost"><ChevronRight/></Button>}/>
    )
}
