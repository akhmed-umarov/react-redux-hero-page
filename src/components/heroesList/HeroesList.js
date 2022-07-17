import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {heroDeleteFromArray, heroesFetching, heroesFetched, heroesFetchingError , filterHeroFromArray} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { useCallback } from 'react';
// import { Transition } from "react-transition-group";


// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus , filters} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();


    // const duration = 300;

    // const defaultStyle = {
    //   transition: `opacity ${duration}ms ease-in-out`,
    //   opacity: 0,
    // }
    
    // const transitionStyles = {
    //   entering: { opacity: 1 },
    //   entered:  { opacity: 1 },
    //   exiting:  { opacity: 0 },
    //   exited:  { opacity: 0 },
    // };



    const deleteHero = useCallback((id)=> { 
        dispatch(heroDeleteFromArray(id))
    }, [])

    // const fetchDeleteHero = useCallback((id)=>{ 
    //     request(`http://localhost:3001/heroes/${id}` , "DELETE" , {"id": 1,
    //     "name": "Первый герой",
    //     "description": "Первый герой в рейтинге!",
    //     "element": "fire"})
    // },[])


    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .then(()=>dispatch(filterHeroFromArray(null)))
            .catch(() => dispatch(heroesFetchingError()))
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }




    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        // return arr.map(({id, ...props}) => {
        //     return <HeroesListItem key={id} {...props} deleteHero={()=>{deleteHero(id)}}/>
        // })

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} deleteHero={()=>{deleteHero(id)}}/>
        })
    }

    const elements = renderHeroesList(filters);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;