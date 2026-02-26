import {BrowserRouter  as Router , Routes, Route} from "react-router-dom"
import './App.css'
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Dashboard from "./pages/dashboard/Dashboard"

function App() {


  return (
    <>

    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/Signup" element={<Signup/>}></Route>
        <Route path="/" element={<Dashboard/>}></Route>
       
      </Routes>
    </Router>

    </>
  )
}

export default App
