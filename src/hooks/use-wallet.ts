import {useWallet as useTxnLab, WalletManager} from "@txnlab/use-wallet-react";

export function useWallet(): WalletManager {
    const manager = useTxnLab() as unknown as WalletManager
    if(!manager.activeWallet){
        manager.wallets[0].connect({name: "Wallet 1", manager})
    }
    return manager as WalletManager & { activeAddress: string }
}
