import fbConfig from "../../config/fbConfig";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore";
export const signUp = (firstName, lastName, email, password) =>{
    return (dispatch, getState, {getFirebase, getFireStore}) =>{
        try{

        
        async function newUser(){
            const user = collection(fbConfig,'User');
            const data={
                firstName,
                lastName,
                email,
                password
            };
            return await addDoc(user, data);
        }
        console.log(newUser().path);
        }catch(e){
            console.log(e);
        }
    }
};
export const signIn = (email, password) =>{
    return (dispatch, getState) =>{
        dispatch({type: 'signIn', email, password});
    }
};