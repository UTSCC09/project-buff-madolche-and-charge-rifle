import fbConfig from "../../config/fbConfig";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
export const signUp = (firstName, lastName, email, password) =>{
    return (dispatch, getState, {getFirebase, getFireStore}) =>{
        try{
        const add = await addDoc(collection(fbConfig, "User"),{
            firstName,
            lastName,
            email,
            password
        });
        console.log("SignUp yes!");
    }catch(e){
        console.log(e);
    }
        // fbConfig().collection("User").add({
        //    console.log(fbConfig);
        //     firstName,
        //     lastName,
        //     email,
        //     password
        // }).then(() => {
        //     dispatch({type: 'signUp', firstName,lastName, email, password});
        // }).catch((err) =>{
        //     dispatch({type: 'signUpErr', err});
        // })
    }
};
export const signIn = (email, password) =>{
    return (dispatch, getState) =>{
        dispatch({type: 'signIn', email, password});
    }
};