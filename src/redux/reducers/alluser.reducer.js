const AllUserReducer = (state = [], action) => {
    switch (action.type) {
        case 'GETALL_USERS':
            return action.payload;
        default:
            return state;
    }
  }


  export default AllUserReducer;