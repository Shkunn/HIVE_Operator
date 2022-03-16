//REDUCER
let defaultState = {
    selectedRobotOn: {
        robotOn: 0,
    }
}

let robotOnReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ROBOT_ON': {
            let newState = { ...state };
            newState.selectedRobotOn = {
                robotOn: action.payload,
            };

            // console.log('NEW LOCATION : ', newState);
            return newState
        }

        default:
            return state
    }
};

export default robotOnReducer;
