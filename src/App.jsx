import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import MyButton from './components/MyButton';
import { PlusOutlined } from '@ant-design/icons';
import ListModal from './components/ListModal';
import Fire from './Fire';
import { Spin } from 'antd';
import ListCard from './components/ListCard';


export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lists, setLists] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const firebase = new Fire((error) => {
      if (error) {
        setError(error);
      } else {
        firebase.getLists(lists => {
          setLists(lists);
          setLoading(false);
        });
      }
      return function unsubscribe() {
        firebase.detach();
      }
    });
  }, []);
  console.log(lists, loading);
 return ( 
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bienvenue sur l'application de gestion de listes
        </p>
        {loading ? <Spin/> : (
          <div className="d-flex flex-wrap ">
            {lists.map(list => (
                <ListCard
                  list={list}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedList={setSelectedList}
                  />
            ))}
          </div>
        )}
        <MyButton
          tooltip="Ajouter une liste"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          >Ajouter une liste
        </MyButton>
        
        <ListModal
          isOpen={isModalOpen}
          handleCancel = {()=> setIsModalOpen(false)}
          modalTitle={selectedList ? "Modifier la liste" : "Ajouter une liste"}
          list={selectedList}
        />
      </header>
    </div>
  );
}

