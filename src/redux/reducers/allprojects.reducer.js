const AllProjectsReducer = (state =[], action) => {
    if (action.type === "GET_ALLPROJECTS") {
      return action.payload
    }
    return state
  };


  export default AllProjectsReducer;