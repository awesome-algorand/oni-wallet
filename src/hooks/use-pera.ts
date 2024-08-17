import {useWallet} from "@txnlab/use-wallet-react";
import {useQuery} from "@tanstack/react-query";
import {useMemo} from "react";

export function useVerifiedAssets(){
    const manager = useWallet()
    const network = useMemo(()=>{
        return manager.activeNetwork === 'testnet' ? 'testnet' : 'mainnet'
    },[manager])
    const url = `https://${network}.api.perawallet.app/v1/verified-assets/`
    return useQuery({
        queryKey: [url],
        queryFn: async ({signal}) => await fetch(url, {signal}).then(r=>r.json())
    })
}
