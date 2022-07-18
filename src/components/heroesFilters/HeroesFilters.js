import { useDispatch } from "react-redux";
import { filterHeroFromArray } from "../../actions";
import { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const [filters , setFilters] = useState([])
    const {request} = useHttp()
    const [elem , setElem] = useState('all');
    const heroes = useSelector(state=>state.heroes)
    const dispatch = useDispatch();

    const heroFilter = (el)=>{ 
        setElem(el.target.value);
        dispatch(filterHeroFromArray(el.target.value));
    }

    useEffect(()=>{ 
    dispatch(filterHeroFromArray(elem))
    }, [heroes])
    

    useEffect(()=>{ 
        request('http://localhost:3001/filters/')
            .then(data=> {
                const filters = data.map((el , index)=>{
                    let classStyle = (i)=>{ 
                        if (i===0){
                          return  'btn btn-outline-dark'
                        } 
                        else if (i===1){
                           return  "btn btn-danger"
                        } 
                       else  if (i===2){
                           return "btn btn-primary"
                       }
                        else if (i===3){
                           return "btn btn-success"
                        }
                       else  if (i===4){
                           return "btn btn-secondary"
                       }
                    }
                    return <button key={index} onClick={heroFilter} value={el} className={`${classStyle(index)} ${el === elem ? 'active' : null}`}>{el}</button>
            })
                setFilters(filters)
            })
    } , [])
        


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;