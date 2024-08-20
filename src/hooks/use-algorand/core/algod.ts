import type { QueryFunction, QueryKey } from "@tanstack/query-core";
import type { Algodv2 } from "algosdk";
import type {
	AccountApplicationInformationData,
	AccountApplicationInformationResponse,
	AccountAssetInformationData,
	AccountInformationData,
	GetApplicationBoxByNameData,
	GetApplicationBoxesData,
	GetApplicationByIdData,
	GetAssetByIdData,
	GetBlockData,
	GetBlockHashData,
	GetLedgerStateDeltaData,
	GetLedgerStateDeltaForTransactionGroupData,
	GetPendingTransactionsByAddressData,
	GetTransactionGroupLedgerStateDeltasForRoundData,
	GetTransactionProofData,
	PendingTransactionInformationData,
	WaitForBlockData,
} from "../types.gen";

/**
 * Get Account Application Information Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {AccountApplicationInformationData} data The address and application ID to look up.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#accountApplicationInformation
 */
export function accountApplicationInformation<T>(
	client: Algodv2,
	data: AccountApplicationInformationData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [
			client.c.bc.baseURL.origin,
			"accountApplicationInformation",
			data,
		],
		queryFn: (() =>
			client
				.accountApplicationInformation(data.address, data.applicationId)
				.do() as unknown as AccountApplicationInformationResponse) as
			| QueryFunction<AccountApplicationInformationResponse, QueryKey, never>
			| undefined,
		...options,
	};
}

/**
 * Get Account Asset Information Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {AccountAssetInformationData} data The address and asset ID to look up.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#accountAssetInformation
 */
export function accountAssetInformation<T>(
	client: Algodv2,
	data: AccountAssetInformationData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "accountAssetInformation", data],
		queryFn: () =>
			client.accountAssetInformation(data.address, data.assetId).do(),
		...options,
	};
}

/**
 * Get Account Information Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {AccountInformationData} data The address to look up.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#accountInformation
 */
export function accountInformation<T>(
	client: Algodv2,
	data: AccountInformationData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "accountInformation", data],
		queryFn: () => client.accountInformation(data.address).do(),
		...options,
	};
}

/**
 * Get Block Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {GetBlockData} data The round number of the block to get.
 * @param {object} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#block
 */
export function getBlock<T>(
	client: Algodv2,
	data: GetBlockData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getBlock", data],
		queryFn: () => client.block(data.round).do(),
		staleTime: Number.POSITIVE_INFINITY,
		cacheTime: Number.POSITIVE_INFINITY,
		...options,
	};
}

/**
 * Get Genesis Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#genesis
 */
export function getGenesis<T>(client: Algodv2, options: T = {} as T) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getGenesis"],
		queryFn: () => client.genesis().do(),
		staleTime: Number.POSITIVE_INFINITY,
		cacheTime: Number.POSITIVE_INFINITY,
		...options,
	};
}

/**
 * Get Application Box By Name Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {GetApplicationBoxByNameData} data Application and box name to look up.* @param {QueryOptions} [options] QueryOption overrides
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#getApplicationBoxByName
 */
export function getApplicationBoxByName<T>(
	client: Algodv2,
	data: GetApplicationBoxByNameData,
	options: T = {} as T,
) {
	const encoder = new TextEncoder();
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getApplicationBoxByName", data],
		queryFn: () =>
			client
				.getApplicationBoxByName(data.applicationId, encoder.encode(data.name))
				.do(),
		...options,
	};
}

/**
 * Get Application Boxes Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {GetApplicationBoxesData} data The application ID to look up.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#getApplicationBoxes
 */
export function getApplicationBoxes<T>(
	client: Algodv2,
	data: GetApplicationBoxesData,
	options: T = {} as T,
) {
	// TODO: .max()
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getApplicationBoxes", data],
		queryFn: () => client.getApplicationBoxes(data.applicationId).do(),
		...options,
	};
}

/**
 * Get Application By ID Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {GetApplicationByIdData} data The application ID to look up.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#getApplicationByID
 */
export function getApplicationById<T>(
	client: Algodv2,
	data: GetApplicationByIdData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getApplicationById", data],
		queryFn: () => client.getApplicationByID(data.applicationId).do(),
		...options,
	};
}

/**
 * Get Asset By ID Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {GetAssetByIdData} data The asset ID to look up.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#getAssetByID
 */
export function getAssetById<T>(
	client: Algodv2,
	data: GetAssetByIdData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getAssetById", data],
		queryFn: () => client.getAssetByID(data.assetId).do(),
		...options,
	};
}

/**
 * Get Block Hash Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {GetBlockHashData} data The round number to be searched for
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#getBlockHash
 */
export function getBlockHash<T>(
	client: Algodv2,
	data: GetBlockHashData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getBlockHash", data],
		queryFn: () => client.getBlockHash(data.round).do(),
		staleTime: Number.POSITIVE_INFINITY,
		cacheTime: Number.POSITIVE_INFINITY,
		...options,
	};
}

/**
 * Get Block Offset Timestamp Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#getBlockOffsetTimestamp
 */
export function getBlockTimeStampOffset<T>(
	client: Algodv2,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getBlockTimeStampOffset"],
		queryFn: () => client.getBlockOffsetTimestamp().do(),
		...options,
	};
}

/**
 * Get Ledger State Delta Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {GetLedgerStateDeltaData} data The round number to be searched for
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#getLedgerStateDelta
 */
export function getLedgerStateDelta<T>(
	client: Algodv2,
	data: GetLedgerStateDeltaData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getLedgerStateDelta", data],
		queryFn: () => client.getLedgerStateDelta(BigInt(data.round)).do(),
		...options,
	};
}

/**
 * Get Ledger State Delta For Transaction Group Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {GetLedgerStateDeltaForTransactionGroupData} data The transaction group ID to be searched for
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#getLedgerStateDeltaForTransactionGroup
 */
export function getLedgerStateDeltaForTransactionGroup<T>(
	client: Algodv2,
	data: GetLedgerStateDeltaForTransactionGroupData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [
			client.c.bc.baseURL.origin,
			"getLedgerStateDeltaForTransactionGroup",
			data,
		],
		queryFn: () => client.getLedgerStateDeltaForTransactionGroup(data.id).do(),
		...options,
	};
}

/**
 * Get Sync Round Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#getSyncRound
 */
export function getSyncRound<T>(client: Algodv2, options: T = {} as T) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getSyncRound"],
		queryFn: () => client.getSyncRound().do(),
		...options,
	};
}

/**
 * Get Transaction Group Ledger State Deltas For Round Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {GetTransactionGroupLedgerStateDeltasForRoundData} data The round number to be searched for
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#getTransactionGroupLedgerStateDeltasForRound
 */
export function getTransactionGroupLedgerStateDeltasForRound<T>(
	client: Algodv2,
	data: GetTransactionGroupLedgerStateDeltasForRoundData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [
			client.c.bc.baseURL.origin,
			"getTransactionGroupLedgerStateDeltasForRound",
			data,
		],
		queryFn: () =>
			client
				.getTransactionGroupLedgerStateDeltasForRound(BigInt(data.round))
				.do(),
		...options,
	};
}

/**
 * Get Transaction Params Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#getTransactionParams
 */
export function transactionParams<T>(client: Algodv2, options: T = {} as T) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "transactionParams"],
		queryFn: () => client.getTransactionParams().do(),
		...options,
	};
}

/**
 * Get Transaction Proof Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {GetTransactionProofData} data The transaction ID and round number to be searched for
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#getTransactionProof
 */
export function getTransactionProof<T>(
	client: Algodv2,
	data: GetTransactionProofData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getTransactionProof", data],
		queryFn: () => client.getTransactionProof(data.round, data.txid).do(),
		staleTime: Number.POSITIVE_INFINITY,
		cacheTime: Number.POSITIVE_INFINITY,
		...options,
	};
}

/**
 * Get Health Check Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#healthCheck
 */
export function healthCheck<T>(client: Algodv2, options: T = {} as T) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "healthCheck"],
		queryFn: () => client.healthCheck().do(),
		...options,
	};
}

/**
 * Get Pending Transactions By Address Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {GetPendingTransactionsByAddressData} data The address to look up.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#pendingTransactionByAddress
 */
export function getPendingTransactionsByAddress<T>(
	client: Algodv2,
	data: GetPendingTransactionsByAddressData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [
			client.c.bc.baseURL.origin,
			"getPendingTransactionsByAddress",
			data,
		],
		queryFn: () => client.pendingTransactionByAddress(data.address).do(),
		...options,
	};
}

/**
 * Get Pending Transaction Information Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {PendingTransactionInformationData} data The transaction ID to look up.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#pendingTransactionInformation
 */
export function pendingTransactionInformation<T>(
	client: Algodv2,
	data: PendingTransactionInformationData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [
			client.c.bc.baseURL.origin,
			"pendingTransactionInformation",
			data,
		],
		queryFn: () => client.pendingTransactionInformation(data.txid).do(),
		...options,
	};
}

/**
 * Get Pending Transactions Information Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#pendingTransactionsInformation
 */
export function getPendingTransactions<T>(
	client: Algodv2,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getPendingTransactions"],
		queryFn: () => client.pendingTransactionsInformation().do(),
		...options,
	};
}

/**
 * Get Ready Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#ready
 */
export function getReady<T>(client: Algodv2, options: T = {} as T) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getReady"],
		queryFn: () => client.ready().do(),
		...options,
	};
}

/**
 * Get Status Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#status
 */
export function getStatus<T>(client: Algodv2, options: T = {} as T) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getStatus"],
		queryFn: () => client.status().do(),
		...options,
	};
}

/**
 * Get Status After Block Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {WaitForBlockData} data The round number to be searched for
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#statusAfterBlock
 */
export function waitForBlock<T>(
	client: Algodv2,
	data: WaitForBlockData,
	options: T = {} as T,
) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "waitForBlock", data],
		queryFn: () => client.statusAfterBlock(data.round).do(),
		cacheTime: Number.POSITIVE_INFINITY,
		staleTime: Number.POSITIVE_INFINITY,
		...options,
	};
}

/**
 * Get Supply Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#supply
 */
export function getSupply<T>(client: Algodv2, options: T = {} as T) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getSupply"],
		queryFn: () => client.supply().do(),
		...options,
	};
}

/**
 * Get Versions Check Query Options
 *
 * @param {Algodv2} client The Algodv2 client to use.
 * @param {QueryOptions} [options] QueryOption overrides
 * @see https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html#versionsCheck
 */
export function getVersion<T>(client: Algodv2, options: T = {} as T) {
	return {
		//@ts-expect-error, access private baseURL
		queryKey: [client.c.bc.baseURL.origin, "getVersion"],
		queryFn: () => client.versionsCheck().do(),
		...options,
	};
}
