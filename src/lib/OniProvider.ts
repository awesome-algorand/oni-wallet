import { manager } from "@/lib/manager.ts";
import type {
	CustomProvider,
	WalletAccount,
	WalletManager,
} from "@txnlab/use-wallet"; // Or any framework adapter
import type { Transaction } from "algosdk";
import { generateAccount } from "algosdk";

type WalletAccountWithSecret = WalletAccount & {
	secret: Uint8Array | number[];
};

/**
 * Oni Provider
 *
 * This provider is used to sign transactions with a secret key.
 * Built with TxnLab's use-wallet library.
 *
 * This is not production ready, it should only be used as a proof of concept.
 */
export class OniProvider implements CustomProvider {
	/**
	 * @TODO: Integrate with a secret provider
	 * @param name
	 * @param manager
	 */
	async connect({
		name,
		manager,
	}: { name: string; manager: WalletManager }): Promise<
		WalletAccountWithSecret[]
	> {
		const account = generateAccount();
		console.log("Generated Account", account.addr);
		const result = manager.activeWalletAccounts
			? [...(manager.activeWalletAccounts as WalletAccountWithSecret[])]
			: [];
		return [
			{ address: account.addr, secret: Array.from(account.sk), name },
			...result,
		];
	}
	/**
	 * @TODO: Integrate with a secret provider
	 */
	get secretKey(): Uint8Array {
		if (!manager.activeAccount) throw new Error("No active account");
		const account = manager.activeAccount as WalletAccountWithSecret;
		return account.secret instanceof Uint8Array
			? account.secret
			: new Uint8Array(account.secret);
	}

	/**
	 * @TODO: Integrate with a secret provider
	 * @param txnGroup
	 */
	handleSigning(txnGroup: Transaction[]): Uint8Array[] {
		const stxns = [];
		for (let i = 0; i < txnGroup.length; i++) {
			stxns.push(txnGroup[i].signTxn(this.secretKey));
		}
		return stxns;
	}

	/**
	 * Sign Transactions Interface
	 *
	 * Called by use-wallet to sign transactions
	 * @param txnGroup
	 */
	async signTransactions<T extends Transaction[] | Uint8Array[]>(
		txnGroup: T | T[],
	): Promise<(Uint8Array | null)[]> {
		return this.handleSigning(txnGroup as Transaction[]);
	}

	/**
	 * Transaction Signer Interface
	 *
	 * Used in integration like algokit clients
	 * @param txnGroup
	 */
	async transactionSigner(txnGroup: Transaction[]): Promise<Uint8Array[]> {
		return this.handleSigning(txnGroup);
	}
}
