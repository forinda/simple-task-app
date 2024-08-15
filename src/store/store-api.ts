export function useStoreApi() {
    return {
        serialize<T=any>(key:string,value:T){
            localStorage.setItem(key,JSON.stringify(value));
        },
        deserialize<T extends Record<string, any>>(key:string,defaultState:T={} as T){
            return JSON.parse(localStorage.getItem(key)!)??defaultState as T
        }
    }
}

export const storage = useStoreApi()