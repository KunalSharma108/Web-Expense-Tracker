import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './templates/loading';
import Online from './templates/Online';
import Offline from './templates/offline';

function App() {
  const [backEndonline, setBackendOnline] = useState('loading');

  const fetchData = async () => {
    let tries = 1;
    while (tries < 3) {
      try {
        const response = await axios.get('http://localhost:5000/isOnline');
        if (response.data === 'online') {
          setBackendOnline(true);
          break;
        } else {
          setBackendOnline('loading');
          tries += 1;
          if (tries >= 3) {
            setBackendOnline(false);
          }
        }
      } catch (error) {
        console.log(`There was an error: ${error}`);
        setBackendOnline('loading');
        tries += 1;
        if (tries >= 3) {
          setBackendOnline(false);
        }
      }
    }
  };


  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      {
        backEndonline == 'loading' ? <Loading /> : backEndonline == true ? <Online /> : <Offline />
      }
    </div>
  )
}

export default App
