import {useEffect, useState} from "react";
import {useWaitForBlock} from "@/hooks/use-algorand/algod.ts";

export function useHeartbeat(){
   const [heartbeat, setHeartbeat] = useState(0);
   const query = useWaitForBlock({round: heartbeat});

    useEffect(() => {
        if(query.data) {
            setHeartbeat(query.data["last-round"]);
        }
    }, [query]);

   return heartbeat
}
