import signInReducer from "./signInReducer";
import projectReducer from "./projectReducer";
import signUpReducer from "./signUpReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    signIn: signInReducer,
    signUp: signUpReducer,
    project: projectReducer
})

export default rootReducer