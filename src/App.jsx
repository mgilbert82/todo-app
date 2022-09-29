import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MyButton from './components/MyButton';
import ListModal from './components/ListModal';
import { PlusOutlined } from '@ant-design/icons';
import Fire from './Fire';
import { Spin } from 'antd';
import ListCard from './components/ListCard';


export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState(true);
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
  
 return ( 
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo m-5" alt="logo" />
        <p>
          Bienvenue sur l'application de gestion de listes
        </p>
        {error && (<p className="text-danger">Erreur: {error.message}</p>)}
        {loading ? <Spin className='mt-5'/> : (
          <div className="d-flex flex-wrap justify-content-center m-3">
            {lists.map(list => (
                <ListCard
                  key={list.id}
                  list={list}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedList={setSelectedList}
                  />
                  ))}
          </div>
        )}
        <MyButton
          tooltip="Ajouter une liste"
          className="mb-5"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
          >Ajouter une liste   
        </MyButton>
        
        {isModalOpen && (
          <ListModal
          list={selectedList}
          modalTitle={selectedList ? "Modifier la liste" : "Ajouter une liste"}
          isOpen={isModalOpen}
          handleCancel = {()=> setIsModalOpen(false)}       
        />
        )}
      </header>
    </div>
  );
}


