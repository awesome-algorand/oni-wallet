import { useHeartbeat } from "@/hooks/use-algorand/use-heartbeat.ts";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@txnlab/use-wallet-react";
import { useEffect, useMemo } from "react";
import { useVerifiedAssets } from "./use-pera";

export function usePrices() {
	const manager = useWallet();
	const network = manager.activeNetwork === "testnet" ? "testnet" : "mainnet";
	const url = `https://${network}.analytics.tinyman.org/api/v1/assets/prices/`;
	return useQuery({
		queryKey: [url],
		queryFn: async ({ signal }) =>
			await fetch(url, { signal }).then((r) => r.json()),
	});
}

export function usePrice(assetId: number) {
	const query = usePrices();
	const heartbeat = useHeartbeat();

	const data = useMemo<number | undefined>(() => {
		if (typeof query.data === "undefined") return query.data;
		return Object.keys(query.data)
			.filter((key) => Number.parseInt(key) === assetId)
			.map((key) => query.data[key]["price_in_usd"])[0];
	}, [query.data]);

	useEffect(() => {
		if (query.isSuccess && !query.isFetching && !query.isLoading)
			query.refetch();
	}, [heartbeat]);

	return {
		...query,
		data,
	};
}

export function useIconAssets() {
	const manager = useWallet();
	const query = useVerifiedAssets();
	return useMemo(() => {
		if (
			query.isLoading ||
			typeof query.data === "undefined" ||
			typeof query.data.results === "undefined"
		)
			return [];

		const iconAssets = (
			manager.activeNetwork === "mainnet" ? iconsSnapshot : iconsTestnet
		).data.allAssetIcons.edges.map(({ node }) => ({
			index: node.id,
			name: node.name,
			unitName: node.unitName,
			logo: node.icon.png,
		}));

		return iconAssets.filter((a) => {
			if (a.index === "0") return true;
			return query.data.results.some((b: any) => {
				return a.index === b["asset_id"].toString();
			});
		});
	}, [query]);
}

export const iconsTestnet = {
	data: {
		allAssetIcons: {
			edges: [
				{
					node: {
						id: "0",
						icon: {
							png: "https://asa-list.tinyman.org/assets/0/icon.png",
							svg: "https://asa-list.tinyman.org/assets/0/icon.svg",
						},
						name: "Algorand",
						unitName: "ALGO",
					},
				},
				{
					node: {
						id: "10458941",
						icon: {
							png: "https://asa-list.tinyman.org/assets/31566704/icon.png",
						},
						name: "USDC",
						unitName: "USDC",
					},
				},
			],
		},
	},
};

export const iconsSnapshot = {
	data: {
		allAssetIcons: {
			edges: [
				{
					node: {
						id: "0",
						icon: {
							png: "https://asa-list.tinyman.org/assets/0/icon.png",
							svg: "https://asa-list.tinyman.org/assets/0/icon.svg",
						},
						name: "Algorand",
						unitName: "ALGO",
					},
				},
				{
					node: {
						id: "163650",
						icon: {
							png: "https://asa-list.tinyman.org/assets/163650/icon.png",
							svg: "https://asa-list.tinyman.org/assets/163650/icon.svg",
						},
						name: "Asia Reserve Currency Coin",
						unitName: "ARCC",
					},
				},
				{
					node: {
						id: "312769",
						icon: {
							png: "https://asa-list.tinyman.org/assets/312769/icon.png",
							svg: "https://asa-list.tinyman.org/assets/312769/icon.svg",
						},
						name: "Tether USDt",
						unitName: "USDt",
					},
				},
				{
					node: {
						id: "2751733",
						icon: {
							png: "https://asa-list.tinyman.org/assets/2751733/icon.png",
							svg: "https://asa-list.tinyman.org/assets/2751733/icon.svg",
						},
						name: "Realio Token",
						unitName: "RIO",
					},
				},
				{
					node: {
						id: "2757561",
						icon: {
							png: "https://asa-list.tinyman.org/assets/2757561/icon.png",
							svg: "https://asa-list.tinyman.org/assets/2757561/icon.svg",
						},
						name: "realioUSD",
						unitName: "rUSD",
					},
				},
				{
					node: {
						id: "27165954",
						icon: {
							png: "https://asa-list.tinyman.org/assets/27165954/icon.png",
							svg: "https://asa-list.tinyman.org/assets/27165954/icon.svg",
						},
						name: "PLANET",
						unitName: "Planets",
					},
				},
				{
					node: {
						id: "31566704",
						icon: {
							png: "https://asa-list.tinyman.org/assets/31566704/icon.png",
							svg: "https://asa-list.tinyman.org/assets/31566704/icon.svg",
						},
						name: "USDC",
						unitName: "USDC",
					},
				},
				{
					node: {
						id: "137020565",
						icon: {
							png: "https://asa-list.tinyman.org/assets/137020565/icon.png",
							svg: "https://asa-list.tinyman.org/assets/137020565/icon.svg",
						},
						name: "Buy Token",
						unitName: "BUY",
					},
				},
				{
					node: {
						id: "137594422",
						icon: {
							png: "https://asa-list.tinyman.org/assets/137594422/icon.png",
							svg: "https://asa-list.tinyman.org/assets/137594422/icon.svg",
						},
						name: "HEADLINE",
						unitName: "HDL",
					},
				},
				{
					node: {
						id: "142838028",
						icon: {
							png: "https://asa-list.tinyman.org/assets/142838028/icon.png",
							svg: "https://asa-list.tinyman.org/assets/142838028/icon.svg",
						},
						name: "ALGO FAM TOKEN",
						unitName: "FAME",
					},
				},
				{
					node: {
						id: "181380658",
						icon: {
							png: "https://asa-list.tinyman.org/assets/181380658/icon.png",
							svg: "https://asa-list.tinyman.org/assets/181380658/icon.svg",
						},
						name: "Geography",
						unitName: "GEO",
					},
				},
				{
					node: {
						id: "187215017",
						icon: {
							png: "https://asa-list.tinyman.org/assets/187215017/icon.png",
							svg: "https://asa-list.tinyman.org/assets/187215017/icon.svg",
						},
						name: "WaveCoin",
						unitName: "WAVE",
					},
				},
				{
					node: {
						id: "226265212",
						icon: {
							png: "https://asa-list.tinyman.org/assets/226265212/icon.png",
							svg: "https://asa-list.tinyman.org/assets/226265212/icon.svg",
						},
						name: "AlgoNuts",
						unitName: "ACORN",
					},
				},
				{
					node: {
						id: "226701642",
						icon: {
							png: "https://asa-list.tinyman.org/assets/226701642/icon.png",
							svg: "https://asa-list.tinyman.org/assets/226701642/icon.svg",
						},
						name: "Yieldly",
						unitName: "YLDY",
					},
				},
				{
					node: {
						id: "227358511",
						icon: {
							png: "https://asa-list.tinyman.org/assets/227358511/icon.png",
							svg: "https://asa-list.tinyman.org/assets/227358511/icon.svg",
						},
						name: "ALGore",
						unitName: "ALGR",
					},
				},
				{
					node: {
						id: "227855942",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/09/14/9b71923777224a7ba953d226ce404e3b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "STASIS EURO",
						unitName: "EURS",
					},
				},
				{
					node: {
						id: "230946361",
						icon: {
							png: "https://asa-list.tinyman.org/assets/230946361/icon.png",
							svg: "https://asa-list.tinyman.org/assets/230946361/icon.svg",
						},
						name: "AlgoGems",
						unitName: "GEMS",
					},
				},
				{
					node: {
						id: "231880341",
						icon: {
							png: "https://asa-list.tinyman.org/assets/231880341/icon.png",
							svg: "https://asa-list.tinyman.org/assets/231880341/icon.svg",
						},
						name: "LMX",
						unitName: "lmx",
					},
				},
				{
					node: {
						id: "233939122",
						icon: {
							png: "https://asa-list.tinyman.org/assets/233939122/icon.png",
							svg: "https://asa-list.tinyman.org/assets/233939122/icon.svg",
						},
						name: "AlgoWorld Token",
						unitName: "AWT",
					},
				},
				{
					node: {
						id: "234994096",
						icon: {
							png: "https://asa-list.tinyman.org/assets/234994096/icon.png",
							svg: "https://asa-list.tinyman.org/assets/234994096/icon.svg",
						},
						name: "Matrix",
						unitName: "MTRX",
					},
				},
				{
					node: {
						id: "239444645",
						icon: {
							png: "https://asa-list.tinyman.org/assets/239444645/icon.png",
							svg: "https://asa-list.tinyman.org/assets/239444645/icon.svg",
						},
						name: "Kaafila",
						unitName: "KFL",
					},
				},
				{
					node: {
						id: "242346016",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/05/20/8aae3e0d252445aaa5f5b909c95a0917.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AB2 Gallery Verify",
						unitName: "AB2-V",
					},
				},
				{
					node: {
						id: "246516580",
						icon: {
							png: "https://asa-list.tinyman.org/assets/246516580/icon.png",
							svg: "https://asa-list.tinyman.org/assets/246516580/icon.svg",
						},
						name: "Meld Gold (g)",
						unitName: "GOLD$",
					},
				},
				{
					node: {
						id: "246519683",
						icon: {
							png: "https://asa-list.tinyman.org/assets/246519683/icon.png",
							svg: "https://asa-list.tinyman.org/assets/246519683/icon.svg",
						},
						name: "Meld Silver (g)",
						unitName: "SILVER$",
					},
				},
				{
					node: {
						id: "251014570",
						icon: {
							png: "https://asa-list.tinyman.org/assets/251014570/icon.png",
							svg: "https://asa-list.tinyman.org/assets/251014570/icon.svg",
						},
						name: "Blocks",
						unitName: "Block",
					},
				},
				{
					node: {
						id: "263891752",
						icon: {
							png: "https://asa-list.tinyman.org/assets/263891752/icon.png",
							svg: "https://asa-list.tinyman.org/assets/263891752/icon.svg",
						},
						name: "Meld Platinum (g)",
						unitName: "PLAT$",
					},
				},
				{
					node: {
						id: "263893023",
						icon: {
							png: "https://asa-list.tinyman.org/assets/263893023/icon.png",
							svg: "https://asa-list.tinyman.org/assets/263893023/icon.svg",
						},
						name: "Meld Palladium (g)",
						unitName: "PALD$",
					},
				},
				{
					node: {
						id: "266846137",
						icon: {
							png: "https://asa-list.tinyman.org/assets/266846137/icon.png",
							svg: "https://asa-list.tinyman.org/assets/266846137/icon.svg",
						},
						name: "SIGN.NET",
						unitName: "SIGN",
					},
				},
				{
					node: {
						id: "281003266",
						icon: {
							png: "https://asa-list.tinyman.org/assets/281003266/icon.png",
							svg: "https://asa-list.tinyman.org/assets/281003266/icon.svg",
						},
						name: "NFT Grocery Store Coupon 🎫",
						unitName: "Coup🎫",
					},
				},
				{
					node: {
						id: "281779305",
						icon: {
							png: "https://asa-list.tinyman.org/assets/281779305/icon.png",
							svg: "https://asa-list.tinyman.org/assets/281779305/icon.svg",
						},
						name: "Osmiridian ",
						unitName: "OSM",
					},
				},
				{
					node: {
						id: "283820866",
						icon: {
							png: "https://asa-list.tinyman.org/assets/283820866/icon.png",
							svg: "https://asa-list.tinyman.org/assets/283820866/icon.svg",
						},
						name: "Xfinite Entertainment Token",
						unitName: "XET",
					},
				},
				{
					node: {
						id: "287867876",
						icon: {
							png: "https://asa-list.tinyman.org/assets/287867876/icon.png",
							svg: "https://asa-list.tinyman.org/assets/287867876/icon.svg",
						},
						name: "Opulous",
						unitName: "OPUL",
					},
				},
				{
					node: {
						id: "291248873",
						icon: {
							png: "https://asa-list.tinyman.org/assets/291248873/icon.png",
							svg: "https://asa-list.tinyman.org/assets/291248873/icon.svg",
						},
						name: "F2E SHARES",
						unitName: "F2E",
					},
				},
				{
					node: {
						id: "293547785",
						icon: {
							png: "https://asa-list.tinyman.org/assets/293547785/icon.png",
							svg: "https://asa-list.tinyman.org/assets/293547785/icon.svg",
						},
						name: "DisagioCoin",
						unitName: "DSGC",
					},
				},
				{
					node: {
						id: "297081422",
						icon: {
							png: "https://asa-list.tinyman.org/assets/297081422/icon.png",
							svg: "https://asa-list.tinyman.org/assets/297081422/icon.svg",
						},
						name: "TubbyCoin",
						unitName: "BigHugs",
					},
				},
				{
					node: {
						id: "297995609",
						icon: {
							png: "https://asa-list.tinyman.org/assets/297995609/icon.png",
							svg: "https://asa-list.tinyman.org/assets/297995609/icon.svg",
						},
						name: "Choice Coin",
						unitName: "Choice",
					},
				},
				{
					node: {
						id: "300208676",
						icon: {
							png: "https://asa-list.tinyman.org/assets/300208676/icon.png",
							svg: "https://asa-list.tinyman.org/assets/300208676/icon.svg",
						},
						name: "Smile Coin",
						unitName: "SMILE",
					},
				},
				{
					node: {
						id: "305992851",
						icon: {
							png: "https://asa-list.tinyman.org/assets/305992851/icon.png",
							svg: "https://asa-list.tinyman.org/assets/305992851/icon.svg",
						},
						name: "Algoneer",
						unitName: "AGNR",
					},
				},
				{
					node: {
						id: "310014962",
						icon: {
							png: "https://asa-list.tinyman.org/assets/310014962/icon.png",
							svg: "https://asa-list.tinyman.org/assets/310014962/icon.svg",
						},
						name: "AlcheCoin",
						unitName: "ALCH",
					},
				},
				{
					node: {
						id: "317264620",
						icon: {
							png: "https://asa-list.tinyman.org/assets/317264620/icon.png",
							svg: "https://asa-list.tinyman.org/assets/317264620/icon.svg",
						},
						name: "Freckle VIP",
						unitName: "FRKL_VIP",
					},
				},
				{
					node: {
						id: "317670428",
						icon: {
							png: "https://asa-list.tinyman.org/assets/317670428/icon.png",
							svg: "https://asa-list.tinyman.org/assets/317670428/icon.svg",
						},
						name: "Zenny",
						unitName: "ZENI",
					},
				},
				{
					node: {
						id: "319473667",
						icon: {
							png: "https://asa-list.tinyman.org/assets/319473667/icon.png",
							svg: "https://asa-list.tinyman.org/assets/319473667/icon.svg",
						},
						name: "Curator Coin",
						unitName: "CURATOR",
					},
				},
				{
					node: {
						id: "327821015",
						icon: {
							png: "https://asa-list.tinyman.org/assets/327821015/icon.png",
							svg: "https://asa-list.tinyman.org/assets/327821015/icon.svg",
						},
						name: "PEP",
						unitName: "PEP",
					},
				},
				{
					node: {
						id: "328124067",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/11/16/45328e736d3d4cfba16284c9879e5566.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "CC Token",
						unitName: "CC",
					},
				},
				{
					node: {
						id: "329110405",
						icon: {
							png: "https://asa-list.tinyman.org/assets/329110405/icon.png",
							svg: "https://asa-list.tinyman.org/assets/329110405/icon.svg",
						},
						name: "TacoCoin",
						unitName: "Tacos",
					},
				},
				{
					node: {
						id: "330109984",
						icon: {
							png: "https://asa-list.tinyman.org/assets/330109984/icon.png",
							svg: "https://asa-list.tinyman.org/assets/330109984/icon.svg",
						},
						name: "CoMManDCoin",
						unitName: "comand",
					},
				},
				{
					node: {
						id: "330168845",
						icon: {
							png: "https://asa-list.tinyman.org/assets/330168845/icon.png",
							svg: "https://asa-list.tinyman.org/assets/330168845/icon.svg",
						},
						name: "KryptoNurd",
						unitName: "NURD",
					},
				},
				{
					node: {
						id: "338444324",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/01/29/a7ca67d371cd430e94c27eada34cd985.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AlgoWIFI",
						unitName: "AWIFI",
					},
				},
				{
					node: {
						id: "338543684",
						icon: {
							png: "https://asa-list.tinyman.org/assets/338543684/icon.png",
							svg: "https://asa-list.tinyman.org/assets/338543684/icon.svg",
						},
						name: "NCoin",
						unitName: "NCOINA",
					},
				},
				{
					node: {
						id: "352658929",
						icon: {
							png: "https://asa-list.tinyman.org/assets/352658929/icon.png",
							svg: "https://asa-list.tinyman.org/assets/352658929/icon.svg",
						},
						name: "AlgoDoggo",
						unitName: "Doggo",
					},
				},
				{
					node: {
						id: "353409462",
						icon: {
							png: "https://asa-list.tinyman.org/assets/353409462/icon.png",
							svg: "https://asa-list.tinyman.org/assets/353409462/icon.svg",
						},
						name: "AlgoBasket",
						unitName: "ABSKT",
					},
				},
				{
					node: {
						id: "359487296",
						icon: {
							png: "https://asa-list.tinyman.org/assets/359487296/icon.png",
							svg: "https://asa-list.tinyman.org/assets/359487296/icon.svg",
						},
						name: "aDOGE",
						unitName: "aDOGE",
					},
				},
				{
					node: {
						id: "361339277",
						icon: {
							png: "https://asa-list.tinyman.org/assets/361339277/icon.png",
							svg: "https://asa-list.tinyman.org/assets/361339277/icon.svg",
						},
						name: "SQDC",
						unitName: "Squid",
					},
				},
				{
					node: {
						id: "361671874",
						icon: {
							png: "https://asa-list.tinyman.org/assets/361671874/icon.png",
							svg: "https://asa-list.tinyman.org/assets/361671874/icon.svg",
						},
						name: "KittenCoin",
						unitName: "KTNC",
					},
				},
				{
					node: {
						id: "361806984",
						icon: {
							png: "https://asa-list.tinyman.org/assets/361806984/icon.png",
							svg: "https://asa-list.tinyman.org/assets/361806984/icon.svg",
						},
						name: "AlgoMeow",
						unitName: "MEOW",
					},
				},
				{
					node: {
						id: "361940410",
						icon: {
							png: "https://asa-list.tinyman.org/assets/361940410/icon.png",
							svg: "https://asa-list.tinyman.org/assets/361940410/icon.svg",
						},
						name: "FairMeme Token",
						unitName: "FairMeme",
					},
				},
				{
					node: {
						id: "366511140",
						icon: {
							png: "https://asa-list.tinyman.org/assets/366511140/icon.png",
							svg: "https://asa-list.tinyman.org/assets/366511140/icon.svg",
						},
						name: "FairMeme AlgoLocker",
						unitName: "FMA",
					},
				},
				{
					node: {
						id: "367029007",
						icon: {
							png: "https://asa-list.tinyman.org/assets/367029007/icon.png",
							svg: "https://asa-list.tinyman.org/assets/367029007/icon.svg",
						},
						name: "DeafCoin",
						unitName: "DEAF",
					},
				},
				{
					node: {
						id: "367058172",
						icon: {
							png: "https://asa-list.tinyman.org/assets/367058172/icon.png",
							svg: "https://asa-list.tinyman.org/assets/367058172/icon.svg",
						},
						name: "Realio Network LTD",
						unitName: "RST",
					},
				},
				{
					node: {
						id: "370073176",
						icon: {
							png: "https://asa-list.tinyman.org/assets/370073176/icon.png",
							svg: "https://asa-list.tinyman.org/assets/370073176/icon.svg",
						},
						name: "Hest",
						unitName: "HS",
					},
				},
				{
					node: {
						id: "372666897",
						icon: {
							png: "https://asa-list.tinyman.org/assets/372666897/icon.png",
							svg: "https://asa-list.tinyman.org/assets/372666897/icon.svg",
						},
						name: "LionCoin",
						unitName: "Lions",
					},
				},
				{
					node: {
						id: "373760850",
						icon: {
							png: "https://asa-list.tinyman.org/assets/373760850/icon.png",
							svg: "https://asa-list.tinyman.org/assets/373760850/icon.svg",
						},
						name: "Christmas Coin",
						unitName: "xmas",
					},
				},
				{
					node: {
						id: "378382099",
						icon: {
							png: "https://asa-list.tinyman.org/assets/378382099/icon.png",
							svg: "https://asa-list.tinyman.org/assets/378382099/icon.svg",
						},
						name: "Tinychart Token",
						unitName: "TINY",
					},
				},
				{
					node: {
						id: "382781470",
						icon: {
							png: "https://asa-list.tinyman.org/assets/382781470/icon.png",
							svg: "https://asa-list.tinyman.org/assets/382781470/icon.svg",
						},
						name: "BANAAN",
						unitName: "BANAAN",
					},
				},
				{
					node: {
						id: "383581973",
						icon: {
							png: "https://asa-list.tinyman.org/assets/383581973/icon.png",
							svg: "https://asa-list.tinyman.org/assets/383581973/icon.svg",
						},
						name: "XBULL",
						unitName: "XBULL",
					},
				},
				{
					node: {
						id: "384303832",
						icon: {
							png: "https://asa-list.tinyman.org/assets/384303832/icon.png",
							svg: "https://asa-list.tinyman.org/assets/384303832/icon.svg",
						},
						name: "AKITA INU TOKEN",
						unitName: "AKITA",
					},
				},
				{
					node: {
						id: "386192725",
						icon: {
							png: "https://asa-list.tinyman.org/assets/386192725/icon.png",
							svg: "https://asa-list.tinyman.org/assets/386192725/icon.svg",
						},
						name: "goBTC",
						unitName: "goBTC",
					},
				},
				{
					node: {
						id: "386195940",
						icon: {
							png: "https://asa-list.tinyman.org/assets/386195940/icon.png",
							svg: "https://asa-list.tinyman.org/assets/386195940/icon.svg",
						},
						name: "goETH",
						unitName: "goETH",
					},
				},
				{
					node: {
						id: "387246614",
						icon: {
							png: "https://asa-list.tinyman.org/assets/387246614/icon.png",
							svg: "https://asa-list.tinyman.org/assets/387246614/icon.svg",
						},
						name: "Circanomics Token",
						unitName: "CIRCA",
					},
				},
				{
					node: {
						id: "388502764",
						icon: {
							png: "https://asa-list.tinyman.org/assets/388502764/icon.png",
							svg: "https://asa-list.tinyman.org/assets/388502764/icon.svg",
						},
						name: "Svansy Coin",
						unitName: "SVANSY",
					},
				},
				{
					node: {
						id: "388505064",
						icon: {
							png: "https://asa-list.tinyman.org/assets/388505064/icon.png",
							svg: "https://asa-list.tinyman.org/assets/388505064/icon.svg",
						},
						name: "AlgoShibaInu",
						unitName: "aSHIB",
					},
				},
				{
					node: {
						id: "388592191",
						icon: {
							png: "https://asa-list.tinyman.org/assets/388592191/icon.png",
							svg: "https://asa-list.tinyman.org/assets/388592191/icon.svg",
						},
						name: "Chips",
						unitName: "chip",
					},
				},
				{
					node: {
						id: "389294682",
						icon: {
							png: "https://asa-list.tinyman.org/assets/389294682/icon.png",
							svg: "https://asa-list.tinyman.org/assets/389294682/icon.svg",
						},
						name: "Numbers Token",
						unitName: "NT",
					},
				},
				{
					node: {
						id: "390982964",
						icon: {
							png: "https://asa-list.tinyman.org/assets/390982964/icon.png",
							svg: "https://asa-list.tinyman.org/assets/390982964/icon.svg",
						},
						name: "Algo MoonBoi",
						unitName: "MOONBOI",
					},
				},
				{
					node: {
						id: "391379500",
						icon: {
							png: "https://asa-list.tinyman.org/assets/391379500/icon.png",
							svg: "https://asa-list.tinyman.org/assets/391379500/icon.svg",
						},
						name: "Dope Panda",
						unitName: "DPANDA",
					},
				},
				{
					node: {
						id: "393155456",
						icon: {
							png: "https://asa-list.tinyman.org/assets/393155456/icon.png",
							svg: "https://asa-list.tinyman.org/assets/393155456/icon.svg",
						},
						name: "Clean Ocean Token",
						unitName: "FISH",
					},
				},
				{
					node: {
						id: "393495312",
						icon: {
							png: "https://asa-list.tinyman.org/assets/393495312/icon.png",
							svg: "https://asa-list.tinyman.org/assets/393495312/icon.svg",
						},
						name: "Algorand Faucet Drops",
						unitName: "AFD",
					},
				},
				{
					node: {
						id: "393498731",
						icon: {
							png: "https://asa-list.tinyman.org/assets/393498731/icon.png",
							svg: "https://asa-list.tinyman.org/assets/393498731/icon.svg",
						},
						name: "Gramo",
						unitName: "GRAMO",
					},
				},
				{
					node: {
						id: "393537671",
						icon: {
							png: "https://asa-list.tinyman.org/assets/393537671/icon.png",
							svg: "https://asa-list.tinyman.org/assets/393537671/icon.svg",
						},
						name: "ASA Stats Token",
						unitName: "ASASTATS",
					},
				},
				{
					node: {
						id: "394014424",
						icon: {
							png: "https://asa-list.tinyman.org/assets/394014424/icon.png",
							svg: "https://asa-list.tinyman.org/assets/394014424/icon.svg",
						},
						name: "ToolsX",
						unitName: "ToolsX",
					},
				},
				{
					node: {
						id: "394904431",
						icon: {
							png: "https://asa-list.tinyman.org/assets/394904431/icon.png",
							svg: "https://asa-list.tinyman.org/assets/394904431/icon.svg",
						},
						name: "AlgorandDoge",
						unitName: "Pup",
					},
				},
				{
					node: {
						id: "396841550",
						icon: {
							png: "https://asa-list.tinyman.org/assets/396841550/icon.png",
							svg: "https://asa-list.tinyman.org/assets/396841550/icon.svg",
						},
						name: "Givechain",
						unitName: "GCCT",
					},
				},
				{
					node: {
						id: "397111682",
						icon: {
							png: "https://asa-list.tinyman.org/assets/397111682/icon.png",
							svg: "https://asa-list.tinyman.org/assets/397111682/icon.svg",
						},
						name: "ALGO AVOCADO",
						unitName: "$AVO",
					},
				},
				{
					node: {
						id: "397628309",
						icon: {
							png: "https://asa-list.tinyman.org/assets/397628309/icon.png",
							svg: "https://asa-list.tinyman.org/assets/397628309/icon.svg",
						},
						name: "PEAR",
						unitName: "PEAR",
					},
				},
				{
					node: {
						id: "397629052",
						icon: {
							png: "https://asa-list.tinyman.org/assets/397629052/icon.png",
							svg: "https://asa-list.tinyman.org/assets/397629052/icon.svg",
						},
						name: "APPLE",
						unitName: "APPLE",
					},
				},
				{
					node: {
						id: "399383365",
						icon: {
							png: "https://asa-list.tinyman.org/assets/399383365/icon.png",
							svg: "https://asa-list.tinyman.org/assets/399383365/icon.svg",
						},
						name: "MDLc",
						unitName: "MDLc",
					},
				},
				{
					node: {
						id: "400295506",
						icon: {
							png: "https://asa-list.tinyman.org/assets/400295506/icon.png",
							svg: "https://asa-list.tinyman.org/assets/400295506/icon.svg",
						},
						name: "Tosa Inu",
						unitName: "TOSA",
					},
				},
				{
					node: {
						id: "400593267",
						icon: {
							png: "https://asa-list.tinyman.org/assets/400593267/icon.png",
							svg: "https://asa-list.tinyman.org/assets/400593267/icon.svg",
						},
						name: "DeFi-nite",
						unitName: "Finite",
					},
				},
				{
					node: {
						id: "401752010",
						icon: {
							png: "https://asa-list.tinyman.org/assets/401752010/icon.png",
							svg: "https://asa-list.tinyman.org/assets/401752010/icon.svg",
						},
						name: "Blapu",
						unitName: "BLAPU",
					},
				},
				{
					node: {
						id: "402495345",
						icon: {
							png: "https://asa-list.tinyman.org/assets/402495345/icon.png",
							svg: "https://asa-list.tinyman.org/assets/402495345/icon.svg",
						},
						name: "DrinkItWriteIt",
						unitName: "CHEERS",
					},
				},
				{
					node: {
						id: "403292234",
						icon: {
							png: "https://asa-list.tinyman.org/assets/403292234/icon.png",
							svg: "https://asa-list.tinyman.org/assets/403292234/icon.svg",
						},
						name: "ASA AKIRA",
						unitName: "DP69",
					},
				},
				{
					node: {
						id: "403499324",
						icon: {
							png: "https://asa-list.tinyman.org/assets/403499324/icon.png",
							svg: "https://asa-list.tinyman.org/assets/403499324/icon.svg",
						},
						name: "Nexus",
						unitName: "GP",
					},
				},
				{
					node: {
						id: "404044168",
						icon: {
							png: "https://asa-list.tinyman.org/assets/404044168/icon.png",
							svg: "https://asa-list.tinyman.org/assets/404044168/icon.svg",
						},
						name: "NEKOIN",
						unitName: "Nekos",
					},
				},
				{
					node: {
						id: "406361925",
						icon: {
							png: "https://asa-list.tinyman.org/assets/406361925/icon.png",
							svg: "https://asa-list.tinyman.org/assets/406361925/icon.svg",
						},
						name: "Kitsune Inu",
						unitName: "KITSU",
					},
				},
				{
					node: {
						id: "406383570",
						icon: {
							png: "https://asa-list.tinyman.org/assets/406383570/icon.png",
							svg: "https://asa-list.tinyman.org/assets/406383570/icon.svg",
						},
						name: "Flamingo Coin",
						unitName: "FLAMINGO",
					},
				},
				{
					node: {
						id: "408177774",
						icon: {
							png: "https://asa-list.tinyman.org/assets/408177774/icon.png",
							svg: "https://asa-list.tinyman.org/assets/408177774/icon.svg",
						},
						name: "Deli Coin",
						unitName: "DELI",
					},
				},
				{
					node: {
						id: "408200080",
						icon: {
							png: "https://asa-list.tinyman.org/assets/408200080/icon.png",
							svg: "https://asa-list.tinyman.org/assets/408200080/icon.svg",
						},
						name: "Raise Your Dongers",
						unitName: "DONGER",
					},
				},
				{
					node: {
						id: "408898501",
						icon: {
							png: "https://asa-list.tinyman.org/assets/408898501/icon.png",
							svg: "https://asa-list.tinyman.org/assets/408898501/icon.svg",
						},
						name: "Loot Box",
						unitName: "LTBX",
					},
				},
				{
					node: {
						id: "409283233",
						icon: {
							png: "https://asa-list.tinyman.org/assets/409283233/icon.png",
							svg: "https://asa-list.tinyman.org/assets/409283233/icon.svg",
						},
						name: "Cow",
						unitName: "Cow",
					},
				},
				{
					node: {
						id: "409604194",
						icon: {
							png: "https://asa-list.tinyman.org/assets/409604194/icon.png",
							svg: "https://asa-list.tinyman.org/assets/409604194/icon.svg",
						},
						name: "AlgOcean",
						unitName: "AO",
					},
				},
				{
					node: {
						id: "411521263",
						icon: {
							png: "https://asa-list.tinyman.org/assets/411521263/icon.png",
							svg: "https://asa-list.tinyman.org/assets/411521263/icon.svg",
						},
						name: "Dungeon Gold",
						unitName: "dAGR",
					},
				},
				{
					node: {
						id: "412056867",
						icon: {
							png: "https://asa-list.tinyman.org/assets/412056867/icon.png",
							svg: "https://asa-list.tinyman.org/assets/412056867/icon.svg",
						},
						name: "Shosha",
						unitName: "SHSA",
					},
				},
				{
					node: {
						id: "413153825",
						icon: {
							png: "https://asa-list.tinyman.org/assets/413153825/icon.png",
							svg: "https://asa-list.tinyman.org/assets/413153825/icon.svg",
						},
						name: "Red Panda ASA",
						unitName: "RPA",
					},
				},
				{
					node: {
						id: "415045633",
						icon: {
							png: "https://asa-list.tinyman.org/assets/415045633/icon.png",
							svg: "https://asa-list.tinyman.org/assets/415045633/icon.svg",
						},
						name: "Parsec",
						unitName: "PRSC",
					},
				},
				{
					node: {
						id: "416737271",
						icon: {
							png: "https://asa-list.tinyman.org/assets/416737271/icon.png",
							svg: "https://asa-list.tinyman.org/assets/416737271/icon.svg",
						},
						name: "Lunar Coin",
						unitName: "LUNAR",
					},
				},
				{
					node: {
						id: "417708610",
						icon: {
							png: "https://asa-list.tinyman.org/assets/417708610/icon.png",
							svg: "https://asa-list.tinyman.org/assets/417708610/icon.svg",
						},
						name: "DEGEN Token",
						unitName: "DEGEN",
					},
				},
				{
					node: {
						id: "421281844",
						icon: {
							png: "https://asa-list.tinyman.org/assets/421281844/icon.png",
							svg: "https://asa-list.tinyman.org/assets/421281844/icon.svg",
						},
						name: "tinybots",
						unitName: "TBOTS",
					},
				},
				{
					node: {
						id: "423448944",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/12/21/145fa8f5026f40c2b2ed0743abb69c09.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "GoSayHELLO App",
						unitName: "$HELLO",
					},
				},
				{
					node: {
						id: "426526699",
						icon: {
							png: "https://asa-list.tinyman.org/assets/426526699/icon.png",
							svg: "https://asa-list.tinyman.org/assets/426526699/icon.svg",
						},
						name: "Adventure Coin",
						unitName: "ADVENTUR",
					},
				},
				{
					node: {
						id: "426980914",
						icon: {
							png: "https://asa-list.tinyman.org/assets/426980914/icon.png",
							svg: "https://asa-list.tinyman.org/assets/426980914/icon.svg",
						},
						name: "Raptor Coin",
						unitName: "RCOIN",
					},
				},
				{
					node: {
						id: "428939741",
						icon: {
							png: "https://asa-list.tinyman.org/assets/428939741/icon.png",
							svg: "https://asa-list.tinyman.org/assets/428939741/icon.svg",
						},
						name: "Gubbermint",
						unitName: "DEBT",
					},
				},
				{
					node: {
						id: "430838314",
						icon: {
							png: "https://asa-list.tinyman.org/assets/430838314/icon.png",
							svg: "https://asa-list.tinyman.org/assets/430838314/icon.svg",
						},
						name: "Astrocat",
						unitName: "ACAT",
					},
				},
				{
					node: {
						id: "432975976",
						icon: {
							png: "https://asa-list.tinyman.org/assets/432975976/icon.png",
							svg: "https://asa-list.tinyman.org/assets/432975976/icon.svg",
						},
						name: "Commie Coin",
						unitName: "USSR",
					},
				},
				{
					node: {
						id: "433379445",
						icon: {
							png: "https://asa-list.tinyman.org/assets/433379445/icon.png",
							svg: "https://asa-list.tinyman.org/assets/433379445/icon.svg",
						},
						name: "SUPERIO",
						unitName: "SUPER",
					},
				},
				{
					node: {
						id: "433466405",
						icon: {
							png: "https://asa-list.tinyman.org/assets/433466405/icon.png",
							svg: "https://asa-list.tinyman.org/assets/433466405/icon.svg",
						},
						name: "PuddinPoints",
						unitName: "Puddin",
					},
				},
				{
					node: {
						id: "434833101",
						icon: {
							png: "https://asa-list.tinyman.org/assets/434833101/icon.png",
							svg: "https://asa-list.tinyman.org/assets/434833101/icon.svg",
						},
						name: "PURA VIDA",
						unitName: "VIDA",
					},
				},
				{
					node: {
						id: "435335235",
						icon: {
							png: "https://asa-list.tinyman.org/assets/435335235/icon.png",
							svg: "https://asa-list.tinyman.org/assets/435335235/icon.svg",
						},
						name: "Crescendo",
						unitName: "CRSD",
					},
				},
				{
					node: {
						id: "441139422",
						icon: {
							png: "https://asa-list.tinyman.org/assets/441139422/icon.png",
							svg: "https://asa-list.tinyman.org/assets/441139422/icon.svg",
						},
						name: "goMINT",
						unitName: "goMINT",
					},
				},
				{
					node: {
						id: "442533843",
						icon: {
							png: "https://asa-list.tinyman.org/assets/442533843/icon.png",
							svg: "https://asa-list.tinyman.org/assets/442533843/icon.svg",
						},
						name: "Jam Coin",
						unitName: "JAM",
					},
				},
				{
					node: {
						id: "442594211",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/06/14/aad03647b0f446f781cf60b9a7eba030.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Prismatic",
						unitName: "PRISM",
					},
				},
				{
					node: {
						id: "444035862",
						icon: {
							png: "https://asa-list.tinyman.org/assets/444035862/icon.png",
							svg: "https://asa-list.tinyman.org/assets/444035862/icon.svg",
						},
						name: "ZONE",
						unitName: "ZONE",
					},
				},
				{
					node: {
						id: "444108880",
						icon: {
							png: "https://asa-list.tinyman.org/assets/444108880/icon.png",
							svg: "https://asa-list.tinyman.org/assets/444108880/icon.svg",
						},
						name: "CryptoTrees",
						unitName: "TREES",
					},
				},
				{
					node: {
						id: "444568464",
						icon: {
							png: "https://asa-list.tinyman.org/assets/444568464/icon.png",
							svg: "https://asa-list.tinyman.org/assets/444568464/icon.svg",
						},
						name: "Duckcoin",
						unitName: "QUACK",
					},
				},
				{
					node: {
						id: "445347483",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/02/27/b396f1cc7e4944bb8e4024a669467f06.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "CARE TOKEN",
						unitName: "CARE",
					},
				},
				{
					node: {
						id: "445362421",
						icon: {
							png: "https://asa-list.tinyman.org/assets/445362421/icon.png",
							svg: "https://asa-list.tinyman.org/assets/445362421/icon.svg",
						},
						name: "MAGMA",
						unitName: "MAGM",
					},
				},
				{
					node: {
						id: "445905873",
						icon: {
							png: "https://asa-list.tinyman.org/assets/445905873/icon.png",
							svg: "https://asa-list.tinyman.org/assets/445905873/icon.svg",
						},
						name: "AlgoLeagues Coin",
						unitName: "ALC",
					},
				},
				{
					node: {
						id: "446220964",
						icon: {
							png: "https://asa-list.tinyman.org/assets/446220964/icon.png",
							svg: "https://asa-list.tinyman.org/assets/446220964/icon.svg",
						},
						name: "Animal Style",
						unitName: "ANML",
					},
				},
				{
					node: {
						id: "447852812",
						icon: {
							png: "https://asa-list.tinyman.org/assets/447852812/icon.png",
							svg: "https://asa-list.tinyman.org/assets/447852812/icon.svg",
						},
						name: "ALGO LITE",
						unitName: "AL",
					},
				},
				{
					node: {
						id: "451401073",
						icon: {
							png: "https://asa-list.tinyman.org/assets/451401073/icon.png",
							svg: "https://asa-list.tinyman.org/assets/451401073/icon.svg",
						},
						name: "Project REX ",
						unitName: "REX ",
					},
				},
				{
					node: {
						id: "452047208",
						icon: {
							png: "https://asa-list.tinyman.org/assets/452047208/icon.png",
							svg: "https://asa-list.tinyman.org/assets/452047208/icon.svg",
						},
						name: "SockHODLER",
						unitName: "SOCKS",
					},
				},
				{
					node: {
						id: "452399768",
						icon: {
							png: "https://asa-list.tinyman.org/assets/452399768/icon.png",
							svg: "https://asa-list.tinyman.org/assets/452399768/icon.svg",
						},
						name: "Vote Coin",
						unitName: "Vote",
					},
				},
				{
					node: {
						id: "453816186",
						icon: {
							png: "https://asa-list.tinyman.org/assets/453816186/icon.png",
							svg: "https://asa-list.tinyman.org/assets/453816186/icon.svg",
						},
						name: "Aegir",
						unitName: "AGR",
					},
				},
				{
					node: {
						id: "455356741",
						icon: {
							png: "https://asa-list.tinyman.org/assets/455356741/icon.png",
							svg: "https://asa-list.tinyman.org/assets/455356741/icon.svg",
						},
						name: "NFTrade",
						unitName: "NFT",
					},
				},
				{
					node: {
						id: "456624580",
						icon: {
							png: "https://asa-list.tinyman.org/assets/456624580/icon.png",
							svg: "https://asa-list.tinyman.org/assets/456624580/icon.svg",
						},
						name: "Honeycomb",
						unitName: "HNYC",
					},
				},
				{
					node: {
						id: "457007402",
						icon: {
							png: "https://asa-list.tinyman.org/assets/457007402/icon.png",
							svg: "https://asa-list.tinyman.org/assets/457007402/icon.svg",
						},
						name: "DarkDragonWing",
						unitName: "DDW",
					},
				},
				{
					node: {
						id: "457205263",
						icon: {
							png: "https://asa-list.tinyman.org/assets/457205263/icon.png",
							svg: "https://asa-list.tinyman.org/assets/457205263/icon.svg",
						},
						name: "AIRSHO Coin",
						unitName: "AIRSHO",
					},
				},
				{
					node: {
						id: "460300915",
						icon: {
							png: "https://asa-list.tinyman.org/assets/460300915/icon.png",
							svg: "https://asa-list.tinyman.org/assets/460300915/icon.svg",
						},
						name: "LAHAR",
						unitName: "LHR",
					},
				},
				{
					node: {
						id: "461246798",
						icon: {
							png: "https://asa-list.tinyman.org/assets/461246798/icon.png",
							svg: "https://asa-list.tinyman.org/assets/461246798/icon.svg",
						},
						name: "RUSHCopper",
						unitName: "RUSHCOPR",
					},
				},
				{
					node: {
						id: "461849439",
						icon: {
							png: "https://asa-list.tinyman.org/assets/461849439/icon.png",
							svg: "https://asa-list.tinyman.org/assets/461849439/icon.svg",
						},
						name: "PariToken",
						unitName: "PARI",
					},
				},
				{
					node: {
						id: "463554836",
						icon: {
							png: "https://asa-list.tinyman.org/assets/463554836/icon.png",
							svg: "https://asa-list.tinyman.org/assets/463554836/icon.svg",
						},
						name: "AlgoFund",
						unitName: "ALGF",
					},
				},
				{
					node: {
						id: "465573604",
						icon: {
							png: "https://asa-list.tinyman.org/assets/465573604/icon.png",
							svg: "https://asa-list.tinyman.org/assets/465573604/icon.svg",
						},
						name: "Star Token",
						unitName: "STAR",
					},
				},
				{
					node: {
						id: "465865291",
						icon: {
							png: "https://asa-list.tinyman.org/assets/465865291/icon.png",
							svg: "https://asa-list.tinyman.org/assets/465865291/icon.svg",
						},
						name: "STBL",
						unitName: "STBL",
					},
				},
				{
					node: {
						id: "465984936",
						icon: {
							png: "https://asa-list.tinyman.org/assets/465984936/icon.png",
							svg: "https://asa-list.tinyman.org/assets/465984936/icon.svg",
						},
						name: "Foodie Coin",
						unitName: "FOODIE",
					},
				},
				{
					node: {
						id: "466716175",
						icon: {
							png: "https://asa-list.tinyman.org/assets/466716175/icon.png",
							svg: "https://asa-list.tinyman.org/assets/466716175/icon.svg",
						},
						name: "Angels Of Ares",
						unitName: "AoA",
					},
				},
				{
					node: {
						id: "467134640",
						icon: {
							png: "https://asa-list.tinyman.org/assets/467134640/icon.png",
							svg: "https://asa-list.tinyman.org/assets/467134640/icon.svg",
						},
						name: "RDinitiativ",
						unitName: "RDINI",
					},
				},
				{
					node: {
						id: "467518794",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/12/10/d58458a3ebd644ac89c202603a302210.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "LOLCatz 😻",
						unitName: "LOLZ",
					},
				},
				{
					node: {
						id: "470335962",
						icon: {
							png: "https://asa-list.tinyman.org/assets/470335962/icon.png",
							svg: "https://asa-list.tinyman.org/assets/470335962/icon.svg",
						},
						name: "balgo",
						unitName: "BALGO",
					},
				},
				{
					node: {
						id: "470842789",
						icon: {
							png: "https://asa-list.tinyman.org/assets/470842789/icon.png",
							svg: "https://asa-list.tinyman.org/assets/470842789/icon.svg",
						},
						name: "Defly Token",
						unitName: "DEFLY",
					},
				},
				{
					node: {
						id: "471005966",
						icon: {
							png: "https://asa-list.tinyman.org/assets/471005966/icon.png",
							svg: "https://asa-list.tinyman.org/assets/471005966/icon.svg",
						},
						name: "Gogolis Game Token",
						unitName: "GGT",
					},
				},
				{
					node: {
						id: "473180477",
						icon: {
							png: "https://asa-list.tinyman.org/assets/473180477/icon.png",
							svg: "https://asa-list.tinyman.org/assets/473180477/icon.svg",
						},
						name: "Coffee Beans",
						unitName: "BEAN",
					},
				},
				{
					node: {
						id: "478549868",
						icon: {
							png: "https://asa-list.tinyman.org/assets/478549868/icon.png",
							svg: "https://asa-list.tinyman.org/assets/478549868/icon.svg",
						},
						name: "BirdBot",
						unitName: "BIRDS",
					},
				},
				{
					node: {
						id: "478989144",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/12/15/3117d266a51d4e1faf65f668de91a753.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Sovrgn Farm Token",
						unitName: "SFT",
					},
				},
				{
					node: {
						id: "487231904",
						icon: {
							png: "https://asa-list.tinyman.org/assets/487231904/icon.png",
							svg: "https://asa-list.tinyman.org/assets/487231904/icon.svg",
						},
						name: "The Grand Token",
						unitName: "Grand",
					},
				},
				{
					node: {
						id: "498684064",
						icon: {
							png: "https://asa-list.tinyman.org/assets/498684064/icon.png",
							svg: "https://asa-list.tinyman.org/assets/498684064/icon.svg",
						},
						name: "BULO Coin",
						unitName: "BULO",
					},
				},
				{
					node: {
						id: "499213551",
						icon: {
							png: "https://asa-list.tinyman.org/assets/499213551/icon.png",
							svg: "https://asa-list.tinyman.org/assets/499213551/icon.svg",
						},
						name: "MariCoin",
						unitName: "MCOIN",
					},
				},
				{
					node: {
						id: "500105167",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/10/11/f90c868b0a84457f97694466188355c8.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Lagosrand",
						unitName: "LAGOS",
					},
				},
				{
					node: {
						id: "507472097",
						icon: {
							png: "https://asa-list.tinyman.org/assets/507472097/icon.png",
							svg: "https://asa-list.tinyman.org/assets/507472097/icon.svg",
						},
						name: "Inu Moo",
						unitName: "INUMOO",
					},
				},
				{
					node: {
						id: "509808838",
						icon: {
							png: "https://asa-list.tinyman.org/assets/509808838/icon.png",
							svg: "https://asa-list.tinyman.org/assets/509808838/icon.svg",
						},
						name: "Webblen",
						unitName: "WBLN",
					},
				},
				{
					node: {
						id: "510337930",
						icon: {
							png: "https://asa-list.tinyman.org/assets/510337930/icon.png",
							svg: "https://asa-list.tinyman.org/assets/510337930/icon.svg",
						},
						name: "🦴 Bones ASA 🦴",
						unitName: "Bones",
					},
				},
				{
					node: {
						id: "510647803",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/07/06/ef3518205365482bb26e85d29a0070cb.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "High Potential",
						unitName: "HiPo",
					},
				},
				{
					node: {
						id: "511028589",
						icon: {
							png: "https://asa-list.tinyman.org/assets/511028589/icon.png",
							svg: "https://asa-list.tinyman.org/assets/511028589/icon.svg",
						},
						name: "Jim Coin",
						unitName: "Jimmy",
					},
				},
				{
					node: {
						id: "511484048",
						icon: {
							png: "https://asa-list.tinyman.org/assets/511484048/icon.png",
							svg: "https://asa-list.tinyman.org/assets/511484048/icon.svg",
						},
						name: "AlgoStake",
						unitName: "STKE",
					},
				},
				{
					node: {
						id: "511491168",
						icon: {
							png: "https://asa-list.tinyman.org/assets/511491168/icon.png",
							svg: "https://asa-list.tinyman.org/assets/511491168/icon.svg",
						},
						name: "CujoToken",
						unitName: "Cujo",
					},
				},
				{
					node: {
						id: "514670697",
						icon: {
							png: "https://asa-list.tinyman.org/assets/514670697/icon.png",
							svg: "https://asa-list.tinyman.org/assets/514670697/icon.svg",
						},
						name: "Sober",
						unitName: "Sober",
					},
				},
				{
					node: {
						id: "515424632",
						icon: {
							png: "https://asa-list.tinyman.org/assets/515424632/icon.png",
							svg: "https://asa-list.tinyman.org/assets/515424632/icon.svg",
						},
						name: "Algo inu",
						unitName: "Inu",
					},
				},
				{
					node: {
						id: "518842364",
						icon: {
							png: "https://asa-list.tinyman.org/assets/518842364/icon.png",
							svg: "https://asa-list.tinyman.org/assets/518842364/icon.svg",
						},
						name: "Trilemma 2022",
						unitName: "KABOOM",
					},
				},
				{
					node: {
						id: "522963891",
						icon: {
							png: "https://asa-list.tinyman.org/assets/522963891/icon.png",
							svg: "https://asa-list.tinyman.org/assets/522963891/icon.svg",
						},
						name: "AlgoPatties",
						unitName: "Patties",
					},
				},
				{
					node: {
						id: "523605642",
						icon: {
							png: "https://asa-list.tinyman.org/assets/523605642/icon.png",
							svg: "https://asa-list.tinyman.org/assets/523605642/icon.svg",
						},
						name: "SeedBomb",
						unitName: "SEEDS",
					},
				},
				{
					node: {
						id: "523683256",
						icon: {
							png: "https://asa-list.tinyman.org/assets/523683256/icon.png",
							svg: "https://asa-list.tinyman.org/assets/523683256/icon.svg",
						},
						name: "AKITA INU",
						unitName: "AKTA",
					},
				},
				{
					node: {
						id: "535221681",
						icon: {
							png: "https://asa-list.tinyman.org/assets/535221681/icon.png",
							svg: "https://asa-list.tinyman.org/assets/535221681/icon.svg",
						},
						name: "MoonX",
						unitName: "MoonX",
					},
				},
				{
					node: {
						id: "540605589",
						icon: {
							png: "https://asa-list.tinyman.org/assets/540605589/icon.png",
							svg: "https://asa-list.tinyman.org/assets/540605589/icon.svg",
						},
						name: "AlgoVegas Casino Token",
						unitName: "AVCT",
					},
				},
				{
					node: {
						id: "542087210",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/05/25/2279e07dc2144ea6bbbd18e0ddcebeab.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Pact",
						unitName: "Pact",
					},
				},
				{
					node: {
						id: "542132831",
						icon: {
							png: "https://asa-list.tinyman.org/assets/542132831/icon.png",
							svg: "https://asa-list.tinyman.org/assets/542132831/icon.svg",
						},
						name: "ASA Portfolio",
						unitName: "APF",
					},
				},
				{
					node: {
						id: "542874179",
						icon: {
							png: "https://asa-list.tinyman.org/assets/542874179/icon.png",
							svg: "https://asa-list.tinyman.org/assets/542874179/icon.svg",
						},
						name: "Freckle",
						unitName: "FRKL",
					},
				},
				{
					node: {
						id: "544217506",
						icon: {
							png: "https://asa-list.tinyman.org/assets/544217506/icon.png",
							svg: "https://asa-list.tinyman.org/assets/544217506/icon.svg",
						},
						name: "Spindle Yarn",
						unitName: "YARN",
					},
				},
				{
					node: {
						id: "546354584",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/05/05/4648ee554b0d4c78827693f207596864.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Trust",
						unitName: "TRUST",
					},
				},
				{
					node: {
						id: "546713076",
						icon: {
							png: "https://asa-list.tinyman.org/assets/546713076/icon.png",
							svg: "https://asa-list.tinyman.org/assets/546713076/icon.svg",
						},
						name: "Parsec AU",
						unitName: "PRSCau",
					},
				},
				{
					node: {
						id: "547405153",
						icon: {
							png: "https://asa-list.tinyman.org/assets/547405153/icon.png",
							svg: "https://asa-list.tinyman.org/assets/547405153/icon.svg",
						},
						name: "FairMeme_Algo",
						unitName: "FMA",
					},
				},
				{
					node: {
						id: "547417573",
						icon: {
							png: "https://asa-list.tinyman.org/assets/547417573/icon.png",
							svg: "https://asa-list.tinyman.org/assets/547417573/icon.svg",
						},
						name: "FairMeme Token",
						unitName: "FMT",
					},
				},
				{
					node: {
						id: "551031469",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/08/17/214f6008691c4473833627b2403605e5.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Aquarius Fund",
						unitName: "AQF",
					},
				},
				{
					node: {
						id: "551903529",
						icon: {
							png: "https://asa-list.tinyman.org/assets/551903529/icon.png",
							svg: "https://asa-list.tinyman.org/assets/551903529/icon.svg",
						},
						name: "TinyLock V1.1",
						unitName: "TinyLock",
					},
				},
				{
					node: {
						id: "553615859",
						icon: {
							png: "https://asa-list.tinyman.org/assets/553615859/icon.png",
							svg: "https://asa-list.tinyman.org/assets/553615859/icon.svg",
						},
						name: "Alvacoin",
						unitName: "ALVA",
					},
				},
				{
					node: {
						id: "553651951",
						icon: {
							png: "https://asa-list.tinyman.org/assets/553651951/icon.png",
							svg: "https://asa-list.tinyman.org/assets/553651951/icon.svg",
						},
						name: "AlgoPlant",
						unitName: "PLANT",
					},
				},
				{
					node: {
						id: "553656096",
						icon: {
							png: "https://asa-list.tinyman.org/assets/553656096/icon.png",
							svg: "https://asa-list.tinyman.org/assets/553656096/icon.svg",
						},
						name: "KarbonX",
						unitName: "KBX",
					},
				},
				{
					node: {
						id: "554633918",
						icon: {
							png: "https://asa-list.tinyman.org/assets/554633918/icon.png",
							svg: "https://asa-list.tinyman.org/assets/554633918/icon.svg",
						},
						name: "Leaf",
						unitName: "Leaf",
					},
				},
				{
					node: {
						id: "555540865",
						icon: {
							png: "https://asa-list.tinyman.org/assets/555540865/icon.png",
							svg: "https://asa-list.tinyman.org/assets/555540865/icon.svg",
						},
						name: "80Acres",
						unitName: "ACRES",
					},
				},
				{
					node: {
						id: "557132195",
						icon: {
							png: "https://asa-list.tinyman.org/assets/557132195/icon.png",
							svg: "https://asa-list.tinyman.org/assets/557132195/icon.svg",
						},
						name: "AlgoRealm",
						unitName: "REAL",
					},
				},
				{
					node: {
						id: "558801604",
						icon: {
							png: "https://asa-list.tinyman.org/assets/558801604/icon.png",
							svg: "https://asa-list.tinyman.org/assets/558801604/icon.svg",
						},
						name: "PATRON",
						unitName: "PATRON",
					},
				},
				{
					node: {
						id: "558978094",
						icon: {
							png: "https://asa-list.tinyman.org/assets/558978094/icon.png",
							svg: "https://asa-list.tinyman.org/assets/558978094/icon.svg",
						},
						name: "Vybe",
						unitName: "VYBE",
					},
				},
				{
					node: {
						id: "559219992",
						icon: {
							png: "https://asa-list.tinyman.org/assets/559219992/icon.png",
							svg: "https://asa-list.tinyman.org/assets/559219992/icon.svg",
						},
						name: "Octorand",
						unitName: "OCTO",
					},
				},
				{
					node: {
						id: "559276904",
						icon: {
							png: "https://asa-list.tinyman.org/assets/559276904/icon.png",
							svg: "https://asa-list.tinyman.org/assets/559276904/icon.svg",
						},
						name: "Green",
						unitName: "GRN",
					},
				},
				{
					node: {
						id: "559611833",
						icon: {
							png: "https://asa-list.tinyman.org/assets/559611833/icon.png",
							svg: "https://asa-list.tinyman.org/assets/559611833/icon.svg",
						},
						name: "Survive The Dip",
						unitName: "STD",
					},
				},
				{
					node: {
						id: "560039769",
						icon: {
							png: "https://asa-list.tinyman.org/assets/560039769/icon.png",
							svg: "https://asa-list.tinyman.org/assets/560039769/icon.svg",
						},
						name: "Drakk",
						unitName: "$Drakk",
					},
				},
				{
					node: {
						id: "560412589",
						icon: {
							png: "https://asa-list.tinyman.org/assets/560412589/icon.png",
							svg: "https://asa-list.tinyman.org/assets/560412589/icon.svg",
						},
						name: "Wasp",
						unitName: "WASP",
					},
				},
				{
					node: {
						id: "560484052",
						icon: {
							png: "https://asa-list.tinyman.org/assets/560484052/icon.png",
							svg: "https://asa-list.tinyman.org/assets/560484052/icon.svg",
						},
						name: "CanadaMom",
						unitName: "MILF",
					},
				},
				{
					node: {
						id: "561127431",
						icon: {
							png: "https://asa-list.tinyman.org/assets/561127431/icon.png",
							svg: "https://asa-list.tinyman.org/assets/561127431/icon.svg",
						},
						name: "Joy",
						unitName: "JOY",
					},
				},
				{
					node: {
						id: "563579278",
						icon: {
							png: "https://asa-list.tinyman.org/assets/563579278/icon.png",
							svg: "https://asa-list.tinyman.org/assets/563579278/icon.svg",
						},
						name: "DJED",
						unitName: "DJED",
					},
				},
				{
					node: {
						id: "567485181",
						icon: {
							png: "https://asa-list.tinyman.org/assets/567485181/icon.png",
							svg: "https://asa-list.tinyman.org/assets/567485181/icon.svg",
						},
						name: "LOUDeFi",
						unitName: "LOUD",
					},
				},
				{
					node: {
						id: "568835243",
						icon: {
							png: "https://asa-list.tinyman.org/assets/568835243/icon.png",
							svg: "https://asa-list.tinyman.org/assets/568835243/icon.svg",
						},
						name: "LegoMyAlgo",
						unitName: "GoAlgo",
					},
				},
				{
					node: {
						id: "568879303",
						icon: {
							png: "https://asa-list.tinyman.org/assets/568879303/icon.png",
							svg: "https://asa-list.tinyman.org/assets/568879303/icon.svg",
						},
						name: "Karen Coin",
						unitName: "KRN",
					},
				},
				{
					node: {
						id: "569120128",
						icon: {
							png: "https://asa-list.tinyman.org/assets/569120128/icon.png",
							svg: "https://asa-list.tinyman.org/assets/569120128/icon.svg",
						},
						name: "AlgoScout Token",
						unitName: "SCOUT",
					},
				},
				{
					node: {
						id: "571576867",
						icon: {
							png: "https://asa-list.tinyman.org/assets/571576867/icon.png",
							svg: "https://asa-list.tinyman.org/assets/571576867/icon.svg",
						},
						name: "Cosmic Gold",
						unitName: "COSG",
					},
				},
				{
					node: {
						id: "571931588",
						icon: {
							png: "https://asa-list.tinyman.org/assets/571931588/icon.png",
							svg: "https://asa-list.tinyman.org/assets/571931588/icon.svg",
						},
						name: "Neutral Token",
						unitName: "NTR2",
					},
				},
				{
					node: {
						id: "575353596",
						icon: {
							png: "https://asa-list.tinyman.org/assets/575353596/icon.png",
							svg: "https://asa-list.tinyman.org/assets/575353596/icon.svg",
						},
						name: "Wageroo",
						unitName: "ROO",
					},
				},
				{
					node: {
						id: "575358142",
						icon: {
							png: "https://asa-list.tinyman.org/assets/575358142/icon.png",
							svg: "https://asa-list.tinyman.org/assets/575358142/icon.svg",
						},
						name: "Wageroo DAO",
						unitName: "xROO",
					},
				},
				{
					node: {
						id: "577176220",
						icon: {
							png: "https://asa-list.tinyman.org/assets/577176220/icon.png",
							svg: "https://asa-list.tinyman.org/assets/577176220/icon.svg",
						},
						name: "Trust",
						unitName: "TRUST",
					},
				},
				{
					node: {
						id: "580431573",
						icon: {
							png: "https://asa-list.tinyman.org/assets/580431573/icon.png",
							svg: "https://asa-list.tinyman.org/assets/580431573/icon.svg",
						},
						name: "TrackDefi",
						unitName: "TrackFi",
					},
				},
				{
					node: {
						id: "582020067",
						icon: {
							png: "https://asa-list.tinyman.org/assets/582020067/icon.png",
							svg: "https://asa-list.tinyman.org/assets/582020067/icon.svg",
						},
						name: "Darwin's Finches - Seed",
						unitName: "SEED",
					},
				},
				{
					node: {
						id: "582023016",
						icon: {
							png: "https://asa-list.tinyman.org/assets/582023016/icon.png",
							svg: "https://asa-list.tinyman.org/assets/582023016/icon.svg",
						},
						name: "Darwin's Finches - Bug",
						unitName: "BUG",
					},
				},
				{
					node: {
						id: "582025225",
						icon: {
							png: "https://asa-list.tinyman.org/assets/582025225/icon.png",
							svg: "https://asa-list.tinyman.org/assets/582025225/icon.svg",
						},
						name: "Darwin's Finches - Veg",
						unitName: "VEG",
					},
				},
				{
					node: {
						id: "585221469",
						icon: {
							png: "https://asa-list.tinyman.org/assets/585221469/icon.png",
							svg: "https://asa-list.tinyman.org/assets/585221469/icon.svg",
						},
						name: "Candle",
						unitName: "CNDL",
					},
				},
				{
					node: {
						id: "591601798",
						icon: {
							png: "https://asa-list.tinyman.org/assets/591601798/icon.png",
							svg: "https://asa-list.tinyman.org/assets/591601798/icon.svg",
						},
						name: "Fight Token",
						unitName: "FIGHT",
					},
				},
				{
					node: {
						id: "593826822",
						icon: {
							png: "https://asa-list.tinyman.org/assets/593826822/icon.png",
							svg: "https://asa-list.tinyman.org/assets/593826822/icon.svg",
						},
						name: "MADIBA Coin",
						unitName: "MADIBA",
					},
				},
				{
					node: {
						id: "601894079",
						icon: {
							png: "https://asa-list.tinyman.org/assets/601894079/icon.png",
							svg: "https://asa-list.tinyman.org/assets/601894079/icon.svg",
						},
						name: "Dark Coin",
						unitName: "DC",
					},
				},
				{
					node: {
						id: "604221379",
						icon: {
							png: "https://asa-list.tinyman.org/assets/604221379/icon.png",
							svg: "https://asa-list.tinyman.org/assets/604221379/icon.svg",
						},
						name: "Marin County",
						unitName: "MARIN",
					},
				},
				{
					node: {
						id: "604643747",
						icon: {
							png: "https://asa-list.tinyman.org/assets/604643747/icon.png",
							svg: "https://asa-list.tinyman.org/assets/604643747/icon.svg",
						},
						name: "ANIRAND",
						unitName: "ANI",
					},
				},
				{
					node: {
						id: "607120057",
						icon: {
							png: "https://asa-list.tinyman.org/assets/607120057/icon.png",
							svg: "https://asa-list.tinyman.org/assets/607120057/icon.svg",
						},
						name: "Arima",
						unitName: "ARIMA",
					},
				},
				{
					node: {
						id: "607591690",
						icon: {
							png: "https://asa-list.tinyman.org/assets/607591690/icon.png",
							svg: "https://asa-list.tinyman.org/assets/607591690/icon.svg",
						},
						name: "Glitter Finance",
						unitName: "XGLI",
					},
				},
				{
					node: {
						id: "610886011",
						icon: {
							png: "https://asa-list.tinyman.org/assets/610886011/icon.png",
							svg: "https://asa-list.tinyman.org/assets/610886011/icon.svg",
						},
						name: "Veterand",
						unitName: "VETS",
					},
				},
				{
					node: {
						id: "612770026",
						icon: {
							png: "https://asa-list.tinyman.org/assets/612770026/icon.png",
							svg: "https://asa-list.tinyman.org/assets/612770026/icon.svg",
						},
						name: "Royal Token",
						unitName: "ROYAL",
					},
				},
				{
					node: {
						id: "613608234",
						icon: {
							png: "https://asa-list.tinyman.org/assets/613608234/icon.png",
							svg: "https://asa-list.tinyman.org/assets/613608234/icon.svg",
						},
						name: "Orbital Gnome Strikers",
						unitName: "OGS",
					},
				},
				{
					node: {
						id: "615093377",
						icon: {
							png: "https://asa-list.tinyman.org/assets/615093377/icon.png",
							svg: "https://asa-list.tinyman.org/assets/615093377/icon.svg",
						},
						name: "Algo Basics",
						unitName: "BASIC",
					},
				},
				{
					node: {
						id: "624410813",
						icon: {
							png: "https://asa-list.tinyman.org/assets/624410813/icon.png",
							svg: "https://asa-list.tinyman.org/assets/624410813/icon.svg",
						},
						name: "Paint",
						unitName: "PAINT",
					},
				},
				{
					node: {
						id: "627910594",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/05/25/e261da8641494e4c8c7ca7bee2238e0e.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "ecostar",
						unitName: "ESR",
					},
				},
				{
					node: {
						id: "628459294",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/05/21/5dd24bd8368448fd977bf75d125f0bf6.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "ALGOESG",
						unitName: "AESG",
					},
				},
				{
					node: {
						id: "639001259",
						icon: {
							png: "https://asa-list.tinyman.org/assets/639001259/icon.png",
							svg: "https://asa-list.tinyman.org/assets/639001259/icon.svg",
						},
						name: "SuperMeow",
						unitName: "SMW",
					},
				},
				{
					node: {
						id: "640444613",
						icon: {
							png: "https://asa-list.tinyman.org/assets/640444613/icon.png",
							svg: "https://asa-list.tinyman.org/assets/640444613/icon.svg",
						},
						name: "Mario Action Coin",
						unitName: "MAC",
					},
				},
				{
					node: {
						id: "640873368",
						icon: {
							png: "https://asa-list.tinyman.org/assets/640873368/icon.png",
							svg: "https://asa-list.tinyman.org/assets/640873368/icon.svg",
						},
						name: "Elephant Nips",
						unitName: "NIPS",
					},
				},
				{
					node: {
						id: "643125984",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/05/11/8c9c58c3b255461c89bc290ca8a79b90.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "INNOVATION COIN",
						unitName: "IVNC",
					},
				},
				{
					node: {
						id: "654666962",
						icon: {
							png: "https://asa-list.tinyman.org/assets/654666962/icon.png",
							svg: "https://asa-list.tinyman.org/assets/654666962/icon.svg",
						},
						name: "Block Party",
						unitName: "BP",
					},
				},
				{
					node: {
						id: "657291910",
						icon: {
							png: "https://asa-list.tinyman.org/assets/657291910/icon.png",
							svg: "https://asa-list.tinyman.org/assets/657291910/icon.svg",
						},
						name: "CC Token",
						unitName: "CCT",
					},
				},
				{
					node: {
						id: "662477403",
						icon: {
							png: "https://asa-list.tinyman.org/assets/662477403/icon.png",
							svg: "https://asa-list.tinyman.org/assets/662477403/icon.svg",
						},
						name: "2i2i",
						unitName: "2i2i",
					},
				},
				{
					node: {
						id: "665953422",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/11/07/e975a2948aa941aa9e21f89e1ef49c05.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Swiftcoin",
						unitName: "SWFT",
					},
				},
				{
					node: {
						id: "672913181",
						icon: {
							png: "https://asa-list.tinyman.org/assets/672913181/icon.png",
							svg: "https://asa-list.tinyman.org/assets/672913181/icon.svg",
						},
						name: "goUSD",
						unitName: "goUSD",
					},
				},
				{
					node: {
						id: "672923029",
						icon: {
							png: "https://asa-list.tinyman.org/assets/672923029/icon.png",
							svg: "https://asa-list.tinyman.org/assets/672923029/icon.svg",
						},
						name: "goGOLD",
						unitName: "goGOLD",
					},
				},
				{
					node: {
						id: "674925395",
						icon: {
							png: "https://asa-list.tinyman.org/assets/674925395/icon.png",
							svg: "https://asa-list.tinyman.org/assets/674925395/icon.svg",
						},
						name: "Gradian",
						unitName: "GRAD",
					},
				},
				{
					node: {
						id: "679119565",
						icon: {
							png: "https://asa-list.tinyman.org/assets/679119565/icon.png",
							svg: "https://asa-list.tinyman.org/assets/679119565/icon.svg",
						},
						name: "Daffi Test A",
						unitName: "DTESTA",
					},
				},
				{
					node: {
						id: "682727960",
						icon: {
							png: "https://asa-list.tinyman.org/assets/682727960/icon.png",
							svg: "https://asa-list.tinyman.org/assets/682727960/icon.svg",
						},
						name: "blu",
						unitName: "blu",
					},
				},
				{
					node: {
						id: "683743262",
						icon: {
							png: "https://asa-list.tinyman.org/assets/683743262/icon.png",
							svg: "https://asa-list.tinyman.org/assets/683743262/icon.svg",
						},
						name: "PW:Forest",
						unitName: "PWFOR",
					},
				},
				{
					node: {
						id: "684201351",
						icon: {
							png: "https://asa-list.tinyman.org/assets/684201351/icon.png",
							svg: "https://asa-list.tinyman.org/assets/684201351/icon.svg",
						},
						name: "Respectful Development Daf 1",
						unitName: "RDDAF1",
					},
				},
				{
					node: {
						id: "684649672",
						icon: {
							png: "https://asa-list.tinyman.org/assets/684649672/icon.png",
							svg: "https://asa-list.tinyman.org/assets/684649672/icon.svg",
						},
						name: "GAIN",
						unitName: "GAIN",
					},
				},
				{
					node: {
						id: "684649988",
						icon: {
							png: "https://asa-list.tinyman.org/assets/684649988/icon.png",
							svg: "https://asa-list.tinyman.org/assets/684649988/icon.svg",
						},
						name: "GARD",
						unitName: "GARD",
					},
				},
				{
					node: {
						id: "686505742",
						icon: {
							png: "https://asa-list.tinyman.org/assets/686505742/icon.png",
							svg: "https://asa-list.tinyman.org/assets/686505742/icon.svg",
						},
						name: "Folks Algo",
						unitName: "fALGO",
					},
				},
				{
					node: {
						id: "686505743",
						icon: {
							png: "https://asa-list.tinyman.org/assets/686505743/icon.png",
							svg: "https://asa-list.tinyman.org/assets/686505743/icon.svg",
						},
						name: "Folks Rewards Algo",
						unitName: "frALGO",
					},
				},
				{
					node: {
						id: "686508050",
						icon: {
							png: "https://asa-list.tinyman.org/assets/686508050/icon.png",
							svg: "https://asa-list.tinyman.org/assets/686508050/icon.svg",
						},
						name: "Folks USDC",
						unitName: "fUSDC",
					},
				},
				{
					node: {
						id: "686508051",
						icon: {
							png: "https://asa-list.tinyman.org/assets/686508051/icon.png",
							svg: "https://asa-list.tinyman.org/assets/686508051/icon.svg",
						},
						name: "Folks Rewards USDC",
						unitName: "frUSDC",
					},
				},
				{
					node: {
						id: "686509463",
						icon: {
							png: "https://asa-list.tinyman.org/assets/686509463/icon.png",
							svg: "https://asa-list.tinyman.org/assets/686509463/icon.svg",
						},
						name: "Folks Tether USDt",
						unitName: "fUSDt",
					},
				},
				{
					node: {
						id: "686509464",
						icon: {
							png: "https://asa-list.tinyman.org/assets/686509464/icon.png",
							svg: "https://asa-list.tinyman.org/assets/686509464/icon.svg",
						},
						name: "Folks Rewards Tether USDt",
						unitName: "frUSDt",
					},
				},
				{
					node: {
						id: "686510134",
						icon: {
							png: "https://asa-list.tinyman.org/assets/686510134/icon.png",
							svg: "https://asa-list.tinyman.org/assets/686510134/icon.svg",
						},
						name: "Folks goBTC",
						unitName: "fgoBTC",
					},
				},
				{
					node: {
						id: "686510135",
						icon: {
							png: "https://asa-list.tinyman.org/assets/686510135/icon.png",
							svg: "https://asa-list.tinyman.org/assets/686510135/icon.svg",
						},
						name: "Folks Rewards goBTC",
						unitName: "frgoBTC",
					},
				},
				{
					node: {
						id: "688540506",
						icon: {
							png: "https://asa-list.tinyman.org/assets/688540506/icon.png",
							svg: "https://asa-list.tinyman.org/assets/688540506/icon.svg",
						},
						name: "EXTREMELY BULLISH.",
						unitName: "XBULL",
					},
				},
				{
					node: {
						id: "689171215",
						icon: {
							png: "https://asa-list.tinyman.org/assets/689171215/icon.png",
							svg: "https://asa-list.tinyman.org/assets/689171215/icon.svg",
						},
						name: "Doubloon",
						unitName: "DUB",
					},
				},
				{
					node: {
						id: "691727565",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/05/04/59f1feae17cb4ffcb3ec4aa09f665946.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "MXNc",
						unitName: "MXNc",
					},
				},
				{
					node: {
						id: "691916156",
						icon: {
							png: "https://asa-list.tinyman.org/assets/691916156/icon.png",
							svg: "https://asa-list.tinyman.org/assets/691916156/icon.svg",
						},
						name: "Carpet",
						unitName: "GSD",
					},
				},
				{
					node: {
						id: "692083444",
						icon: {
							png: "https://asa-list.tinyman.org/assets/692083444/icon.png",
							svg: "https://asa-list.tinyman.org/assets/692083444/icon.svg",
						},
						name: "Sigma Token",
						unitName: "SIGMA",
					},
				},
				{
					node: {
						id: "692085161",
						icon: {
							png: "https://asa-list.tinyman.org/assets/692085161/icon.png",
							svg: "https://asa-list.tinyman.org/assets/692085161/icon.svg",
						},
						name: "AlgoDAO Token",
						unitName: "ADAO",
					},
				},
				{
					node: {
						id: "692432647",
						icon: {
							png: "https://asa-list.tinyman.org/assets/692432647/icon.png",
							svg: "https://asa-list.tinyman.org/assets/692432647/icon.svg",
						},
						name: "GARDIAN",
						unitName: "GARDIAN",
					},
				},
				{
					node: {
						id: "694408528",
						icon: {
							png: "https://asa-list.tinyman.org/assets/694408528/icon.png",
							svg: "https://asa-list.tinyman.org/assets/694408528/icon.svg",
						},
						name: "Folks goETH",
						unitName: "fgoETH",
					},
				},
				{
					node: {
						id: "694408529",
						icon: {
							png: "https://asa-list.tinyman.org/assets/694408529/icon.png",
							svg: "https://asa-list.tinyman.org/assets/694408529/icon.svg",
						},
						name: "Folks Rewards goETH",
						unitName: "frgoETH",
					},
				},
				{
					node: {
						id: "694432641",
						icon: {
							png: "https://asa-list.tinyman.org/assets/694432641/icon.png",
							svg: "https://asa-list.tinyman.org/assets/694432641/icon.svg",
						},
						name: "Governance Algo 3",
						unitName: "gALGO3",
					},
				},
				{
					node: {
						id: "694474015",
						icon: {
							png: "https://asa-list.tinyman.org/assets/694474015/icon.png",
							svg: "https://asa-list.tinyman.org/assets/694474015/icon.svg",
						},
						name: "Folks Governance Algo 3",
						unitName: "fgALGO3",
					},
				},
				{
					node: {
						id: "700965019",
						icon: {
							png: "https://asa-list.tinyman.org/assets/700965019/icon.png",
							svg: "https://asa-list.tinyman.org/assets/700965019/icon.svg",
						},
						name: "Vestige",
						unitName: "VEST",
					},
				},
				{
					node: {
						id: "712012773",
						icon: {
							png: "https://asa-list.tinyman.org/assets/712012773/icon.png",
							svg: "https://asa-list.tinyman.org/assets/712012773/icon.svg",
						},
						name: "Cometa",
						unitName: "META",
					},
				},
				{
					node: {
						id: "714747372",
						icon: {
							png: "https://asa-list.tinyman.org/assets/714747372/icon.png",
							svg: "https://asa-list.tinyman.org/assets/714747372/icon.svg",
						},
						name: "Algo Place",
						unitName: "rPLACE22",
					},
				},
				{
					node: {
						id: "714763450",
						icon: {
							png: "https://asa-list.tinyman.org/assets/714763450/icon.png",
							svg: "https://asa-list.tinyman.org/assets/714763450/icon.svg",
						},
						name: "Commie Coin",
						unitName: "COMMIE",
					},
				},
				{
					node: {
						id: "714773890",
						icon: {
							png: "https://asa-list.tinyman.org/assets/714773890/icon.png",
							svg: "https://asa-list.tinyman.org/assets/714773890/icon.svg",
						},
						name: "Ghost",
						unitName: "GHOST",
					},
				},
				{
					node: {
						id: "714976897",
						icon: {
							png: "https://asa-list.tinyman.org/assets/714976897/icon.png",
							svg: "https://asa-list.tinyman.org/assets/714976897/icon.svg",
						},
						name: "Mantis",
						unitName: "$MNTS",
					},
				},
				{
					node: {
						id: "715627769",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/05/30/5e06f1bce33a48399fd45bfbf1aede40.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "UpsideFinance rewards token",
						unitName: "rUFt",
					},
				},
				{
					node: {
						id: "716444460",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/04/27/ce83ce1f092b45e1b3ea882a521b30a4.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "JOURNEYMAN",
						unitName: "JMAN",
					},
				},
				{
					node: {
						id: "719923979",
						icon: {
							png: "https://asa-list.tinyman.org/assets/719923979/icon.png",
							svg: "https://asa-list.tinyman.org/assets/719923979/icon.svg",
						},
						name: "Linx Token",
						unitName: "LINX",
					},
				},
				{
					node: {
						id: "722082439",
						icon: {
							png: "https://asa-list.tinyman.org/assets/722082439/icon.png",
							svg: "https://asa-list.tinyman.org/assets/722082439/icon.svg",
						},
						name: "Glazed",
						unitName: "G",
					},
				},
				{
					node: {
						id: "722955559",
						icon: {
							png: "https://asa-list.tinyman.org/assets/722955559/icon.png",
							svg: "https://asa-list.tinyman.org/assets/722955559/icon.svg",
						},
						name: "DeCHO Loyalty Token ASA",
						unitName: "DeLTA",
					},
				},
				{
					node: {
						id: "724480511",
						icon: {
							png: "https://asa-list.tinyman.org/assets/724480511/icon.png",
							svg: "https://asa-list.tinyman.org/assets/724480511/icon.svg",
						},
						name: "Algodex Token",
						unitName: "ALGX",
					},
				},
				{
					node: {
						id: "726778924",
						icon: {
							png: "https://asa-list.tinyman.org/assets/726778924/icon.png",
							svg: "https://asa-list.tinyman.org/assets/726778924/icon.svg",
						},
						name: "Feet In Feet Ass",
						unitName: "FIFA",
					},
				},
				{
					node: {
						id: "727929695",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/05/11/c8ef16984c504c169c86eb5eecf1124d.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "USDE",
						unitName: "USDE",
					},
				},
				{
					node: {
						id: "729369978",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/06/08/d96b9b832e374a7eb508d2991eb89e32.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Fuji LNG",
						unitName: "FUJI",
					},
				},
				{
					node: {
						id: "743260106",
						icon: {
							png: "https://asa-list.tinyman.org/assets/743260106/icon.png",
							svg: "https://asa-list.tinyman.org/assets/743260106/icon.svg",
						},
						name: "goLink",
						unitName: "LINK",
					},
				},
				{
					node: {
						id: "743695671",
						icon: {
							png: "https://asa-list.tinyman.org/assets/743695671/icon.png",
							svg: "https://asa-list.tinyman.org/assets/743695671/icon.svg",
						},
						name: "Koala Coin",
						unitName: "KOCO",
					},
				},
				{
					node: {
						id: "743816746",
						icon: {
							png: "https://asa-list.tinyman.org/assets/743816746/icon.png",
							svg: "https://asa-list.tinyman.org/assets/743816746/icon.svg",
						},
						name: "AlgoReno.casino Token",
						unitName: "𓊗",
					},
				},
				{
					node: {
						id: "744665252",
						icon: {
							png: "https://asa-list.tinyman.org/assets/744665252/icon.png",
							svg: "https://asa-list.tinyman.org/assets/744665252/icon.svg",
						},
						name: "pTokens BTC",
						unitName: "pBTC",
					},
				},
				{
					node: {
						id: "745410378",
						icon: {
							png: "https://asa-list.tinyman.org/assets/745410378/icon.png",
							svg: "https://asa-list.tinyman.org/assets/745410378/icon.svg",
						},
						name: "⬤━⬤━⬤",
						unitName: "algodots",
					},
				},
				{
					node: {
						id: "747635241",
						icon: {
							png: "https://asa-list.tinyman.org/assets/747635241/icon.png",
							svg: "https://asa-list.tinyman.org/assets/747635241/icon.svg",
						},
						name: "Day By Day",
						unitName: "DBD",
					},
				},
				{
					node: {
						id: "751289888",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/05/31/41fc87dbfa0f4b3182f794e18ce16f3e.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks PLANET",
						unitName: "fPlanet",
					},
				},
				{
					node: {
						id: "751289889",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/05/31/c45fbfade31848c384096bf782bd3a5d.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks Rewards PLANET",
						unitName: "frPlanet",
					},
				},
				{
					node: {
						id: "752850639",
						icon: {
							png: "https://asa-list.tinyman.org/assets/752850639/icon.png",
							svg: "https://asa-list.tinyman.org/assets/752850639/icon.svg",
						},
						name: "PW:Credit",
						unitName: "PWCREDIT",
					},
				},
				{
					node: {
						id: "753137719",
						icon: {
							png: "https://asa-list.tinyman.org/assets/753137719/icon.png",
							svg: "https://asa-list.tinyman.org/assets/753137719/icon.svg",
						},
						name: "ButtCoin",
						unitName: "Butts",
					},
				},
				{
					node: {
						id: "753890862",
						icon: {
							png: "https://asa-list.tinyman.org/assets/753890862/icon.png",
							svg: "https://asa-list.tinyman.org/assets/753890862/icon.svg",
						},
						name: "Prisms",
						unitName: "PRSMS",
					},
				},
				{
					node: {
						id: "754411575",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/06/07/65afd9c6a9114e1b88f6b695b7b23b0c.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Mona Lion",
						unitName: "MONAL",
					},
				},
				{
					node: {
						id: "754411576",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/06/07/893aa5994fbf47d588e1988616ede035.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Mona Opulous",
						unitName: "MONAO",
					},
				},
				{
					node: {
						id: "754411577",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/06/07/cde71e5832a74998a8f1518982d2d5ec.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Mona Pink",
						unitName: "MONAP",
					},
				},
				{
					node: {
						id: "754411578",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/06/07/90d889ac6027487d94b67154fc9037a3.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Mona White",
						unitName: "MONAW",
					},
				},
				{
					node: {
						id: "754859229",
						icon: {
							png: "https://asa-list.tinyman.org/assets/754859229/icon.png",
							svg: "https://asa-list.tinyman.org/assets/754859229/icon.svg",
						},
						name: "Egha'S Coin",
						unitName: "EGHAS",
					},
				},
				{
					node: {
						id: "755027431",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/06/02/f3639c55b40241b295e931fd17b69c41.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "🏡 ESTATE",
						unitName: "EST",
					},
				},
				{
					node: {
						id: "755988202",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/07/04/8d27fc5865f945a8ab81bdbb8dee9894.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Technosplurg",
						unitName: "TCSPLRG",
					},
				},
				{
					node: {
						id: "756578163",
						icon: {
							png: "https://asa-list.tinyman.org/assets/756578163/icon.png",
							svg: "https://asa-list.tinyman.org/assets/756578163/icon.svg",
						},
						name: "Moist Grannies",
						unitName: "MOIST",
					},
				},
				{
					node: {
						id: "757039174",
						icon: {
							png: "https://asa-list.tinyman.org/assets/757039174/icon.png",
							svg: "https://asa-list.tinyman.org/assets/757039174/icon.svg",
						},
						name: "X",
						unitName: "XTEND",
					},
				},
				{
					node: {
						id: "758090502",
						icon: {
							png: "https://asa-list.tinyman.org/assets/758090502/icon.png",
							svg: "https://asa-list.tinyman.org/assets/758090502/icon.svg",
						},
						name: "PeliCoin",
						unitName: "PLCN",
					},
				},
				{
					node: {
						id: "758569165",
						icon: {
							png: "https://asa-list.tinyman.org/assets/758569165/icon.png",
							svg: "https://asa-list.tinyman.org/assets/758569165/icon.svg",
						},
						name: "Homies over Hoes",
						unitName: "HOH",
					},
				},
				{
					node: {
						id: "760001022",
						icon: {
							png: "https://asa-list.tinyman.org/assets/760001022/icon.png",
							svg: "https://asa-list.tinyman.org/assets/760001022/icon.svg",
						},
						name: "Purrfect",
						unitName: "PURR",
					},
				},
				{
					node: {
						id: "760037151",
						icon: {
							png: "https://asa-list.tinyman.org/assets/760037151/icon.png",
							svg: "https://asa-list.tinyman.org/assets/760037151/icon.svg",
						},
						name: "xUSD",
						unitName: "xUSD",
					},
				},
				{
					node: {
						id: "762747160",
						icon: {
							png: "https://asa-list.tinyman.org/assets/762747160/icon.png",
							svg: "https://asa-list.tinyman.org/assets/762747160/icon.svg",
						},
						name: "Doggy",
						unitName: "Doggy",
					},
				},
				{
					node: {
						id: "763523072",
						icon: {
							png: "https://asa-list.tinyman.org/assets/763523072/icon.png",
							svg: "https://asa-list.tinyman.org/assets/763523072/icon.svg",
						},
						name: "DreamToken",
						unitName: "DREAM",
					},
				},
				{
					node: {
						id: "765171236",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/18/4e87088be66143669ba0198f0c8711b6.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Heepow Token",
						unitName: "GRASS",
					},
				},
				{
					node: {
						id: "765668483",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/06/08/38f71610c1524bd5b15ef2b216609742.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Meh Coin",
						unitName: "Meh",
					},
				},
				{
					node: {
						id: "769556781",
						icon: {
							png: "https://asa-list.tinyman.org/assets/769556781/icon.png",
							svg: "https://asa-list.tinyman.org/assets/769556781/icon.svg",
						},
						name: "QR Credits",
						unitName: "QRC",
					},
				},
				{
					node: {
						id: "770563646",
						icon: {
							png: "https://asa-list.tinyman.org/assets/770563646/icon.png",
							svg: "https://asa-list.tinyman.org/assets/770563646/icon.svg",
						},
						name: "Did An Oopsie",
						unitName: "DAO",
					},
				},
				{
					node: {
						id: "772212313",
						icon: {
							png: "https://asa-list.tinyman.org/assets/772212313/icon.png",
							svg: "https://asa-list.tinyman.org/assets/772212313/icon.svg",
						},
						name: "Rev",
						unitName: "REV",
					},
				},
				{
					node: {
						id: "773632446",
						icon: {
							png: "https://asa-list.tinyman.org/assets/773632446/icon.png",
							svg: "https://asa-list.tinyman.org/assets/773632446/icon.svg",
						},
						name: "ASAinvestor",
						unitName: "ASAi",
					},
				},
				{
					node: {
						id: "775254236",
						icon: {
							png: "https://asa-list.tinyman.org/assets/775254236/icon.png",
							svg: "https://asa-list.tinyman.org/assets/775254236/icon.svg",
						},
						name: "Eskimo Inu",
						unitName: "ESK",
					},
				},
				{
					node: {
						id: "775399960",
						icon: {
							png: "https://asa-list.tinyman.org/assets/775399960/icon.png",
							svg: "https://asa-list.tinyman.org/assets/775399960/icon.svg",
						},
						name: "ruggies ",
						unitName: "RUGS",
					},
				},
				{
					node: {
						id: "776678944",
						icon: {
							png: "https://asa-list.tinyman.org/assets/776678944/icon.png",
							svg: "https://asa-list.tinyman.org/assets/776678944/icon.svg",
						},
						name: "The Mexican National Peso",
						unitName: "PESOS",
					},
				},
				{
					node: {
						id: "777668262",
						icon: {
							png: "https://asa-list.tinyman.org/assets/777668262/icon.png",
							svg: "https://asa-list.tinyman.org/assets/777668262/icon.svg",
						},
						name: "Ol Dirty Bitcoin",
						unitName: "Dirty",
					},
				},
				{
					node: {
						id: "777747959",
						icon: {
							png: "https://asa-list.tinyman.org/assets/777747959/icon.png",
							svg: "https://asa-list.tinyman.org/assets/777747959/icon.svg",
						},
						name: "Love",
						unitName: "INLOVE",
					},
				},
				{
					node: {
						id: "778730364",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/06/20/b4072e1070b04acdbbc54706acab3b73.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "The New Musician",
						unitName: "MUSIC",
					},
				},
				{
					node: {
						id: "780151945",
						icon: {
							png: "https://asa-list.tinyman.org/assets/780151945/icon.png",
							svg: "https://asa-list.tinyman.org/assets/780151945/icon.svg",
						},
						name: "Algo Scavenger Hunt",
						unitName: "HUNT",
					},
				},
				{
					node: {
						id: "781829486",
						icon: {
							png: "https://asa-list.tinyman.org/assets/781829486/icon.png",
							svg: "https://asa-list.tinyman.org/assets/781829486/icon.svg",
						},
						name: "AQA.EARTH",
						unitName: "AQA",
					},
				},
				{
					node: {
						id: "782285248",
						icon: {
							png: "https://asa-list.tinyman.org/assets/782285248/icon.png",
							svg: "https://asa-list.tinyman.org/assets/782285248/icon.svg",
						},
						name: "Xoge",
						unitName: "Xoge",
					},
				},
				{
					node: {
						id: "783066499",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/08/06/8060ab302687427a9a7815e1c5b29ab1.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "IceVolt Clean Energy Credits",
						unitName: "ICE",
					},
				},
				{
					node: {
						id: "785413544",
						icon: {
							png: "https://asa-list.tinyman.org/assets/785413544/icon.png",
							svg: "https://asa-list.tinyman.org/assets/785413544/icon.svg",
						},
						name: "Selenium",
						unitName: "SLN",
					},
				},
				{
					node: {
						id: "787358534",
						icon: {
							png: "https://asa-list.tinyman.org/assets/787358534/icon.png",
							svg: "https://asa-list.tinyman.org/assets/787358534/icon.svg",
						},
						name: "Sheesha Token",
						unitName: "aSheesha",
					},
				},
				{
					node: {
						id: "790704501",
						icon: {
							png: "https://asa-list.tinyman.org/assets/790704501/icon.png",
							svg: "https://asa-list.tinyman.org/assets/790704501/icon.svg",
						},
						name: "roobies",
						unitName: "ROOBZ",
					},
				},
				{
					node: {
						id: "792313023",
						icon: {
							png: "https://asa-list.tinyman.org/assets/792313023/icon.png",
							svg: "https://asa-list.tinyman.org/assets/792313023/icon.svg",
						},
						name: "Wrapped SOL",
						unitName: "xSOL",
					},
				},
				{
					node: {
						id: "793124631",
						icon: {
							png: "https://asa-list.tinyman.org/assets/793124631/icon.png",
							svg: "https://asa-list.tinyman.org/assets/793124631/icon.svg",
						},
						name: "Governance Algo",
						unitName: "gALGO",
					},
				},
				{
					node: {
						id: "794509175",
						icon: {
							png: "https://asa-list.tinyman.org/assets/794509175/icon.png",
							svg: "https://asa-list.tinyman.org/assets/794509175/icon.svg",
						},
						name: "AI ALGO Coin",
						unitName: "AIAL",
					},
				},
				{
					node: {
						id: "796425061",
						icon: {
							png: "https://asa-list.tinyman.org/assets/796425061/icon.png",
							svg: "https://asa-list.tinyman.org/assets/796425061/icon.svg",
						},
						name: "Coop Coin",
						unitName: "COOP",
					},
				},
				{
					node: {
						id: "797722803",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/07/27/9dd7f31f049d4a8599357c043ea1815c.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "CCER Digital Carbon Credits",
						unitName: "CDCC",
					},
				},
				{
					node: {
						id: "801784818",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/12/15/88e9288c1e14407aa05b053e598ce933.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Sovrgn Games Token",
						unitName: "SGT",
					},
				},
				{
					node: {
						id: "805675250",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/07/17/96eadb5ef2cb426fbb40e31433c750ae.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "CONTRACT",
						unitName: "CONTRACT",
					},
				},
				{
					node: {
						id: "805862344",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/08/24/705310ba1ef949f68dbb8703b6e3c55f.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "NovAu",
						unitName: "NAu",
					},
				},
				{
					node: {
						id: "806008728",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/07/13/b1c57bb4945e4e038e5915f1511a728b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AlgoNews",
						unitName: "ANEW",
					},
				},
				{
					node: {
						id: "807691608",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/07/28/be863843578743349e9ce714bf0b5f88.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "DLDH Trading",
						unitName: "TEAR",
					},
				},
				{
					node: {
						id: "808769893",
						icon: {
							png: "https://asa-list.tinyman.org/assets/808769893/icon.png",
							svg: "https://asa-list.tinyman.org/assets/808769893/icon.svg",
						},
						name: "Ice Cold Beer",
						unitName: "ICB",
					},
				},
				{
					node: {
						id: "808825661",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/10/03/f545af1e32f248cfbbef91f64349c23c.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Wrapped ALGO",
						unitName: "WALGO",
					},
				},
				{
					node: {
						id: "810972054",
						icon: {
							png: "https://asa-list.tinyman.org/assets/810972054/icon.png",
							svg: "https://asa-list.tinyman.org/assets/810972054/icon.svg",
						},
						name: "AQUA",
						unitName: "AQUA",
					},
				},
				{
					node: {
						id: "811721471",
						icon: {
							png: "https://asa-list.tinyman.org/assets/811721471/icon.png",
							svg: "https://asa-list.tinyman.org/assets/811721471/icon.svg",
						},
						name: "Experience",
						unitName: "EXP",
					},
				},
				{
					node: {
						id: "812158311",
						icon: {
							png: "https://asa-list.tinyman.org/assets/812158311/icon.png",
							svg: "https://asa-list.tinyman.org/assets/812158311/icon.svg",
						},
						name: "USDeezNutz",
						unitName: "USDN",
					},
				},
				{
					node: {
						id: "812910314",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/07/22/7a69acb0eef54fb88e66f4b4e531f205.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Soya",
						unitName: "SOYA",
					},
				},
				{
					node: {
						id: "812914898",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/07/22/9aeb202a56c74b8d9d409f443cbd705b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Cora",
						unitName: "CORA",
					},
				},
				{
					node: {
						id: "812917109",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/07/22/be105269e6454c8b813a63b1256eebcd.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Whea",
						unitName: "WHEA",
					},
				},
				{
					node: {
						id: "813745845",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/10/04/30dc5a63280e4e18b07e518889b4fb2c.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Discair",
						unitName: "DISC",
					},
				},
				{
					node: {
						id: "815485910",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/07/22/bf99c19eff6d4f3b93ae01205e5e77b0.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Soyb",
						unitName: "SOYB",
					},
				},
				{
					node: {
						id: "815487451",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/07/22/987ae42476e348529f3f53b1315993b0.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Corb",
						unitName: "CORB",
					},
				},
				{
					node: {
						id: "815489844",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/07/22/dae7d4852293404186a3660ee6c53f6b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Wheb",
						unitName: "WHEB",
					},
				},
				{
					node: {
						id: "818179690",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2022/09/16/0ccd15ed00ca47328dccc18c254c8a6b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AF-BANK-ALGO-STANDARD",
						unitName: "AF-BANK",
					},
				},
				{
					node: {
						id: "818182311",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2022/09/16/edaff434e2c148089601737cc92a31bc.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AF-BANK-USDC-STANDARD",
						unitName: "AF-BANK",
					},
				},
				{
					node: {
						id: "818184214",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2022/09/16/31a27667b8d54d57ac2c49dc0e30124d.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AF-BANK-goBTC-STANDARD",
						unitName: "AF-BANK",
					},
				},
				{
					node: {
						id: "818188553",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2022/09/16/818b7010360c4693a4c43f4fce31adf4.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AF-BANK-goETH-STANDARD",
						unitName: "AF-BANK",
					},
				},
				{
					node: {
						id: "818190568",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2022/09/16/2af7f90d92fe4e418675bb7570e5c568.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AF-BANK-USDt-STANDARD",
						unitName: "AF-BANK",
					},
				},
				{
					node: {
						id: "818432243",
						icon: {
							png: "https://asa-list.tinyman.org/assets/818432243/icon.png",
							svg: "https://asa-list.tinyman.org/assets/818432243/icon.svg",
						},
						name: "Dharma Network",
						unitName: "DHARM",
					},
				},
				{
					node: {
						id: "820574818",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/3ce7ab9ad9ef1d78866f30bb66504832f4d4e35b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Meta Music Token",
						unitName: "MMT",
					},
				},
				{
					node: {
						id: "824643542",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/08/03/4bece31ea1a149a3ac164d98af4d4a3b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "OrganizovanýXaoc",
						unitName: "XAOC",
					},
				},
				{
					node: {
						id: "828794714",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/08/28/7226a7382a904b3b8af1a41ac30bb9db.PNG?format=png&height=256&width=256",
							svg: "",
						},
						name: "ThankYou",
						unitName: "THKU",
					},
				},
				{
					node: {
						id: "829992960",
						icon: {
							png: "https://asa-list.tinyman.org/assets/829992960/icon.png",
							svg: "https://asa-list.tinyman.org/assets/829992960/icon.svg",
						},
						name: "Bartle Doo",
						unitName: "BD",
					},
				},
				{
					node: {
						id: "833026121",
						icon: {
							png: "https://asa-list.tinyman.org/assets/833026121/icon.png",
							svg: "https://asa-list.tinyman.org/assets/833026121/icon.svg",
						},
						name: "Liquid~Gangsters",
						unitName: "L$G",
					},
				},
				{
					node: {
						id: "833815143",
						icon: {
							png: "https://asa-list.tinyman.org/assets/833815143/icon.png",
							svg: "https://asa-list.tinyman.org/assets/833815143/icon.svg",
						},
						name: "Cook",
						unitName: "COOK",
					},
				},
				{
					node: {
						id: "835509686",
						icon: {
							png: "https://asa-list.tinyman.org/assets/835509686/icon.png",
							svg: "https://asa-list.tinyman.org/assets/835509686/icon.svg",
						},
						name: "TateCoin ASA",
						unitName: "TOPG",
					},
				},
				{
					node: {
						id: "840192844",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/09/02/567161211f67404fba3331f28912017e.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Soyu",
						unitName: "SOYU",
					},
				},
				{
					node: {
						id: "840195963",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/09/02/2f6957cacf1a42eb9076635686e96f28.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Coru",
						unitName: "CORU",
					},
				},
				{
					node: {
						id: "840198271",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/09/02/07afb91f14f5452291c87216f3c7cf29.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Wheu",
						unitName: "WHEU",
					},
				},
				{
					node: {
						id: "841126810",
						icon: {
							png: "https://asa-list.tinyman.org/assets/841126810/icon.png",
							svg: "https://asa-list.tinyman.org/assets/841126810/icon.svg",
						},
						name: "STBL2",
						unitName: "STBL2",
					},
				},
				{
					node: {
						id: "841157954",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2022/09/16/b0645f4d217d442cb5b66a0d209ad35f.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AF-BANK-STBL2-STABLE",
						unitName: "AF-BANK",
					},
				},
				{
					node: {
						id: "841462373",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2022/09/16/3e1b2db47b1f45b3b071470140cf58b7.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AF-BANK-AF-POOL-LP",
						unitName: "AF-BANK",
					},
				},
				{
					node: {
						id: "844362899",
						icon: {
							png: "https://asa-list.tinyman.org/assets/844362899/icon.png",
							svg: "https://asa-list.tinyman.org/assets/844362899/icon.svg",
						},
						name: "Bill Cosby Coin",
						unitName: "Rapes",
					},
				},
				{
					node: {
						id: "844772414",
						icon: {
							png: "https://asa-list.tinyman.org/assets/844772414/icon.png",
							svg: "https://asa-list.tinyman.org/assets/844772414/icon.svg",
						},
						name: "Polymeta",
						unitName: "GROW",
					},
				},
				{
					node: {
						id: "846652486",
						icon: {
							png: "https://asa-list.tinyman.org/assets/846652486/icon.png",
							svg: "https://asa-list.tinyman.org/assets/846652486/icon.svg",
						},
						name: "Ders Coin",
						unitName: "DERS",
					},
				},
				{
					node: {
						id: "849191641",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/08/25/7ef84712cefa4dbe9ff9e95dfb129ad3.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Hesab Afghani",
						unitName: "HAFN",
					},
				},
				{
					node: {
						id: "856503101",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/08/31/7c0b3641a86f43e78dd6f9ab299ac0c7.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Early Adopter",
						unitName: "VYBE EA",
					},
				},
				{
					node: {
						id: "859269173",
						icon: {
							png: "https://asa-list.tinyman.org/assets/859269173/icon.png",
							svg: "https://asa-list.tinyman.org/assets/859269173/icon.svg",
						},
						name: "Pizza",
						unitName: "PIZZA",
					},
				},
				{
					node: {
						id: "860192439",
						icon: {
							png: "https://asa-list.tinyman.org/assets/860192439/icon.png",
							svg: "https://asa-list.tinyman.org/assets/860192439/icon.svg",
						},
						name: "Green Earth Blockchain Token",
						unitName: "GEBT",
					},
				},
				{
					node: {
						id: "864635185",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/11/30/239ad30236724ab8a516488e285f6b4c.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "ViiKoin",
						unitName: "VKN",
					},
				},
				{
					node: {
						id: "864852836",
						icon: {
							png: "https://asa-list.tinyman.org/assets/864852836/icon.png",
							svg: "https://asa-list.tinyman.org/assets/864852836/icon.svg",
						},
						name: "CYBER PUG",
						unitName: "PUG",
					},
				},
				{
					node: {
						id: "869882680",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/09/13/de669958911c473dabc55ccbd9f9cc17.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "HUG Agency Token",
						unitName: "HUGtoken",
					},
				},
				{
					node: {
						id: "871930188",
						icon: {
							png: "https://asa-list.tinyman.org/assets/871930188/icon.png",
							svg: "https://asa-list.tinyman.org/assets/871930188/icon.svg",
						},
						name: "aNoir",
						unitName: "aNoir",
					},
				},
				{
					node: {
						id: "874710054",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/09/22/f50dc6dddf4d4e99894751f5e1bfca2c.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Beryl Token",
						unitName: "BRL",
					},
				},
				{
					node: {
						id: "875537962",
						icon: {
							png: "https://asa-list.tinyman.org/assets/875537962/icon.png",
							svg: "https://asa-list.tinyman.org/assets/875537962/icon.svg",
						},
						name: "Brontos Token",
						unitName: "BT",
					},
				},
				{
					node: {
						id: "876808150",
						icon: {
							png: "https://asa-list.tinyman.org/assets/876808150/icon.png",
							svg: "https://asa-list.tinyman.org/assets/876808150/icon.svg",
						},
						name: "TATE Token",
						unitName: "TATE",
					},
				},
				{
					node: {
						id: "877703456",
						icon: {
							png: "https://asa-list.tinyman.org/assets/877703456/icon.png",
							svg: "https://asa-list.tinyman.org/assets/877703456/icon.svg",
						},
						name: "AlcheGold",
						unitName: "AGOLD",
					},
				},
				{
					node: {
						id: "881424020",
						icon: {
							png: "https://asa-list.tinyman.org/assets/881424020/icon.png",
							svg: "https://asa-list.tinyman.org/assets/881424020/icon.svg",
						},
						name: "jsrUNLOCK",
						unitName: "UNLOCK",
					},
				},
				{
					node: {
						id: "886409525",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/09/30/69592c43fd3747c89da319bad61f093f.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Guardians",
						unitName: "GUARD",
					},
				},
				{
					node: {
						id: "886452112",
						icon: {
							png: "https://asa-list.tinyman.org/assets/886452112/icon.png",
							svg: "https://asa-list.tinyman.org/assets/886452112/icon.svg",
						},
						name: "Takos",
						unitName: "TAKO",
					},
				},
				{
					node: {
						id: "887406851",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/11/22/9b4009084e964f2ba031b45875400b9c.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Wrapped Ether",
						unitName: "WETH",
					},
				},
				{
					node: {
						id: "887407002",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/11/24/8dc8afcacd08442f98c55486fa71e6c1.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "USD Coin",
						unitName: "USDC",
					},
				},
				{
					node: {
						id: "887648583",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/11/24/193cf84939a541f2b0393f3e77abcc63.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Wrapped SOL",
						unitName: "SOL",
					},
				},
				{
					node: {
						id: "891226062",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/02/13/1de48c3b0179431da4d887658476afc2.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Coo-Coo Token",
						unitName: "COO",
					},
				},
				{
					node: {
						id: "892383554",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/05/25/647c6effe0ef40e5bf90607064dab532.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AL-D Coin",
						unitName: "ALD",
					},
				},
				{
					node: {
						id: "893309613",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/11/24/14c0bf0d537745798b2932f6422db6f5.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Wrapped AVAX",
						unitName: "WAVAX",
					},
				},
				{
					node: {
						id: "893504888",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/11/24/9c9f24a4eb444869808bafb5f16ee7d3.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Tether USD",
						unitName: "USDT",
					},
				},
				{
					node: {
						id: "894441297",
						icon: {
							png: "https://asa-list.tinyman.org/assets/894441297/icon.png",
							svg: "https://asa-list.tinyman.org/assets/894441297/icon.svg",
						},
						name: "AssCoin",
						unitName: "ASS",
					},
				},
				{
					node: {
						id: "896650094",
						icon: {
							png: "https://asa-list.tinyman.org/assets/896650094/icon.png",
							svg: "https://asa-list.tinyman.org/assets/896650094/icon.svg",
						},
						name: "Blop Token",
						unitName: "BLOP",
					},
				},
				{
					node: {
						id: "897632162",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/10/27/f88abdad22234e4e881c208e40831d13.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Sparkle Token",
						unitName: "SPK",
					},
				},
				{
					node: {
						id: "897649551",
						icon: {
							png: "https://asa-list.tinyman.org/assets/897649551/icon.png",
							svg: "https://asa-list.tinyman.org/assets/897649551/icon.svg",
						},
						name: "Denarii ",
						unitName: "Dfi",
					},
				},
				{
					node: {
						id: "898540649",
						icon: {
							png: "https://asa-list.tinyman.org/assets/898540649/icon.png",
							svg: "https://asa-list.tinyman.org/assets/898540649/icon.svg",
						},
						name: "Woot",
						unitName: "Woot",
					},
				},
				{
					node: {
						id: "900652777",
						icon: {
							png: "https://asa-list.tinyman.org/assets/900652777/icon.png",
							svg: "https://asa-list.tinyman.org/assets/900652777/icon.svg",
						},
						name: "BANK",
						unitName: "BANK",
					},
				},
				{
					node: {
						id: "901634764",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/05/17/3e35a3c8404a4718aa8e2dfc3441e9dc.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "PUPPIT",
						unitName: "PPT",
					},
				},
				{
					node: {
						id: "902592708",
						icon: {
							png: "https://asa-list.tinyman.org/assets/902592708/icon.png",
							svg: "https://asa-list.tinyman.org/assets/902592708/icon.svg",
						},
						name: "Toolsx-V2",
						unitName: "Toolsx",
					},
				},
				{
					node: {
						id: "904674650",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/10/20/3fb41d92baac4730a159fa35dfcc57f2.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Flood Rake",
						unitName: "FLRK",
					},
				},
				{
					node: {
						id: "905108030",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/11/04/eceda2287aac404298f2604aa93e3258.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "WILD Community Card",
						unitName: "tokens",
					},
				},
				{
					node: {
						id: "906662995",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/10/20/9f64171f5ea64a79933eba22207edb40.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Dossa Coin ",
						unitName: "Dossa",
					},
				},
				{
					node: {
						id: "913799044",
						icon: {
							png: "https://asa-list.tinyman.org/assets/913799044/icon.png",
							svg: "https://asa-list.tinyman.org/assets/913799044/icon.svg",
						},
						name: "Dossa Coin",
						unitName: "Dossa",
					},
				},
				{
					node: {
						id: "916591005",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/10/26/43dc070f2eb34057a0dfc545edbffd9b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "S-ALGO-$0.27-2022.11.24",
						unitName: "SILO",
					},
				},
				{
					node: {
						id: "919889450",
						icon: {
							png: "https://asa-list.tinyman.org/assets/919889450/icon.png",
							svg: "https://asa-list.tinyman.org/assets/919889450/icon.svg",
						},
						name: "press.algo Token",
						unitName: "PDAT",
					},
				},
				{
					node: {
						id: "921668004",
						icon: {
							png: "https://asa-list.tinyman.org/assets/921668004/icon.png",
							svg: "https://asa-list.tinyman.org/assets/921668004/icon.svg",
						},
						name: "AUDE",
						unitName: "AUDE",
					},
				},
				{
					node: {
						id: "922346083",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/11/04/6b0ae9dfca7a485dbfa4ff8e572634bb.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Nimble",
						unitName: "NIMBLE",
					},
				},
				{
					node: {
						id: "923330224",
						icon: {
							png: "https://asa-list.tinyman.org/assets/923330224/icon.png",
							svg: "https://asa-list.tinyman.org/assets/923330224/icon.svg",
						},
						name: "Peanut Martini",
						unitName: "MARTINI",
					},
				},
				{
					node: {
						id: "923640017",
						icon: {
							png: "https://asa-list.tinyman.org/assets/923640017/icon.png",
							svg: "https://asa-list.tinyman.org/assets/923640017/icon.svg",
						},
						name: "Indoor Air Quality",
						unitName: "IAQ",
					},
				},
				{
					node: {
						id: "924268058",
						icon: {
							png: "https://asa-list.tinyman.org/assets/924268058/icon.png",
							svg: "https://asa-list.tinyman.org/assets/924268058/icon.svg",
						},
						name: "FrysCrypto",
						unitName: "FRY",
					},
				},
				{
					node: {
						id: "933364963",
						icon: {
							png: "https://asa-list.tinyman.org/assets/933364963/icon.png",
							svg: "https://asa-list.tinyman.org/assets/933364963/icon.svg",
						},
						name: "KITTY",
						unitName: "kitties",
					},
				},
				{
					node: {
						id: "933973163",
						icon: {
							png: "https://asa-list.tinyman.org/assets/933973163/icon.png",
							svg: "https://asa-list.tinyman.org/assets/933973163/icon.svg",
						},
						name: "AlgoMonkeys Banana",
						unitName: "BANANA",
					},
				},
				{
					node: {
						id: "934478981",
						icon: {
							png: "https://asa-list.tinyman.org/assets/934478981/icon.png",
							svg: "https://asa-list.tinyman.org/assets/934478981/icon.svg",
						},
						name: "OPPORTUNITY CRYPTO",
						unitName: "OPYX",
					},
				},
				{
					node: {
						id: "940424110",
						icon: {
							png: "https://asa-list.tinyman.org/assets/940424110/icon.png",
							svg: "https://asa-list.tinyman.org/assets/940424110/icon.svg",
						},
						name: "Game Master Token",
						unitName: "GMT",
					},
				},
				{
					node: {
						id: "940635002",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/11/21/c82f28bbc4ca441f876482c37f1dd16d.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Opulous Vault",
						unitName: "OVault",
					},
				},
				{
					node: {
						id: "942870784",
						icon: {
							png: "https://asa-list.tinyman.org/assets/942870784/icon.png",
							svg: "https://asa-list.tinyman.org/assets/942870784/icon.svg",
						},
						name: "AlgoStar",
						unitName: "STAR",
					},
				},
				{
					node: {
						id: "942958458",
						icon: {
							png: "https://asa-list.tinyman.org/assets/942958458/icon.png",
							svg: "https://asa-list.tinyman.org/assets/942958458/icon.svg",
						},
						name: "Omnicoin",
						unitName: "OMNI",
					},
				},
				{
					node: {
						id: "947923645",
						icon: {
							png: "https://asa-list.tinyman.org/assets/947923645/icon.png",
							svg: "https://asa-list.tinyman.org/assets/947923645/icon.svg",
						},
						name: "XListUnicorn",
						unitName: "XUT",
					},
				},
				{
					node: {
						id: "951243359",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/06/24/ddb5bc27d79549cb873445fbf1aa6ed7.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Digital Planet Token",
						unitName: "DPL",
					},
				},
				{
					node: {
						id: "957484854",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/01/13/a249774aeee2413db93a7d1ec69c462b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "deathOS",
						unitName: "DEATHOS",
					},
				},
				{
					node: {
						id: "958277442",
						icon: {
							png: "https://asa-list.tinyman.org/assets/958277442/icon.png",
							svg: "https://asa-list.tinyman.org/assets/958277442/icon.svg",
						},
						name: "gmtCOPPER",
						unitName: "gmtC",
					},
				},
				{
					node: {
						id: "958278659",
						icon: {
							png: "https://asa-list.tinyman.org/assets/958278659/icon.png",
							svg: "https://asa-list.tinyman.org/assets/958278659/icon.svg",
						},
						name: "gmtSILVER",
						unitName: "gmtS",
					},
				},
				{
					node: {
						id: "958279733",
						icon: {
							png: "https://asa-list.tinyman.org/assets/958279733/icon.png",
							svg: "https://asa-list.tinyman.org/assets/958279733/icon.svg",
						},
						name: "gmtGOLD",
						unitName: "gmtG",
					},
				},
				{
					node: {
						id: "958280887",
						icon: {
							png: "https://asa-list.tinyman.org/assets/958280887/icon.png",
							svg: "https://asa-list.tinyman.org/assets/958280887/icon.svg",
						},
						name: "gmtPLATINUM",
						unitName: "gmtP",
					},
				},
				{
					node: {
						id: "971381860",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/12/13/0dfe26bf265a4556b2e67bf3a244f280.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks V2 Algo",
						unitName: "fALGO",
					},
				},
				{
					node: {
						id: "971383839",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/12/19/519c04ef7b044d00bfed0d624ffae8d4.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks V2 Governance Algo",
						unitName: "fgALGO",
					},
				},
				{
					node: {
						id: "971384592",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/12/17/cc19aa59ef064e4fa4f63c96aba9d369.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks V2 USDC",
						unitName: "fUSDC",
					},
				},
				{
					node: {
						id: "971385312",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/12/17/7c40b7c7c9bc42c5947baa7bf26907fa.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks V2 Tether USDt",
						unitName: "fUSDt",
					},
				},
				{
					node: {
						id: "971386173",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/12/17/9ed91a8336534544a5b58e74b9e991ea.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks V2 goBTC",
						unitName: "fgoBTC",
					},
				},
				{
					node: {
						id: "971387073",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/12/17/025b1fc8f2844c9c987778d0bd1688f6.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks V2 goETH",
						unitName: "fgoETH",
					},
				},
				{
					node: {
						id: "975807033",
						icon: {
							png: "https://asa-list.tinyman.org/assets/975807033/icon.png",
							svg: "https://asa-list.tinyman.org/assets/975807033/icon.svg",
						},
						name: "INFLATOR",
						unitName: "INFT",
					},
				},
				{
					node: {
						id: "977618990",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2022/12/16/15697de4ea7d4f50864a7abb17abba3b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Ownify Currency",
						unitName: "OWNI",
					},
				},
				{
					node: {
						id: "982719503",
						icon: {
							png: "https://asa-list.tinyman.org/assets/982719503/icon.png",
							svg: "https://asa-list.tinyman.org/assets/982719503/icon.svg",
						},
						name: "Basic",
						unitName: "Basic",
					},
				},
				{
					node: {
						id: "987374809",
						icon: {
							png: "https://asa-list.tinyman.org/assets/987374809/icon.png",
							svg: "https://asa-list.tinyman.org/assets/987374809/icon.svg",
						},
						name: "The Legend Projects",
						unitName: "TLP",
					},
				},
				{
					node: {
						id: "988210906",
						icon: {
							png: "https://asa-list.tinyman.org/assets/988210906/icon.png",
							svg: "https://asa-list.tinyman.org/assets/988210906/icon.svg",
						},
						name: "Honey",
						unitName: "HNY",
					},
				},
				{
					node: {
						id: "994035569",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/01/23/abb93c2a292f460db81b80573fd457b0.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Netfluids",
						unitName: "FLDS",
					},
				},
				{
					node: {
						id: "1000870705",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1000870705/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1000870705/icon.svg",
						},
						name: "Treats",
						unitName: "TRTS",
					},
				},
				{
					node: {
						id: "1003833031",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1003833031/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1003833031/icon.svg",
						},
						name: "CollecteursX",
						unitName: "CLTR",
					},
				},
				{
					node: {
						id: "1010810412",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1010810412/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1010810412/icon.svg",
						},
						name: "DegenSpAce",
						unitName: "DGS",
					},
				},
				{
					node: {
						id: "1010838509",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1010838509/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1010838509/icon.svg",
						},
						name: "Acid Toke",
						unitName: "$Tokes",
					},
				},
				{
					node: {
						id: "1015673913",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/01/20/6a8c8fe159214d1b82d126916808d519.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Workout And Research",
						unitName: "WAR",
					},
				},
				{
					node: {
						id: "1020893679",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1020893679/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1020893679/icon.svg",
						},
						name: "Rabbit coin",
						unitName: "Rabbit",
					},
				},
				{
					node: {
						id: "1023434045",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/14/d8f089cf2cbc4f01914468cd1cccbd9c.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Bear Heart Entertainment",
						unitName: "BHRT",
					},
				},
				{
					node: {
						id: "1024439078",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/06/28/0d875c2a9fee42a7a503db1f8a65e89c.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Fracctal Token",
						unitName: "FRACC",
					},
				},
				{
					node: {
						id: "1024922832",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/02/06/7de0422b41194e80b0c1f19bce83d106.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AIINU",
						unitName: "AIINU",
					},
				},
				{
					node: {
						id: "1028585879",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/02/12/52b4e6a01c8a4f0bb5425938271232f5.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Generous Baby Token",
						unitName: "GBT",
					},
				},
				{
					node: {
						id: "1029725590",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1029725590/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1029725590/icon.svg",
						},
						name: "Growling Bear Coin",
						unitName: "RAWR",
					},
				},
				{
					node: {
						id: "1029804829",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/06/06/656cb36365734ee4a3b25a6acb880719.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Flux",
						unitName: "FLUX",
					},
				},
				{
					node: {
						id: "1034994881",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1034994881/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1034994881/icon.svg",
						},
						name: "One",
						unitName: "ONE",
					},
				},
				{
					node: {
						id: "1035899249",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1035899249/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1035899249/icon.svg",
						},
						name: "KOC",
						unitName: "KC",
					},
				},
				{
					node: {
						id: "1035970481",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/02/13/2339ef5577094dddb1b5188cb15c03d7.PNG?format=png&height=256&width=256",
							svg: "",
						},
						name: "Alternative Building Materials",
						unitName: "ABM",
					},
				},
				{
					node: {
						id: "1037125809",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1037125809/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1037125809/icon.svg",
						},
						name: "A Beast called Algo",
						unitName: "ABCA",
					},
				},
				{
					node: {
						id: "1039986749",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/03/27/ba99f30841124f059dbb8d3cc14133ee.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Friend Fish",
						unitName: "FISH",
					},
				},
				{
					node: {
						id: "1041632581",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1041632581/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1041632581/icon.svg",
						},
						name: "SkyRocket",
						unitName: "SKY",
					},
				},
				{
					node: {
						id: "1044269355",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/02/22/4104b62ea35a4ef995b484da27b5e8c5.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks V2 Opulous",
						unitName: "fOPUL",
					},
				},
				{
					node: {
						id: "1045677043",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/09/2b1d85310a2148eb89bd3ce2b95391c3.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Algorand Hodl Token",
						unitName: "AHT",
					},
				},
				{
					node: {
						id: "1050428997",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/03/12/8f137bd8752941289d0e2ac9e73038f6.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "The Sports Progress Token",
						unitName: "SPRO",
					},
				},
				{
					node: {
						id: "1053260256",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1053260256/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1053260256/icon.svg",
						},
						name: "Glizzy Financial 🌭",
						unitName: "GLIZZY",
					},
				},
				{
					node: {
						id: "1054235481",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/04/17/34e01c90e4fc421499da42c820a57f6f.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Midwest Fun Stuff",
						unitName: "MFS",
					},
				},
				{
					node: {
						id: "1054801592",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1054801592/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1054801592/icon.svg",
						},
						name: "Board",
						unitName: "BRD",
					},
				},
				{
					node: {
						id: "1058926737",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/11/24/2b752817c40a4654a9c979efc3188579.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Wrapped BTC",
						unitName: "WBTC",
					},
				},
				{
					node: {
						id: "1060587336",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/03/15/1b70df7c3ea24cc5abe03c87571df3fd.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks V2 GARD",
						unitName: "fGARD",
					},
				},
				{
					node: {
						id: "1060770176",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/03/21/23a71456d6b04297a52274e1caefc182.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AutismCoin",
						unitName: "AUTIE",
					},
				},
				{
					node: {
						id: "1065092715",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1065092715/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1065092715/icon.svg",
						},
						name: "Cosmic Gold",
						unitName: "COSG",
					},
				},
				{
					node: {
						id: "1066202864",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/05/05/a64532da7cc946a58f5e633b25521496.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Trusty Digital Inc",
						unitName: "USPEP",
					},
				},
				{
					node: {
						id: "1066698547",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1066698547/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1066698547/icon.svg",
						},
						name: "Peaches",
						unitName: "PCHY",
					},
				},
				{
					node: {
						id: "1067295154",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/03/29/4ef4f3abcec64136929669ddbc218901.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks V2 Wrapped BTC",
						unitName: "fWBTC",
					},
				},
				{
					node: {
						id: "1067295558",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/03/29/541792ef08574e79a3563bf19a549f69.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks V2 Wrapped Ether",
						unitName: "fWETH",
					},
				},
				{
					node: {
						id: "1073483571",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/04/04/d84b65c12bbc449c91d1aa952f4b32be.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Yoink",
						unitName: "YOINK",
					},
				},
				{
					node: {
						id: "1075040336",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1075040336/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1075040336/icon.svg",
						},
						name: "Postmodern Euro",
						unitName: "EURP",
					},
				},
				{
					node: {
						id: "1076768277",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1076768277/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1076768277/icon.svg",
						},
						name: "Terminator Token ",
						unitName: "Skynet",
					},
				},
				{
					node: {
						id: "1080556472",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/04/09/060057febba34370ac9c984185696e9b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Great Egypt",
						unitName: "EGY",
					},
				},
				{
					node: {
						id: "1083164969",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/04/15/3576c051705a4971b3f84e07f31b3cba.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "POLYN",
						unitName: "POLYN",
					},
				},
				{
					node: {
						id: "1088771340",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1088771340/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1088771340/icon.svg",
						},
						name: "Dark Coin",
						unitName: "DARKCOIN",
					},
				},
				{
					node: {
						id: "1088895197",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1088895197/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1088895197/icon.svg",
						},
						name: "DefiCity",
						unitName: "ICE",
					},
				},
				{
					node: {
						id: "1096015467",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1096015467/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1096015467/icon.svg",
						},
						name: "Pepe",
						unitName: "PEPE",
					},
				},
				{
					node: {
						id: "1096471121",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1096471121/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1096471121/icon.svg",
						},
						name: "Moon Pepe",
						unitName: "MOOP",
					},
				},
				{
					node: {
						id: "1096474249",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1096474249/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1096474249/icon.svg",
						},
						name: "Nigeria Pepe",
						unitName: "NIGP",
					},
				},
				{
					node: {
						id: "1096820934",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1096820934/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1096820934/icon.svg",
						},
						name: "Tucker Carlson",
						unitName: "FOX",
					},
				},
				{
					node: {
						id: "1098616344",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1098616344/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1098616344/icon.svg",
						},
						name: "GLIZZY PEPE",
						unitName: "GPEPE",
					},
				},
				{
					node: {
						id: "1099533497",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1099533497/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1099533497/icon.svg",
						},
						name: "Tendies Token",
						unitName: "Tendies",
					},
				},
				{
					node: {
						id: "1099642259",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1099642259/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1099642259/icon.svg",
						},
						name: "This Is Fine",
						unitName: "FINE",
					},
				},
				{
					node: {
						id: "1100556080",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/05/15/0f9a318094ba433b87fb69ec2ddb7877.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Andy",
						unitName: "ANDY",
					},
				},
				{
					node: {
						id: "1102328569",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1102328569/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1102328569/icon.svg",
						},
						name: "TonyCoin",
						unitName: "Tony",
					},
				},
				{
					node: {
						id: "1103598758",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1103598758/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1103598758/icon.svg",
						},
						name: "Cardi Coin",
						unitName: "CARDI",
					},
				},
				{
					node: {
						id: "1103986144",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1103986144/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1103986144/icon.svg",
						},
						name: "Billionaires Boys Club",
						unitName: "BOYS",
					},
				},
				{
					node: {
						id: "1105062628",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/08/23/24177d66aac240479b6f94694932e8e6.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "HellBender 392 Scott VA",
						unitName: "OTSDHBVA",
					},
				},
				{
					node: {
						id: "1105680969",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/08/07/6a431f50818545109235ed20ef7c2b9b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "BisKoin",
						unitName: "B$K",
					},
				},
				{
					node: {
						id: "1105835562",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1105835562/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1105835562/icon.svg",
						},
						name: "Digital Token",
						unitName: "DT",
					},
				},
				{
					node: {
						id: "1108594172",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1108594172/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1108594172/icon.svg",
						},
						name: "Orbital",
						unitName: "ORB",
					},
				},
				{
					node: {
						id: "1112554822",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/05/29/e9fa33b31956461686296092c4c0a629.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "BIG-DickEnergy",
						unitName: "BIG-DE",
					},
				},
				{
					node: {
						id: "1112556000",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/05/29/d1fbcd1304dd4f1e8fcafb135319d567.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "LITTLE-DickEnergy",
						unitName: "LDE",
					},
				},
				{
					node: {
						id: "1114942423",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1114942423/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1114942423/icon.svg",
						},
						name: "John Woods",
						unitName: "WOOD",
					},
				},
				{
					node: {
						id: "1115850955",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/06/05/d3e72c0c46414656aaae3fe4a94dce6b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Diablo IV",
						unitName: "CAIN",
					},
				},
				{
					node: {
						id: "1116111739",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1116111739/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1116111739/icon.svg",
						},
						name: "sico",
						unitName: "SICO",
					},
				},
				{
					node: {
						id: "1116319755",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1116319755/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1116319755/icon.svg",
						},
						name: "BLUE ORDINALS",
						unitName: "ORDINALS",
					},
				},
				{
					node: {
						id: "1118456851",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1118456851/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1118456851/icon.svg",
						},
						name: "Knead",
						unitName: "KND",
					},
				},
				{
					node: {
						id: "1118904346",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1118904346/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1118904346/icon.svg",
						},
						name: "Skye Coin",
						unitName: "SKYE",
					},
				},
				{
					node: {
						id: "1119663977",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1119663977/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1119663977/icon.svg",
						},
						name: "Beaver loves you",
						unitName: "$beav",
					},
				},
				{
					node: {
						id: "1119722936",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1119722936/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1119722936/icon.svg",
						},
						name: "The High Community ",
						unitName: "THC",
					},
				},
				{
					node: {
						id: "1122347528",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1122347528/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1122347528/icon.svg",
						},
						name: "HIVE",
						unitName: "HIVE",
					},
				},
				{
					node: {
						id: "1124070239",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/06/14/267b4c8a0ae74b428323476331bb3d87.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Metapost Token",
						unitName: "POST",
					},
				},
				{
					node: {
						id: "1124915436",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1124915436/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1124915436/icon.svg",
						},
						name: "Wind",
						unitName: "WIND",
					},
				},
				{
					node: {
						id: "1127406202",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/06/16/804c3f2a9051423fa4705d839a26dc87.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Equito Wrapped Shiba Inu",
						unitName: "SHIB",
					},
				},
				{
					node: {
						id: "1128779653",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/07/09/ab3aeaa2aad24ba387ebc7c1fa51537f.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Opportunity Crypto",
						unitName: "OPYx",
					},
				},
				{
					node: {
						id: "1130414707",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1130414707/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1130414707/icon.svg",
						},
						name: "Get Fucked",
						unitName: "GF",
					},
				},
				{
					node: {
						id: "1130719852",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/06/21/7d1a3fcbe2a44e249806ef82c4a74f2d.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "FAIRINBOX_2i2i",
						unitName: "INBOX",
					},
				},
				{
					node: {
						id: "1131427236",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1131427236/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1131427236/icon.svg",
						},
						name: "Day By Day V2",
						unitName: "DBD",
					},
				},
				{
					node: {
						id: "1134696561",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/06/28/429af4271f4843c7aaf52fce91ca27e1.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Governance xAlgo",
						unitName: "xALGO",
					},
				},
				{
					node: {
						id: "1137071163",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/07/04/01cc9394fe3542708216a179029fac33.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Pepe 2.0",
						unitName: "PEPE2.0",
					},
				},
				{
					node: {
						id: "1138500612",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1138500612/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1138500612/icon.svg",
						},
						name: "GORA",
						unitName: "GORA",
					},
				},
				{
					node: {
						id: "1141259202",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1141259202/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1141259202/icon.svg",
						},
						name: "CYBER",
						unitName: "CY💀",
					},
				},
				{
					node: {
						id: "1144340594",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1144340594/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1144340594/icon.svg",
						},
						name: "GAS",
						unitName: "GAS",
					},
				},
				{
					node: {
						id: "1148225020",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/10/30/aaee5d8671fc462b8c26b4fb7add0ac3.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "OTSD Regen AG LP investment",
						unitName: "RegenAg",
					},
				},
				{
					node: {
						id: "1152109334",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1152109334/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1152109334/icon.svg",
						},
						name: "Khaaaa Coin",
						unitName: "KHAAA",
					},
				},
				{
					node: {
						id: "1164556102",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1164556102/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1164556102/icon.svg",
						},
						name: "X-NFT",
						unitName: "X-NFT",
					},
				},
				{
					node: {
						id: "1166485390",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/08/09/47eedf9930384b1fb076b039e1475e36.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Gunny Inugi: Rockie",
						unitName: "GI1GR",
					},
				},
				{
					node: {
						id: "1166502923",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/08/09/31ae4a938914440ea4dcad88bbfd9d19.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Gunny Inugi: Fuzzy",
						unitName: "GI1GF",
					},
				},
				{
					node: {
						id: "1166518213",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/08/09/e714d16f644b4975b8085ff186eab642.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Gunny Inugi: Bolty",
						unitName: "GI1GB",
					},
				},
				{
					node: {
						id: "1166579975",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/08/09/4b21c9ad5d084ecf90270825733cc806.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Gunny Inugi: Blaze",
						unitName: "GI1GBL",
					},
				},
				{
					node: {
						id: "1166590241",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/08/09/8544a83c21d7412699d31fe616cbabd0.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Gunny Inugi: Taily",
						unitName: "GI1GT",
					},
				},
				{
					node: {
						id: "1166979636",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2023/08/14/8ff8015533804687849591c0690c16d4.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks V2 Wrapped AVAX",
						unitName: "fWAVAX",
					},
				},
				{
					node: {
						id: "1166980820",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2023/08/22/ecf46853a37e4084963add603952b63b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks V2 Wrapped SOL",
						unitName: "fSOL",
					},
				},
				{
					node: {
						id: "1166982296",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2023/08/22/b2021bd7396345e4a187fac7e40ec891.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Folks V2 Maple Token",
						unitName: "fMPL",
					},
				},
				{
					node: {
						id: "1169650768",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/08/13/47d0307520cd4831a9c8b704b52e6068.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Stealer Coin",
						unitName: "STL",
					},
				},
				{
					node: {
						id: "1169658307",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1169658307/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1169658307/icon.svg",
						},
						name: "Apeiron",
						unitName: "APRN",
					},
				},
				{
					node: {
						id: "1171775660",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/08/16/cd9ad2102ee9425b9fc8f3de78d04ec3.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Fugazy",
						unitName: "FGZY",
					},
				},
				{
					node: {
						id: "1178290500",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/08/24/ce891f91018545fab43c5c6cb500f550.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Rollbit Coin",
						unitName: "RLB",
					},
				},
				{
					node: {
						id: "1182620971",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2024/01/08/d614b61fde834b49ae48c2308564829b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Mercury Index",
						unitName: "MIT",
					},
				},
				{
					node: {
						id: "1183554043",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/09/6247b4e54e2a46318fb74604c4fe0398.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "AlgoCard",
						unitName: "CARD",
					},
				},
				{
					node: {
						id: "1184547068",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/09/13/5c1fa2ad483f4bf486a3170d9aef5aa1.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "SharpHawkservice",
						unitName: "SHS",
					},
				},
				{
					node: {
						id: "1184808594",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/09/03/143ced11e87c4ddb951564726bff39af.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "StickmanLines",
						unitName: "STK",
					},
				},
				{
					node: {
						id: "1185173782",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/09/04/6b1e969686164f3c90728e8911a15780.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "mALGO",
						unitName: "mALGO",
					},
				},
				{
					node: {
						id: "1185252893",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/09/06/7fd662807fb24f5c87776f2360eebd6f.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Biden Bucks",
						unitName: "BB",
					},
				},
				{
					node: {
						id: "1188287738",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1188287738/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1188287738/icon.svg",
						},
						name: "CBDC ScamCoin",
						unitName: "BAG",
					},
				},
				{
					node: {
						id: "1189552380",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/17/70c2bcd2207c415bb833fddc28220513.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "OTSDLUKENS",
						unitName: "OTSDLKNS",
					},
				},
				{
					node: {
						id: "1190390016",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1190390016/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1190390016/icon.svg",
						},
						name: "CA",
						unitName: "CA",
					},
				},
				{
					node: {
						id: "1192606626",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/09/19/c7949b2c24d0405c83c066a095d70c0b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Krypto Bits",
						unitName: "Bit",
					},
				},
				{
					node: {
						id: "1199762127",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1199762127/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1199762127/icon.svg",
						},
						name: "Doodie Coin",
						unitName: "DOO",
					},
				},
				{
					node: {
						id: "1200094857",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/11/24/21c9618ece2944b99e0f2c30dcf810ab.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "ChainLink Token",
						unitName: "LINK",
					},
				},
				{
					node: {
						id: "1210764878",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/10/16/85fca1cd4dd3409fb1eeb3211fcb4507.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "DinarCoin",
						unitName: "DNC",
					},
				},
				{
					node: {
						id: "1211492715",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/10/11/7e7ad92aebda456dbef55ee359e9c251.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "PLUS",
						unitName: "PLUS",
					},
				},
				{
					node: {
						id: "1217302022",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1217302022/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1217302022/icon.svg",
						},
						name: "LOTTO RACE",
						unitName: "LOTTOR",
					},
				},
				{
					node: {
						id: "1221448215",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/10/28/48a9c6866b104935ae2a7fe48969460e.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Education",
						unitName: "Know",
					},
				},
				{
					node: {
						id: "1223742907",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/11/47641616886941e290bc3661cfd1a9ec.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Spore Coin",
						unitName: "SPORE",
					},
				},
				{
					node: {
						id: "1229820904",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/11/01/83e6937c7089455990f34cab94daf619.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Hero Coin",
						unitName: "GHC",
					},
				},
				{
					node: {
						id: "1231325798",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/11/03/e3ccacc372ed442a8929714053266013.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "EDUCATION BLOCKS",
						unitName: "BLOCK",
					},
				},
				{
					node: {
						id: "1232999340",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/11/08/0b84b4bf132741e88678f85d04a81fe1.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "STOR",
						unitName: "STOR",
					},
				},
				{
					node: {
						id: "1233471765",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2024/01/28/cb3823c137b049c29d8d81e63d265a10.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Dollars General Coin",
						unitName: "DGEN",
					},
				},
				{
					node: {
						id: "1237288791",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/11/25/10303c638e7244c981036249a00d7734.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Nollya GameF1 Da0",
						unitName: "NLYA",
					},
				},
				{
					node: {
						id: "1237529510",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1237529510/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1237529510/icon.svg",
						},
						name: "Polkagold",
						unitName: "PGOLD",
					},
				},
				{
					node: {
						id: "1241944285",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1241944285/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1241944285/icon.svg",
						},
						name: "Gold",
						unitName: "Gold",
					},
				},
				{
					node: {
						id: "1241945177",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1241945177/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1241945177/icon.svg",
						},
						name: "GoldDAO",
						unitName: "GoldDAO",
					},
				},
				{
					node: {
						id: "1245322723",
						icon: {
							png: "https://asa-list.tinyman.org/assets/1245322723/icon.png",
							svg: "https://asa-list.tinyman.org/assets/1245322723/icon.svg",
						},
						name: "Labrador",
						unitName: "Labrador",
					},
				},
				{
					node: {
						id: "1249581181",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2023/12/06/152661bf2bc74b039e2e0938fdcc3dc7.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Wrapped BNB",
						unitName: "WBNB",
					},
				},
				{
					node: {
						id: "1250132294",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/11/25/736b94c20dda48bdb46c311a7be3b192.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "CampFyre Coin",
						unitName: "FYRE",
					},
				},
				{
					node: {
						id: "1251829038",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/20/492914692b11422d89a1740d3bf4438e.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "KRS TRADING DAO LLC",
						unitName: "KRSTD",
					},
				},
				{
					node: {
						id: "1259645348",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/01/b57d41f3bcc448a58fd0162f8738fa6b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Gunny Matchmaking Rating",
						unitName: "GMMR",
					},
				},
				{
					node: {
						id: "1261011241",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/03/2be929a883544d3ba7252913a175a6a9.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Apeiron 2.0",
						unitName: "APRN2.0",
					},
				},
				{
					node: {
						id: "1261301160",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/04/26244289c7c64e5cba8a4dbf40f1631c.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Karzio",
						unitName: "KRZ",
					},
				},
				{
					node: {
						id: "1261952433",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/04/7a2d31c97ee44340a2b09a1cd1cc96b2.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Peperium",
						unitName: "Peps",
					},
				},
				{
					node: {
						id: "1262355871",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/16/5cf520d9b5974d0797c410b7ab5b0d39.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Harvest seeds ",
						unitName: "Hsed",
					},
				},
				{
					node: {
						id: "1265975021",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/02/d9699190064a41679493a0b5c30d0d83.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "NIKO",
						unitName: "NIKO",
					},
				},
				{
					node: {
						id: "1267506082",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/19/7b10e3c067e24dd79da52ef4b86ba706.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "CLUB",
						unitName: "CLUB",
					},
				},
				{
					node: {
						id: "1268830233",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/10/562f1ba1f420455d90cebfd2e3a90110.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Daffi Reward",
						unitName: "DAFFIR",
					},
				},
				{
					node: {
						id: "1274454607",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/14/b2bc3698b0c648aea233ac12592adc38.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Sigillum",
						unitName: "SGM",
					},
				},
				{
					node: {
						id: "1274539825",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/28/c6c98b2e081549c7b84e431b782aa24f.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "GEIBOND",
						unitName: "GEI",
					},
				},
				{
					node: {
						id: "1275370710",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/26/a02f4fe801c94eb1a5f8ad7f5909db37.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "SUS",
						unitName: "SUS",
					},
				},
				{
					node: {
						id: "1277633086",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/19/805634cb72d6463eb44657cd591cbc7f.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "THE BORG COIN",
						unitName: "BORG",
					},
				},
				{
					node: {
						id: "1277979657",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/19/06dab2c25c5d43238713e715ce281837.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "BLCKRCK",
						unitName: "ROX",
					},
				},
				{
					node: {
						id: "1279721720",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/09/8bc585ca991b4c68b2766606354cca96.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Phantoms",
						unitName: "phntm",
					},
				},
				{
					node: {
						id: "1282184111",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/26/b5ced5bdedcf4f28a4df44de031e6b47.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Communism Coin",
						unitName: "CMC",
					},
				},
				{
					node: {
						id: "1284444444",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/27/9e4d1ca7fc5a408b87b2f47b50e4749b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Orange",
						unitName: "ORA",
					},
				},
				{
					node: {
						id: "1285225688",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/24/58d44eb4d9ef476499ae789a2f0c50a6.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Barb Coin",
						unitName: "Barb",
					},
				},
				{
					node: {
						id: "1285492943",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/27/ef200efd81b444ad8a70df00d1770250.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Arbitraz",
						unitName: "ARBZ",
					},
				},
				{
					node: {
						id: "1285683351",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/02/04/6a26706622234bfbb01f66cd3d13978f.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Wookfi",
						unitName: "WOOK",
					},
				},
				{
					node: {
						id: "1289298713",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/01/9ac3ebd7ccb44d488fc1d66e6519cace.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Space",
						unitName: "Space",
					},
				},
				{
					node: {
						id: "1290751153",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/28/14c9991e5a9740b8b4aea81eca9e3636.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Dogebarb",
						unitName: "XDB",
					},
				},
				{
					node: {
						id: "1294383366",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/04/4551ebc0e70043a79f8f235d6407fa67.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "OUTSYDE GLOBAL BVI CORP",
						unitName: "OUTSYDE",
					},
				},
				{
					node: {
						id: "1294465507",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/09/d93baac83d034231aa9ef13fe068eff1.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "TRUSTY DIGITAL DAO",
						unitName: "DAOGOV",
					},
				},
				{
					node: {
						id: "1306013327",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2023/12/31/b678397e56924804b6d041f1ebfc712b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "SealsToken 🦭",
						unitName: "SEALS",
					},
				},
				{
					node: {
						id: "1359744886",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/26/c337ec5d1dd94e5589b6bf9da2c5cf74.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Toke",
						unitName: "TOKE",
					},
				},
				{
					node: {
						id: "1387094911",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/09/d80b08a39c724114baad82355122be2f.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Rowdy",
						unitName: "RWDY",
					},
				},
				{
					node: {
						id: "1387238831",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2024/02/06/ce27c59875f84c8b93066b83a1d9bc1a.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "$GOANNA",
						unitName: "GOAN",
					},
				},
				{
					node: {
						id: "1390638935",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/13/eedf1a66b1ba4277b18ac6481e38fdc9.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "MAX COIN",
						unitName: "Max",
					},
				},
				{
					node: {
						id: "1392353330",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/11/0a06ee8701c64addbfd3527077b1cd4b.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Ponchik",
						unitName: "PURR",
					},
				},
				{
					node: {
						id: "1392374998",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/11/aa7df2cb7eb14eba8bb2f5f28c6159d4.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Aramid Voitest",
						unitName: "voi",
					},
				},
				{
					node: {
						id: "1394684562",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/13/5aa6228e6b9e4cb88deb18564ae2b23d.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Golden Billion Coin",
						unitName: "GBC",
					},
				},
				{
					node: {
						id: "1398561305",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/02/01/4a1b5f02920843aab5e2cc13367073f7.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "DJMakode",
						unitName: "DJM",
					},
				},
				{
					node: {
						id: "1405560434",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/18/6e7700d1c315435eb3ec936dda123a07.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "ALGOTVLCORP",
						unitName: "ATC",
					},
				},
				{
					node: {
						id: "1421321088",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/02/17/7ceab08987cb4f9b91e89a9079f521c9.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "OG Squad",
						unitName: "SQUAD",
					},
				},
				{
					node: {
						id: "1425999935",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/26/084df6b54ba243aa9f115b5b0c36bafc.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "FRET",
						unitName: "FRET",
					},
				},
				{
					node: {
						id: "1437818649",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/31/cc0dceb050a04c0e93ffb873be915f61.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "BigBoi",
						unitName: "BIGBOI",
					},
				},
				{
					node: {
						id: "1438913021",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/02/03/70afa853c3184b95a777ddcf9fa70ab9.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Vivitoken",
						unitName: "VIVI",
					},
				},
				{
					node: {
						id: "1447774422",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/02/09/4da80bfb3a3f4f95b53847e1c2fd0ac0.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Satoshi",
						unitName: "SAT",
					},
				},
				{
					node: {
						id: "1453520040",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/05/2761d43909b44c79bc1b60107b700a64.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "GARY",
						unitName: "GARY",
					},
				},
				{
					node: {
						id: "1459508661",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2024/03/05/0ea2c884970c4c27b3cfbbcff17fabb0.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "TRUMPCOIN",
						unitName: "TRUMP",
					},
				},
				{
					node: {
						id: "1590103608",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/02/23/d0aa2ca31d714f118aa90bf5b293eaf5.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "tmack Poker",
						unitName: "TMACK",
					},
				},
				{
					node: {
						id: "1612017486",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/05/8497a54972854e11bef8ecaea115e033.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Dooi",
						unitName: "DOOI",
					},
				},
				{
					node: {
						id: "1612080140",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/05/0eda121017ce4706851d7c5978d74bcc.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Lignina",
						unitName: "LGNN",
					},
				},
				{
					node: {
						id: "1642742254",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/30/e386725033f144f3b604c283f349a2c7.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "PiPhi Network Token Official",
						unitName: "PiPhiN",
					},
				},
				{
					node: {
						id: "1643003311",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/assets-logo-png/2024/03/26/b14c9bd8c84b4157850f8caf7643dbae.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "ComeOnu",
						unitName: "Come",
					},
				},
				{
					node: {
						id: "1643242122",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/25/2015327a54514664845dc6e67ee96121.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "STACIWIFHAT ",
						unitName: "SWIFHAT",
					},
				},
				{
					node: {
						id: "1664954357",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/17/aa0962b28f264e85a56280ed483ce217.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Denarius",
						unitName: "DNRI",
					},
				},
				{
					node: {
						id: "1667526649",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/16/4b63ce1e9e084995a4f2bcff051a7939.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Radioactive Coin",
						unitName: "RDC",
					},
				},
				{
					node: {
						id: "1669576668",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/18/c2da362877604c3e882afd810d5492d8.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Algo Penguins",
						unitName: "PENG",
					},
				},
				{
					node: {
						id: "1669846624",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/17/3bbba093b2fa47b8a1d4a5ef115434c8.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Titanic Catanic",
						unitName: "TC",
					},
				},
				{
					node: {
						id: "1671234093",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/18/2811db2362b140d2997ccad833d10b2c.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "BOOMERANG",
						unitName: "BOOM",
					},
				},
				{
					node: {
						id: "1673529904",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/23/278645995d4a48a09fa3f2fff3e43243.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Not Gonna Make It",
						unitName: "POOR",
					},
				},
				{
					node: {
						id: "1674484158",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/19/ad2265da310f4a4aaa45cadef4324a6d.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Algo ETF ",
						unitName: "AETF",
					},
				},
				{
					node: {
						id: "1677593614",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/21/14ca7db4618744299f085be850b2fbe7.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "OMI Token",
						unitName: "OMI",
					},
				},
				{
					node: {
						id: "1679209072",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/20/b5efc342225a403c88ec30d59837b9a3.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Waifu Coin",
						unitName: "Waifus",
					},
				},
				{
					node: {
						id: "1680103549",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/22/81841ff9f7f14e498fbfe52b2a5934b7.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Just Some Lemon Heads",
						unitName: "JSLH",
					},
				},
				{
					node: {
						id: "1682662165",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/22/ff48d99492a840a7bd54dce69c7847ec.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "ALGO 200",
						unitName: "A200",
					},
				},
				{
					node: {
						id: "1682846697",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/24/c3d069825f114ed3bd2b1dd581c6ec12.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "WEAREFRIENDS",
						unitName: "FRIENDS",
					},
				},
				{
					node: {
						id: "1696994742",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/27/6e0ebfbbc7f143759a8f271e0a4e2732.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "Battle Denarius",
						unitName: "bDNRI",
					},
				},
				{
					node: {
						id: "1709118819",
						icon: {
							png: "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/30/a35afd55b8774a5d8abb90c0cce67a95.png?format=png&height=256&width=256",
							svg: "",
						},
						name: "PYGO",
						unitName: "PYGO",
					},
				},
			],
			totalCount: 613,
		},
	},
};
