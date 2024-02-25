
import { FilePreview } from "../cmps/FilePreview.jsx"


export function FileList({files,onRemoveFile,onSetIsDone,handleChangeSalary,onOperations}){
   
  
    
    return(
        <tbody>
        {files.map(file =>
        <tr key={file._id}>
            <FilePreview file={file} onRemoveFile={onRemoveFile} onSetIsDone={onSetIsDone} onOperations={onOperations}/>
        </tr>)}
        </tbody>
    )
}