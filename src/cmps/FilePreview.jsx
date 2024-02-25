import { useState , useEffect } from 'react'
import { fileService } from "../services/file.service.js"

export function FilePreview({file, onRemoveFile,onSetIsDone,onOperations}){
    const [isEdit, setIsEdit] = useState(false)
    const [salary, setSalary] = useState(0)


    function handleChangeSalary({value}) {
        setSalary(value)
    }

    function submit(file){
        if(isEdit){
            file.salary=salary
            fileService.save(file)        }
    }


    return(
        <>
            {file.isSent && <td><input type="checkbox" /></td>}
            <td onClick={()=>onOperations(file._id)}>{file.FileNumber}</td>
            <td onClick={()=>onOperations(file._id)}>{new Date(file.createdAt).toLocaleDateString()}</td>
            {file.isSent && <td onClick={()=>onOperations(file._id)}>{new Date(file.sentAt).toLocaleDateString()}</td>}
            
            {file.isSent && <td>{isEdit? <input className="salary" value={salary} onChange={(ev)=>handleChangeSalary({ value: ev.target.value, file: file })} type="number" name="salary" />:<p>{file.salary}  {file.salary && <i className="fa-solid fa-shekel-sign"></i>}</p>} </td>}
            <td><button onClick={(e) => { onRemoveFile(file._id); e.stopPropagation(); }} className="fa-solid fa-trash-can action"></button>
            {!file.isSent && <button onClick={()=>{onSetIsDone(file)}} className="fa-solid fa-circle-check action"></button>}
            {file.isSent && <button onClick={()=>{setIsEdit(!isEdit), submit(file)}} className="fa-solid fa-pen-to-square action"></button>}
            </td>
            </>
    )
}