import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import Header from './components/Header'


function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex bg-black h-screen w-screen ">
      
      <div className={`mr-2 ${isSidebarOpen ? "hidden" : ""}`} >
      <Sidebar/>
      </div>
      <div className={`flex flex-col flex-grow ${isSidebarOpen ? "" : "ml-64"} w-full ` } >
        <div className="">
        <Header toggleSidebar={toggleSidebar}/>
        </div>
        
        <div className="flex flex-grow mt-2">
          <Main />
        </div>
      </div>
    </div>
  )
}

export default App
