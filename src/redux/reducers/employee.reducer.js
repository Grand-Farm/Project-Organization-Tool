const employeeReducer = (state =[], action) => {
    if (action.type === "GET_EMPLOYEE") {
      return action.payload
    }
    return state
  };


  export default employeeReducer;