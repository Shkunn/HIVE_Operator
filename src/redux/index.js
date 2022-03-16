import { combineReducers } from 'redux'

import robotReducer from './reducers/robotReducer'
import robotOnReducer from './reducers/countRobotOn'
import robotProblemReducer from './reducers/countRobotProblem'

const reducers = combineReducers({
    robotReducer: robotReducer,
    robotOnReducer : robotOnReducer,
    robotProblemReducer: robotProblemReducer
})

export default reducers
