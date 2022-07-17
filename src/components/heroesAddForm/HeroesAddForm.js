import { useDispatch } from "react-redux";
import { useState } from "react";
import { addHeroFromArray } from "../../actions";
import {v4 as uuidv4} from 'uuid';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [name , setName] = useState();
    const [description , setDescription] = useState('');
    const [element , setElement] = useState('')
    const id = uuidv4();
    const dispatch = useDispatch();

    const addHero = ()=>{ 
        dispatch(addHeroFromArray({name , description , element , id}))
        setName(''); 
        setDescription(''); 
        document.getElementById('element').value = "Я владею элементом...";
        setElement('')
    }

    return (
        <form className="border p-4 shadow-lg rounded" >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    value={description}
                    onChange={(e)=>{
                        setDescription(e.target.value)
                    }}
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    onChange={(e)=>{
                        setElement(e.target.value)
                    }}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary"
            onClick={(e)=>{
                e.preventDefault()
                addHero()}}
            >Создать</button>
        </form>
    )
}

export default HeroesAddForm;