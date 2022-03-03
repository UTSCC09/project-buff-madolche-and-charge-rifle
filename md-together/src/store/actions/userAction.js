import fbConfig from "../../config/fbConfig";
import Cookies from 'universal-cookie';
import { getFirestore, collection, getDocs, doc, setDoc, addDoc, FieldValue,Timestamp } from "firebase/firestore";
export const signUp = (firstName, lastName, email, password) =>{
    return (dispatch,getState) =>{
        const data={
            firstName,
            lastName,
            email,
            password,
            timestamp: new Date()
        };
        fbConfig.collection("User").add(data)
        .then(function(data){
            console.log(data.id);
            let cookie = new Cookies();
            cookie.set("userId",data.id,{path:'/', maxAge:3600});
            dispatch({type: 'signUp', firstName, lastName, email, password});
        }).catch(function(err){
            console.log(err);
            dispatch({type: 'signUpErr'});
        });
    }
};
export const signIn = (email, password) =>{
    return (dispatch, getState) =>{
        fbConfig.collection("User").where("email",'==',email).where('password','==',password).get()
        .then(function(data){
            // console.log(data.docs[0].id);
            // console.log(data.docs[0].data());
            let cookie = new Cookies();
            cookie.set("userId",data.docs[0].id,{path:'/', maxAge:3600});
            dispatch({type: 'signIn', email, password});
        }).catch(function(err){
            console.log(err);
            dispatch({type: 'signInErr'});
        });
        
    }
};

export const getUserSpace = () =>{
    return (dispatch, getState) =>{
        let cookie = new Cookies();
        let userId = cookie.get('userId');
        fbConfig.collection("userSpace").where("user","==", userId).get()
        .then(function(data){
            return dispatch({type:'getUserSpace', data:data});
        }).catch(function(err){
            console.log(err);
            return dispatch({type:'getUserSpaceErr', err:err})
        })
    }
};