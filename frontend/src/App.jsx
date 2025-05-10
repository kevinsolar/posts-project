import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import User from './pages/User'

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/criar" element={<CreatePost />} />
         <Route path="/user" element={<User />} />
      </Routes>
   )
}

export default App
