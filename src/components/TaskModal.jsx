import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import TaskForm from './TaskForm';
import Fire from '../Fire';


export default function TaskModal(props) {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");

    function handleSubmit() {
        const firebase = new Fire((err) => {
            if (err) {
                setError(err);
            } else {
                const newTask = {
                    "title": title,
                    "completed": false,
                }
                const list = {
                    ...props.list,
                    "tasks": [...props.list.tasks, newTask]
                }
                firebase.updateList(list);
                props.onClose();
            }
        })
    }
  return (
    <Modal
        title={props.modalTitle}
        open={props.isOpen}
        onCancel={props.onClose}
        footer={[
            <>
                <Button type="primary" onClick={props.onClose} >
                    Annuler
                </Button>
                <Button type="primary" onClick={handleSubmit} >
                    Créer
                </Button>
        </>
            
        ]}
    >
        {error && (<p className='text-danger'>Erreur: {error.message}</p>)}
        <TaskForm title={title} setTitle={setTitle}/>
    </Modal>
    )
}
