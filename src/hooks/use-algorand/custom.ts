import { getAssetById } from "@/hooks/use-algorand/core/algod.ts";
import { useQueries } from "@tanstack/react-query";
import { useWallet } from "@txnlab/use-wallet-react";

export function useAssets(assets: number[] | null) {
	const manager = useWallet();
	return useQueries({
		queries: assets
			? assets.map((assetId) => getAssetById(manager.algodClient, { assetId }))
			: [],
	});
}
