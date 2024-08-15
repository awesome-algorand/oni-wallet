
type AkitaKennelTraits = {
    Name: string,
    Head: string,
    Eyes: string,
    Snout: string,
    Body: string,
    Back: string,
    Skin: string,
    Background: string,
}

type Collection = {
    id: string
    image: string,
    traits?: AkitaKennelTraits
}
export function ExplorePage(){
    const collections: {[k: string]: Collection[]} = {
        "MNGO": [{
            id: "M1",
            image: "https://images.shufl.app/MNGO/MNGO2170.jpg?optimizer=image&width=260",
        },],
        "Mostly Frens": [{
            id: "MF1",
            image: "https://ipfs.algonode.xyz/ipfs/bafybeifz56ch7lm7xbi4zheig4k35xx3qpsq3qnygnyh54nubv2coxncb4?optimizer=image&width=800",
        },],
        "Akita Kennel Club": [
            {
                id: "1",
                image: "https://nft.akita.community/static/media/AKC0001.1d73bd7dff1c50ef009f.webp",
                traits: {
                    Name: "Akita #0001",
                    Head: "Base",
                    Eyes: "Base",
                    Snout: "Base",
                    Body: "Base",
                    Back: "Base",
                    Skin: "Red Fur",
                    Background: "Purple Swirl",
                }
            },
            //https://nft.akita.community/static/media/AKC0002.ba6747fa39df104aea8a.webp
            {
                id: "2",
                image: "https://nft.akita.community/static/media/AKC0002.ba6747fa39df104aea8a.webp",
                traits: {
                    Name: "Akita #0002",
                    Head: "Base",
                    Eyes: "Base",
                    Snout: "Base",
                    Body: "Base",
                    Back: "Base",
                    Skin: "Brown Brindle Fur",
                    Background: "Purple Swirl",
                }
            },
            //https://nft.akita.community/static/media/AKC0003.77416f32251c563e0c6f.webp
            {
                id: "3",
                image: "https://nft.akita.community/static/media/AKC0003.77416f32251c563e0c6f.webp",
                traits: {
                    Name: "Akita #0003",
                    Head: "Base",
                    Eyes: "Base",
                    Snout: "Base",
                    Body: "Base",
                    Back: "Base",
                    Skin: "Blue Brindle Fur",
                    Background: "Purple Swirl",
                }
            },
            //https://nft.akita.community/static/media/AKC0004.4342ae16db371cb769ed.webp
            {
                id: "4",
                image: "https://nft.akita.community/static/media/AKC0004.4342ae16db371cb769ed.webp",
                traits: {
                    Name: "Akita #0004",
                    Head: "Base",
                    Eyes: "Base",
                    Snout: "Base",
                    Body: "Base",
                    Back: "Base",
                    Skin: "Polar Fur",
                    Background: "Purple Swirl",
                }

            },

            //https://nft.akita.community/static/media/AKC0005.51da74562eac9149f8a9.webp
            {
                id: "5",
                image: "https://nft.akita.community/static/media/AKC0005.51da74562eac9149f8a9.webp",
                traits: {
                    Name: "Akita #0005",
                    Head: "Base",
                    Eyes: "Base",
                    Snout: "Base",
                    Body: "Base",
                    Back: "Base",
                    Skin: "Marble",
                    Background: "Purple Swirl",
                }
            },
            //https://nft.akita.community/static/media/AKC0006.fa384f0335dd87d36c99.webp
            {
                id: "6",
                image: "https://nft.akita.community/static/media/AKC0006.fa384f0335dd87d36c99.webp",
                traits: {
                    Name: "Akita #0006",
                    Head: "Base",
                    Eyes: "Base",
                    Snout: "Base",
                    Body: "Base",
                    Back: "Base",
                    Skin: "Acid",
                    Background: "Purple Swirl",
                }
            },
            //https://nft.akita.community/static/media/AKC0007.903e2b708f3b010ec340.webp
            {
                id: "7",
                image: "https://nft.akita.community/static/media/AKC0007.903e2b708f3b010ec340.webp",
                traits: {
                    Name: "Akita #0007",
                    Head: "Base",
                    Eyes: "Base",
                    Snout: "Base",
                    Body: "Base",
                    Back: "Base",
                    Skin: "Rainbow",
                    Background: "Purple Swirl",
                }
            },
            //https://nft.akita.community/static/media/AKC0008.45987b18a036caea152d.webp
            {
                id: "8",
                image: "https://nft.akita.community/static/media/AKC0008.45987b18a036caea152d.webp",
                traits: {
                    Name: "Akita #0008",
                    Head: "Base",
                    Eyes: "Base",
                    Snout: "Base",
                    Body: "Base",
                    Back: "Base",
                    Skin: "Gold",
                    Background: "Purple Swirl",
                }
            },
        ]
    }
    return (
        <div className="grid grid-cols-2 gap-2 px-2">
            {Object.keys(collections).map((key) => (
                <img key={collections[key][0].id} className="h-34 rounded-2xl border" src={collections[key][0].image} alt={collections[key][0].traits?.Name || key}/>
            ))}
        </div>
    )
}
