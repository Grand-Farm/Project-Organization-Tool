const activityReducer = (state =[], action) => {
    if (action.type === "GET_ACTIVITY") {
      return action.payload
    }
    return state
  };


  export default activityReducer;