import { useEffect, useState } from "react"
import immer from 'immer'




const Upload = () => {

    const [modal, setModal] = useState(false)

    const UploadButton = (props) =>{

        return (
            <div className="sidebar-item" onClick={()=>setModal(true)}><h4>Upload</h4></div>
        )
    }
    const UploadModal = (props) => {
        const [newFiles, setNewFiles] = useState([])

        const onChange = (e) => {

            let file = e.target.files[0];
            if (!file) return;
            file.isUploading = true;
            let immerFiles = immer(newFiles, draft => {
                draft.push(file)
            })
            setNewFiles(immerFiles)
            console.log(newFiles)
        }
          
        const PreviewFiles = () => {
           
           return newFiles.map(file => 
           <tr>
            <td>{file.name}</td>
            <td>{file.size / 1000} KB</td>
            <td>{file.type}</td>
            </tr>)
                     
        }


    
        return (
            <div className="modal">
            <div className="scrim">
               <div className="container">
               <div className="upload-modal">
                    <h4 className="title">Upload</h4>
                        <button className="closeButton" style={{right:"15%"}} onClick={() => setModal(false)}>
                        <svg width="14" height="14"><path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path></svg>
                        </button>
                        <label className="upload-area">
                            <h2>Click or drag files here to upload</h2>
                        <input id="files-input" type="file" style={{display:"none"}} multiple onChange={(e)=>{onChange(e)}}/>
                        </label>
                        <table>
                            <tr>
                                <th>File Name</th>
                                <th>File Size</th>
                                <th>File Type</th>
                            </tr>
                            <PreviewFiles />
                        </table>
                       
                    
                    <button className="select-button"><h3>Write files to the permaweb</h3></button>
                 </div>
               </div>
            </div>
        </div>
        )
    }
   

    return (
      <>
        <UploadButton modal={modal} setModal={setModal}/>
     {modal ? <UploadModal modal={modal} setModal={setModal}/> : <></> }
        </> 
    )

}


export default Upload;