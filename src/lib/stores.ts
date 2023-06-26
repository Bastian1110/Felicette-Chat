import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let initialToken : string | null=  null;
let initialUser : any = {};

if (browser) {
    initialToken = localStorage.getItem('token');
    initialUser = JSON.parse(localStorage.getItem('user') || '{}')
}

function createAuthStore() {
	const { subscribe, set, update } = writable({
		token: initialToken,
		user: initialUser
	});

    return {
        subscribe,
        setToken : (tokenValue : string | null ) => {
            if(browser && tokenValue){
                localStorage.setItem('token', tokenValue)
                update(state => ({... state, token : tokenValue }))
            }else{
                localStorage.removeItem('token')
                update(state => ({... state, token : null}))
            }
        },
        setUser : (userValue : any) => {
            if(browser && userValue && typeof userValue === 'object'){
                localStorage.setItem('user', JSON.stringify(userValue))
                update(state => ({... state, user : userValue}))
            }else{
                localStorage.removeItem('user')
                update(state => ({... state, user : {}}))
            }
        },
        logout: () => {
            if(browser){
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
            set({token : null, user : {}})
        }
    }
}

export const auth = createAuthStore();