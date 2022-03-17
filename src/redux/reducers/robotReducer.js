//REDUCER
let defaultState = {
    selectedRobot: {
        robot: '',
    }
}

let robotReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ROBOT': {
            let newState = { ...state };
            newState.selectedRobot = {
                robot: action.payload,
            };

            // console.log('NEW LOCATION : ', newState);
            return newState
        }

        default:
            return state
    }
};

export default robotReducer;
