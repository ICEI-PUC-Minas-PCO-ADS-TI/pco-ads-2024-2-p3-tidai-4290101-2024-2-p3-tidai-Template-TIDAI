import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MenuSecretario from './views/secretario/menu';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MenuSecretario />
      </BrowserRouter>
    </div>
  );
}

export default App;