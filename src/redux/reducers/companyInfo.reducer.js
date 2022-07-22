const companyInfo = (state = [], action) => {
    switch (action.type){
        case 'SET_COMPANYINFO':
            return action.payload;
        default:
            return state;
    }
}

export default companyInfo;