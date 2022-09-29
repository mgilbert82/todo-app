import React, { useState } from "react";
import { Modal, Button } from 'antd';
import ListForm from './ListForm';
import Fire from '../Fire';


export default function ListModal(props) {
    const [name, setName] = useState(props.list ? props.list.name : "");
    const [color, setColor] = useState(props.list ? props.list.color : "#47B5FF");
    const [error, setError] = useState(null);

    function handleSubmit(props) {
        const firebase = new Fire((error)=> {
            if (error) {
                setError(error);
            } else {
                const list = {
                    "name": name,
                    "color": color,
                    "tasks": []
                }
                if (props.list) {
                    list.id = props.list.id;
                    list.tasks = props.list.tasks;
                    firebase.updateList(list);
                } else {
                    firebase.addList(list);
                }
            }
        })
        props.handleCancel();
    }
return (
    <Modal
        title={props.modalTitle}
        open={props.isOpen}
        onCancel={props.handleCancel}
        footer={[
            <Button type="primary" onClick={handleSubmit} >
            {props.list ? "Modifier" : "Créer"}
            </Button>
        ]}
    >
        {error && <p>Une erreur est survenue</p>}
        <ListForm
            name={name}
            color={color}
            setName={setName}
            setColor={setColor}
            />
      </Modal>
    );
}