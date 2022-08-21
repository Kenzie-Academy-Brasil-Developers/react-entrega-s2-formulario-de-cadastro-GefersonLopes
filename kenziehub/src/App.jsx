import './App.css';
import { AuthProvider } from './Components/../Context/Auth';
import { Rotes } from './Routes';

function App() {

  return (
    <AuthProvider>
      <Rotes />
    </AuthProvider>
  );
}

export default App;
 