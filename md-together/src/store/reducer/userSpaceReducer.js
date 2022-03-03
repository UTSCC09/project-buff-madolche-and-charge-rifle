import { collapseClasses } from "@mui/material";

const init = {
    userSpace:[
        {project:"project", user:"admin"}
    ]
}
const userSpcaeReducer = (state = init, action) => {
    switch(action.type){
        case 'getUserSpace': 
        return action.data;
        case 'getUserSpaceErr': console.log("getUserSpace Error")
        default: console.log();
    }
    return state
}
export default userSpcaeReducer