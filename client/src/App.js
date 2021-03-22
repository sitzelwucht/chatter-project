
import './App.css';
import Dashboard from './components/Dashboard';
import Login from  './components/Login'
import useLocalStorage from './hooks/useLocalStorage';
import { ConversationsProvider } from './contexts/ConversationsProvider';
import { ContactsProvider } from './contexts/ContactsProvider';
import { SocketProvider } from './contexts/SocketProvider';

function App() {

  const [id, setId] = useLocalStorage('id')

  return (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
        { id ? <Dashboard id={id} /> : <Login onIdSubmit={setId} /> }
        </ConversationsProvider>
      </ContactsProvider>
     </SocketProvider>
    
  );
}

export default App;
