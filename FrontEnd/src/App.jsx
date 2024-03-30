import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState([{}]);
  const [backEndonline, setBackendOnline] = useState(false)

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/isOnline');
      console.log(response.data)
      setBackendOnline(true)

    } catch (error) {
      console.log(`There was an error : ${error}`)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      {
        backEndonline == false ?
          (<h1> backend is offline , my bad lil bro </h1>) :
          (<h1>Backend is online , enjoy lil bro </h1>)
      }
    </>
  )
}

export default App
