import {ReactElement} from "react";

export type ListItemProps = {
    id: string
    title: string,
    description: string,
    adornmentLeft: ReactElement,
    adornmentRight: ReactElement,

}

export function ListItem(item: ListItemProps) {
    return (
        <div className="flex border rounded items-center justify-between w-full bg-accent h-16 px-2 my-2">
            <div className="flex items-center space-x-4">
                <div
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                    {item.adornmentLeft}
                </div>
                <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                {item.adornmentRight}
            </div>
        </div>
    )
}
