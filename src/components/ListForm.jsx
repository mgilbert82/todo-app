import React from 'react';
import { Input } from 'antd';


export default function ListForm(props) {
    function handleChange(event) {
    switch (event.target.name) {
        case "name":
            props.setName(event.target.value);
            break;
        case "color":
            props.setColor(event.target.value);
            break;
        default:
            break;
        }
        
    }
    return (
        <form>
            <label htmlFor="name">Nom</label>
            <Input
                placeholder="Titre de la liste"
                name='name'
                id='name'
                value={props.name}
                onChange={handleChange}
            />
            <label htmlFor="color">Couleur</label>
            <Input
                type='color'
                name='color'
                    id='color'
                value={props.color}
                onChange={handleChange}
            />
        </form>
    )
}