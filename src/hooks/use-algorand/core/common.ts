/**
 * Composition of algosdk JSONRequest
 *
 * Use an object literal instead of function chaining
 *
 * @param jsonRequest The jsonRequest to apply the queries to
 * @param {Record<string, any>} [query] Queries to apply to the jsonRequest
 */
export function applyQuery<T>(jsonRequest: T, query: Record<string, any>={}){
    Object.keys(query).forEach(key => {
        //@ts-expect-error, jsonRequest[key] is a function
        jsonRequest = jsonRequest[key](query[key]);
    })

    return jsonRequest
}
