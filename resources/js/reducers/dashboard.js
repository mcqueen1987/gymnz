
const initState = {
    test:"2222121"
};

const dashboard = (state = initState, action) => {
    switch(action.type){
        case 'INIT_DATA' :
            return {...state};
        default:
            return state
    }
};

export default dashboard;