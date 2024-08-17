import {useTransactionSelector} from "@/hooks/use-algorand/use-transaction-selector.ts";
import {encodeAddress} from "algosdk";
import {useAccountInformation} from "@/hooks/use-algorand/algod.ts";
import {useEffect} from "react";
import {useWallet} from "@/hooks/use-wallet.ts";

export function useAccountWatcher() {
    const manager = useWallet()
    const address = manager.activeAddress as string

    // Get account information
    const query = useAccountInformation({address});

    // Last time we received or sent a transaction
    const lastRound = useTransactionSelector((txns)=>{
        return txns.some(txn=>
            (txn.txn.rcv &&
                encodeAddress(txn.txn.rcv) === address) ||
            (txn.txn.snd &&
                encodeAddress(txn.txn.snd) === address)
        )
    })

    // Refetch account information when the last round changes
    useEffect(() => {
        if(query.isSuccess && !query.isFetching && !query.isLoading)
            query.refetch()
    }, [lastRound]);

    return query
}
