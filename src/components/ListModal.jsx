import React from 'react';
import { Modal, Button } from 'antd';
import ListForm from './ListForm';
import { useState } from 'react';
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
                firebase.addList(list);
            }
        });
        props.handleCancel();
    }
return (
    <Modal
        title={props.modalTitle}
        open={props.isOpen}
        onCancel={props.handleCancel}
        footer={[
            <Button
                type="primary"
                onClick={handleSubmit}
            >
            {props.list ? "Modifier" : "Créer une liste"}
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