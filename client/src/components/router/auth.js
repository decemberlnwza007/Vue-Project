export function getAuth(){
    return !!localStorage.getItem('token')
}

export function logOut(){
    localStorage.removeItem('token')
}