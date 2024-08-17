
//https://arc.algorand.foundation/ARCs/arc-0026
type AlgorandURI = {
    address: string,
    label?: string,
    amount?: number,
    asset?: number,
    note?: string,
    xnote?: string,
}
export function toDeepLink(data: AlgorandURI): string {
    let uri = `algorand://${data.address}`
    if(data.label) uri += `?label=${data.label}`
    if(data.amount) uri += `&amount=${data.amount}`
    if(data.asset) uri += `&asset=${data.asset}`
    if(data.note) uri += `&note=${data.note}`
    if(data.xnote) uri += `&xnote=${data.xnote}`
    return uri
}
