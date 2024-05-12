import './App.css'
import Sidebar from './components/Dashboard-Components/Sidebar/Sidebar'
import Dashboard from './layouts/Dashboard'
function Apps() {

  return (
    <div className='flex'>
    <Sidebar />
      <Dashboard />
    </div>
  )
}

export default Apps
