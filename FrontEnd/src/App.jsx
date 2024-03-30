import { useState , useEffect} from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState([{}]);
  
  const fetchData = async () => {
    const response = await axios.get('http://localhost:5000/members');
    console.log(response.data.members)
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      
    </>
  )
}

export default App
