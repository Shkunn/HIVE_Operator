//REDUCER
let defaultState = {
    selectedRobotProblem: {
        robotProblem: 0,
    }
}

let robotProblemReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ROBOT_PROBLEM': {
            let newState = { ...state };
            newState.selectedRobotProblem = {
                robotProblem: action.payload,
            };

            // console.log('NEW LOCATION : ', newState);
            return newState
        }

        default:
            return state
    }
};

export default robotProblemReducer;
