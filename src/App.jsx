import Hero from './Components/Hero'
import './App.css'
import Header from './Components/Header'
import Dashboard from './Components/Dashboard'
import React,{useState} from "react"

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
     <Header onSearch={handleSearch}/>
     <Hero/>
     <Dashboard searchQuery={searchQuery}/>
    </>
  )
}

export default App
