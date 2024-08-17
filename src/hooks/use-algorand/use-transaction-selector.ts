import { useEffect, useState } from "react";
import type {BlockTransaction} from "@algorandfoundation/algokit-subscriber/types/block";
import {useBlockInformation} from "@/hooks/use-algorand/algod.ts";
import {useHeartbeat} from "@/hooks/use-algorand/use-heartbeat.ts";

/**
 * Transaction Selector Hook
 *
 * Watch the blockchain for a transaction that matches the selector,
 * then return the round that the transaction was found in.
 *
 * @param {Function} selector Filter function
 * @TODO Migrate to Subscriber, figure out why it was not working
 */
export function useTransactionSelector(
    selector: (txns: BlockTransaction[]) => boolean = () => true,
) {
    /**
     * The last round that the selector returned true
     */
    const [lastRound, setLastRound] = useState(0);
    /**
     * The current round we are checking
     */
    const round = useHeartbeat()

    /**
     * The block for the current round
     */
    const block = useBlockInformation({round});

    // Check if the selector returns true for the current block
    useEffect(() => {
        if (block?.data?.block.txns) {
            if (selector(block.data.block.txns)) {
                setLastRound(round);
            }
        }
    }, [round, block.data, selector]);

    // Return the last round that the selector returned true
    return lastRound;
}
