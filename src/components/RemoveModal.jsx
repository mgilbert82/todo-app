import { Button, Modal } from 'antd';
import Fire from '../Fire';
import React, { useState } from 'react';


export default function RemoveModal(props) {
    const [error, setError] = useState(null);
  
  function handleSubmit() {
    const firebase = new Fire((err) => {
        if (err) {
            setError(err);
        } else {
            firebase.deleteList(props.list);
            props.onClose();
        }
    })
}
    return (
        <Modal
            title = {props.title}
            open={props.isOpen}
            onCancel={props.onClose}
            footer ={[
                <>
                    <Button type="ghost" onclick={props.onClose}>
                        Annuler
                    </Button>
                    <Button type="danger" onclick={handleSubmit}>
                        Supprimer
                    </Button>
                </>
            ]}
        >
            Êtes-vous sûr.e de vouloir supprimer la liste
            <span style={{ color:props.list.color, fontWeight:'bold' }}>
                {props.list.name}
            </span> ?
            {error && (<p className="text-danger">Erreur: {error.message}</p>)}
        </Modal>
  )
}
