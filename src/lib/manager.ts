import {OniProvider} from "@/lib/OniProvider.ts";
import {NetworkId, WalletId, WalletManager} from "@txnlab/use-wallet-react";

const provider = new OniProvider()
export const manager = new WalletManager({
    wallets: [{
        id: WalletId.CUSTOM,
        options: {provider},
        metadata: {
            name: 'Example Wallet',
            icon: 'data:image/svg+xml;base64,...',
        }
    }],
    network: NetworkId.TESTNET
})
