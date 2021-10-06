const AppointmentReducer = (state = { appointments: [] }, action) => {
    switch (action.type) {
        case "ADD":
            return { ...state, appointments: [...state.appointments, action.payload] }

        case "REPLACEALL":
            return { ...state, appointments: action.payload }

        case "DELETE":
            return { ...state, appointments: state.appointments.filter(app => app.id !== action.payload) };

        default:
            return state
    }
}

export default AppointmentReducer