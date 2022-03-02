const init = {
    user:[
        { email:"admin", password:"password"}
    ]
}
const signInReducer = (state = init, action) => {
    switch(action.type){
        case 'signIn': console.log("signIn"+action.email+action.password)
    }
    return state
}
export default signInReducer