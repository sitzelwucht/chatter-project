
import './App.css';
import Dashboard from './components/Dashboard';
import Login from  './components/Login'
import { ConversationsProvider } from './contexts/ConversationsProvider';
import { ContactsProvider } from './contexts/ContactsProvider';
import useLocalStorage from './hooks/useLocalStorage';

function App() {

  const [id, setId] = useLocalStorage('id')

  return (
    <ContactsProvider>
    <ConversationsProvider id={id}>
    { id ? <Dashboard id={id} /> : <Login onIdSubmit={setId} /> }
     </ConversationsProvider>
     </ContactsProvider>
    
  );
}

export default App;
