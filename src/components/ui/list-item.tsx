import {ComponentPropsWithoutRef, ReactElement} from "react";

export type ListItemProps = {
    id: string
    title: string,
    disable?: boolean,
    description: string,
    adornmentLeft: ReactElement,
    adornmentRight: ReactElement,

} & ComponentPropsWithoutRef<'div'>

export function ListItem({id, disable, title, description, adornmentRight, adornmentLeft, ...props}: ListItemProps) {
    return (
        <div className={"flex border rounded items-center justify-between w-full bg-accent h-16 px-2 my-2" + (disable ? " disable" : "")} {...props}>
            <div className="flex items-center space-x-4">
                <div
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                    {adornmentLeft}
                </div>
                <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                {adornmentRight}
            </div>
        </div>
    )
}
