import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/criar" element={<CreatePost />} />
      </Routes>
   )
}

export default App
