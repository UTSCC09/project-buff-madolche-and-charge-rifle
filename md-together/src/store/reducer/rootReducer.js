import signInReducer from "./signInReducer";
import projectReducer from "./projectReducer";
import signUpReducer from "./signUpReducer";
import userSpcaeReducer from "./userSpaceReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    signIn: signInReducer,
    signUp: signUpReducer,
    project: projectReducer,
    userSpace: userSpcaeReducer,
})

export default rootReducer