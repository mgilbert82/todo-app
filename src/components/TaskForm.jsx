import { Input } from 'antd'
import React from 'react'

export default function TaskForm(props) {
    function handleChange(event) {
        props.setTitle(event.target.value);
    }
    return (
        <form>
            <label htmlFor="title">Nom</label>
            <Input
                placeholder="Nom de la tâche"
                name='title'
                id='title'
                value={props.title}
                onChange={handleChange}
            />
        </form>
    )
}
