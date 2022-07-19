//giving us an array of projects to later map over

const projectsReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_PROJECTS':
            return action.payload;
        default:
            return state;
    }
  }


  export default projectsReducer;