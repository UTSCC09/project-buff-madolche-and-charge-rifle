const init = {
    user:[
        {firstName: "admin", lastName:"admin", email:"admin", password:"password"}
    ]
}
const signUpReducer = (state = init, action) => {
    switch(action.type){
        case 'signUp': console.log("signUp successfully")
        case 'signUpErr': console.log("signUp Error")
        default: console.log();
    }
    return state
}
export default signUpReducer