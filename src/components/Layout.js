import { Link } from 'react-router-dom'
import WalletSelectButton from './WalletSelectButton'
import Upload from './Upload'


const Layout = ({connect, disconnect, isConnected, setIsConnected}) =>{
    return (
        <div id="sidebar-menu">
            
            <WalletSelectButton isConnected={isConnected} setIsConnected={setIsConnected}/>
             <Upload />

            <Link to="/Home" className="sidebar-item"><h4>Home</h4></Link>
            <Link to="/Tutorial" className="sidebar-item"><h4>Tutorial</h4></Link>
            
        </div>
    )
}
export default Layout;