import { useDispatch } from "react-redux";
import { filterHeroFromArray } from "../../actions";
import { useState , useEffect } from "react";
import { useSelector } from "react-redux";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const [elem , setElem] = useState(null);
    const heroes = useSelector(state=>state.heroes)
    const dispatch = useDispatch();

    const heroFilter = (el)=>{ 
        setElem(el.target.value);
        dispatch(filterHeroFromArray(el.target.value));
    }

    useEffect(()=>{ 
    dispatch(filterHeroFromArray(elem))
    }, [heroes])
    
    // const styleClassBtn = (e , style)=>{ 
    //     return `${style} ${e.target.value==elem ? 'active' : null}`
    // }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button onClick={heroFilter} value={null} className={`btn btn-outline-dark ${'' === elem ? 'active' : null}`}>Все</button>
                    <button onClick={heroFilter} value={'fire'} className={`btn btn-danger ${'fire' == elem ? 'active' : null}`} >Огонь</button>
                    <button onClick={heroFilter} value={'water'} className={`btn btn-primary ${'water' == elem ? 'active' : null}`}>Вода</button>
                    <button onClick={heroFilter} value={'wind'} className={`btn btn-success ${'wind'== elem ? 'active' : null}`}>Ветер</button>
                    <button onClick={heroFilter} value={'earth'} className={`btn btn-secondary ${'earth' == elem ? 'active' : null}`}>Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;