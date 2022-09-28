import { Card, Checkbox } from 'antd';
import React from 'react';
import IconButton from './IconButton';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';


export default function ListCard(props) {
    return(
        <Card
            title={
                <p style={{ color:props.list.color }}>{props.list.name}</p>
            }
            style={{ width:300 }}
            className="m-3"
            >
                {props.list.tasks.length <= 0 && (
                    <p>Aucune tâche pour cette liste</p>
                )}
                {props.list.tasks.map(task => (
                    <div>
                    <Checkbox>
                    <p>{task.title}</p>
                    </Checkbox>
                    </div>
                ))}
                <IconButton
                    tooltip="Ajouter une tâche"
                    type="link"
                    icon={<PlusCircleOutlined className="text-success fs-5"/>}
                    onClick={() => console.log("Ajouter une tâche")}
                />
                <div className="d-flex justify-content-between">
                    <p>
                    <IconButton
                    tooltip="Modifier la liste"
                    type="primary"
                    icon={<EditOutlined className="text-light fs-5"/>}
                    onClick={() => {
                        props.setIsModalOpen(true);
                        props.setSelectedList(props.list);
                    }}
                    />
                    </p>
                    <p>
                    <IconButton
                    tooltip="Supprimer la liste"
                    type="danger"
                    icon={<DeleteOutlined className="text-light fs-5"/>}
                    onClick={() => console.log("Ajouter une tâche")}
                />
                    </p>
                </div>
        </Card>
    );
}