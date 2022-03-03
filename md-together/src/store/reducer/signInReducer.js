const init = {
    user:[
        { email:"admin", password:"password"}
    ]
}
const signInReducer = (state = init, action) => {
    switch(action.type){
        case 'signIn': console.log("signIn");
        case "signInErr": console.log("signIn Error");
        defualt: console.log();
    }
    return state
}
export default signInReducer