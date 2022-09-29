import React, { useState } from 'react';
import { Card } from 'antd';
import Checkbox from "antd/lib/checkbox/Checkbox";
import IconButton from './IconButton';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import RemoveModal from './RemoveModal';
import TaskModal from './TaskModal';

export default function ListCard(props) {
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    
    return(
        <>
            <Card
                title={
                    <p style={{ color:props.list.color }}>{props.list.name}</p>
                }
                style={{ width: 300 }}
                className="m-3"
            >
                {props.list.tasks.length <= 0 && (
                    <p>Aucune tâche pour cette liste</p>
                )}
                {props.list.tasks.map(task => (
                    <div key={task.title}>
                        <Checkbox>
                            <p>{task.title}</p>
                        </Checkbox>
                    </div>
                ))}

                <IconButton
                    tooltip="Ajouter une tâche"
                    type="link"
                    icon={<PlusCircleOutlined className="text-success fs-5"/>}
                    onClick={() => setIsTaskModalOpen(true)}
                />

                <div className="d-flex justify-content-between">
                    <IconButton
                        tooltip="Modifier la liste"
                        type="primary"
                        icon={<EditOutlined className="text-light fs-5"/>}
                        onClick={() => {
                            props.setIsModalOpen(true);
                            props.setSelectedList(props.list);
                        }}
                    />
                    <IconButton
                        tooltip="Supprimer la liste"
                        type="danger"
                        icon={<DeleteOutlined className="text-light fs-5"/>}
                        onClick={() => setIsRemoveModalOpen(true)}
                    />
                </div>
        </Card>

        <RemoveModal
                list={props.list}
                isOpen={isRemoveModalOpen}
                title={`Supprimer la liste ${props.list.name} ?`}
                onClose={() => setIsRemoveModalOpen(false)}
            />
        <TaskModal
            list={props.list}
            isOpen={isTaskModalOpen}
            title={`Ajouter une tâche ${props.list.name} ?`}
            onClose={() => setIsTaskModalOpen(false)}
        />
        </>
    );
}