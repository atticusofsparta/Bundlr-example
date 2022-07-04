import { Link } from 'react-router-dom'
import Upload from './Upload'


const Layout = ({connect, disconnect, active, account, newFiles, setNewFiles, filePreviews, setFilePreviews, uploadFiles, newFilesData, setNewFilesData, getUploadedFiles}) =>{
    return (
        <div id="sidebar-menu">
        
            {!active ? <h4 className='sidebar-item' onClick={connect}>Connect</h4>
            :
            <h4 className='sidebar-item' onClick={()=>disconnect()}>Disconnect</h4>}
             <Upload 
             newFiles={newFiles}
             setNewFiles={setNewFiles}
             filePreviews={filePreviews}
             setFilePreviews={setFilePreviews}
             uploadFiles={uploadFiles}
             newFilesData={newFilesData}
            setNewFilesData={setNewFilesData}
             />
             <h4 className='sidebar-item' onClick={()=>getUploadedFiles()}>Refresh</h4>

            <Link to="/Home" className="sidebar-item"><h4>Home</h4></Link>
            <Link to="/Tutorial" className="sidebar-item"><h4>Tutorial</h4></Link>
            
        </div>
    )
}
export default Layout;