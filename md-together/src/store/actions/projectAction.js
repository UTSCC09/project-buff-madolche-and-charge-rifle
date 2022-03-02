export const creatProject = (name, owner, value) =>{
    return (dispatch, getState) =>{
        dispatch({type: 'create', name, owner, value});
    }
};