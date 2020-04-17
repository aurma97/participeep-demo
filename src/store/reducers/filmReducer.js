const initState = {
    films: [],
}

export const filmReducer = (state = initState, action) => {
    let films = [];
    switch (action.type) {
        case 'DELETE_FILM':
            films = action.films;            
            state = {
                ...state,
                films
            }
            return state;
            break;
        
        case 'GET_FILMS':
            films = action.films;            
            state = {
                ...state,
                films
            }

            return state;
            break;

        default:
            return state;
            break;
    }
}
