import { useEffect, useState } from "react"
import immer from 'immer'


const Upload = ({newFiles, setNewFiles, filePreviews, setFilePreviews, uploadFiles, newFilesData, setNewFilesData}) => {

    const [modal, setModal] = useState(false)

    const UploadButton = (props) =>{

        return (
            <div className="sidebar-item" onClick={()=>{setModal(true)}}><h4>Upload</h4></div>
        )
    }
    const UploadModal = () => {
        

        function onChange(e) {
            const file = e.target.files[0]
            if (file) {
              const preview = URL.createObjectURL(file)
              const immerPreview = immer(filePreviews, draft => {
                draft.push(preview)
              })
              setFilePreviews(immerPreview)

              const immerFile = immer(newFiles, draft => {
                draft.push(file)
              })
              setNewFiles(immerFile)
              let reader = new FileReader()
              reader.onload = function () {
                if (reader.result) {
                  //figure out how to upload an array of multiple files

                  // const immerFilesData = immer(newFilesData, draft => {
                  //   draft.push()
                  // })
                  setNewFilesData(Buffer.from(reader.result))
                }
              }
              reader.readAsArrayBuffer(file)
           
            }
          }
          
        const PreviewFiles = () => {
           
           return newFiles.map((file, index) => 
           <tr>
            <td>{file.name}</td>
            <td>{file.size / 1000} KB</td>
            <td>{file.type}</td>
            <td><img src={filePreviews[index]} alt="" width="45px"/></td>
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
                            <h2>Click or drag file here to upload - only supports one file at the moment, and will default to the last file selected</h2>
                        <input id="files-input" type="file" style={{display:"none"}} multiple onChange={(e)=>{onChange(e)}}/>
                        </label>
                        <table>
                            <tr>
                                <th>File Name</th>
                                <th>File Size</th>
                                <th>File Type</th>
                                <th>File Preview</th>
                            </tr>
                            <PreviewFiles />
                        </table>
                        
                       
                    
                    <button className="select-button" onClick={()=>uploadFiles()}><h3>Write files to the permaweb</h3></button>
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