export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDeleteFromArray =(id)=>({
    type: 'HERO_DELETE',
    payload: id
})

export const addHeroFromArray =(newHero)=>({ 
    type: 'HERO_ADD',
    payload: newHero
})

export const filterHeroFromArray = (element)=>({
    type: 'HERO_FILTER', 
    payload: element
})

export const changeHeroFetch =()=>({
    type: 'HERO_CHANGE_FETCH'
})