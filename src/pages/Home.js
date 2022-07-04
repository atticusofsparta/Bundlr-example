
import {useState} from 'react'


const Home = ({uploadedFiles}) =>{

    const Files = ()=>{

        return uploadedFiles.map((file, index) => 
        
        <div className="file-card">
        <img src={`http://arweave.net/${file.node.id}`} alt="" key={index} width="300px"/>
        </div>
        
        
        )
    }
    return (
        <div className="page-container">
            <h2 className="page-header">Home</h2>
            <div className="uploads">
                <h3>View Your Files Here</h3>

                {uploadedFiles !== "" ? <Files /> : <h4>No files - upload some to see something!</h4>}

            </div>
        </div>
    )
}

export default Home;