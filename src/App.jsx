import logo from './logo.svg';
import './App.css';
import MyButton from './components/MyButton';
import { PlusOutlined } from '@ant-design/icons';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bienvenue sur l'application de gestion de listes
        </p>
        <MyButton
          tooltip="Ajouter une liste"
          icon={<PlusOutlined />}
          onClick={() => console.log("le bouton a été cliqué")}
          >Ajouter une liste
          </MyButton>
      </header>
    </div>
  );
}

