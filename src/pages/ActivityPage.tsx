import {CircleCheck, ArrowLeftRight, ArrowRight, ArrowLeft} from "lucide-react";
import {ReactElement} from "react";

type ActivityItemProps = {
    id: string
    title: string,
    description: string,
    adornmentLeft: ReactElement,
    adornmentRight: string,

}
export function ActivityItem(activity: ActivityItemProps){
    return (
        <div className="flex border rounded items-center justify-between w-full bg-accent h-16 px-2 my-2">
            <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                    {activity.adornmentLeft}
                </div>
                <div>
                    <p className="text-sm font-semibold">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                {activity.adornmentRight}
            </div>
        </div>
    )
}

export function ActivityPage(){
    const activities = [
        {
            id: "1",
            title: "Contract interaction",
            description: 'Oct 24 folks.finance',
            adornmentLeft: <ArrowLeftRight/>,
            adornmentRight: "-356 ALGO",

        },
        {
            id: "2",
            title: "ASA opt-in",
            description: 'USDC',
            adornmentLeft: <CircleCheck/>,
            adornmentRight: "-36 ALGO",

        },
        {
            id: "3",
            title: "Contract interaction",
            description: 'Oct 19 algofi v1',
            adornmentLeft: <ArrowLeftRight/>,
            adornmentRight: "-36 ALGO",

        },
        {
            id: "4",
            title: "Sent Transaction",
            description: 'OVAOTJJLJP54QIK...',
            adornmentLeft: <ArrowRight/>,
            adornmentRight: "-36 ALGO",

        },
        {
            id: "5",
            title: "Received Transaction",
            description: 'OVAOTJJLJP54QIK...',
            adornmentLeft: <ArrowLeft/>,
            adornmentRight: "+36 ALGO",

        },{
            id: "6",
            title: "Received Transaction",
            description: 'OVAOTJJLJP54QIK...',
            adornmentLeft: <ArrowLeft/>,
            adornmentRight: "+46 ALGO",

        },
        {
            id: "7",
            title: "Received Transaction",
            description: 'OVAOTJJLJP54QIK...',
            adornmentLeft: <ArrowLeft/>,
            adornmentRight: "+1337 ALGO",

        },
        {
            id: "8",
            title: "Contract interaction",
            description: 'Oct 19 algofi v1',
            adornmentLeft: <ArrowLeftRight/>,
            adornmentRight: "-36 ALGO",

        },
        {
            id: "9",
            title: "Sent Transaction",
            description: 'OVAOTJJLJP54QIK...',
            adornmentLeft: <ArrowRight/>,
            adornmentRight: "-36 ALGO",

        },
        {
            id: "10",
            title: "Received Transaction",
            description: 'OVAOTJJLJP54QIK...',
            adornmentLeft: <ArrowLeft/>,
            adornmentRight: "+36 ALGO",

        },{
            id: "11",
            title: "Received Transaction",
            description: 'OVAOTJJLJP54QIK...',
            adornmentLeft: <ArrowLeft/>,
            adornmentRight: "+46 ALGO",

        },
        {
            id: "12",
            title: "Received Transaction",
            description: 'OVAOTJJLJP54QIK...',
            adornmentLeft: <ArrowLeft/>,
            adornmentRight: "+1337 ALGO",

        },
    ]
    return (
        <div className="px-2.5">
            {activities.map((activity) => (
                <ActivityItem key={activity.id} {...activity}/>
            ))}
        </div>
    )
}
