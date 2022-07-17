const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }            
        case 'HERO_DELETE': 
            return { 
                ...state, 
                heroes: state.heroes.filter(el=>el.id!=action.payload)
            }
        // case 'HERO_DELETE_FETCH': 
        // return { 
        //     ...state, 
        //     heroes: state.heroes.filter(el=>el.id===action.payload)
        // }
        case "HERO_ADD": 
            return { 
                ...state, 
                heroes: [...state.heroes , action.payload]
            }
        case "HERO_FILTER": 
            if (action.payload) { 
            return { 
                ...state, 
                filters: state.heroes.filter(el=>el.element===action.payload)
            }}
            else { 
                return { 
                    ...state, 
                    filters: state.heroes
                }
            }
        default: return state
        
    }
}

export default reducer;