import { fileService } from "../services/file.service.js"
import { utilService } from '../services/util.service.js'


import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'



export function FileDetails(){

    const [file, setFile] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const [newAction, setNewAction] = useState(fileService.getEmptyAction())
    const [openModal, setOpenModal] = useState(false)
    const isBox=newAction.action? '' : 'box'


    useEffect(() => {
        loadFile()
    }, [])

    async function loadFile() {
        try{
            const file = await fileService.get(params.fileId)
            setFile(file)
        }
        catch(err) {
                console.log('err:', err)
                navigate('/')
            }
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
    
            case 'checkbox':
                value = target.checked
                break
    
            default:
                break;
        }
       
            setNewAction(prevAction => ({ ...prevAction, [field]: value }))
    }
    
    async function onDelete(revId){
        

        if(!file._id ) return
        console.log(file._id,revId)

        try{
            await fileService.removeAction(file._id,revId)
            loadFile()
        }
        catch(err)
        {
            console.log('err',err)
        }
    }



   async function onSaveAction(ev){
    ev.preventDefault()
    try{
        await fileService.saveAction(newAction,file._id);
        loadFile()
    }
    catch(err){
        console.log('err',err)
    }
}


   
   
   if(file)
    return(
    <section className="file-details">
        <h1>Case number: {file.FileNumber}</h1>
        <table className="action-table">
            <thead>
                <tr>
                    <td>index</td>
                    <td>Date and time</td>
                    <td>Place,City</td>
                    <td>Action</td>
                    <td className="km">KM</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {file.msgs && file.msgs.map((act,idx)=> 
                        <tr key={idx}>
                        <td>{idx+1}</td>
                        <td>{utilService.setTime(act.dateTime)}</td>
                        <td>{act.place}</td>
                        <td>{act.action}</td>
                        <td >{act.KM} KM</td>
                        <td><button onClick={()=>onDelete(act.id)} className="fa-solid fa-trash-can action"></button>
</td>
                    </tr>)
                }
                <tr>
                    <td>{file.action? file.action.length+1 : 1}</td>
                    <td><input type="datetime-local" name="dateTime" onChange={handleChange} /></td>
                    <td><input type="text" name="place" onChange={handleChange} /></td>
                    <td><textarea className="text-area action big" name="action" onChange={handleChange}></textarea>
                      <div className={isBox + " action small"} onClick={()=>setOpenModal(true)}>{newAction.action || ''}</div></td>
                    <td ><input className="km" type="number" name="KM" onChange={handleChange} /></td>
                    <td><button type="submit" onClick={onSaveAction}>Save</button></td>      

                </tr>
            </tbody>
        </table>
        {openModal && <section className="modal">
            <textarea className="text-area cell" name="action" value={newAction.action} onChange={handleChange}></textarea>
            <div className="btns">
            <button onClick={()=>setOpenModal(false)}><i className="fa-solid fa-rotate-left"></i></button>
            <button onClick={()=>setOpenModal(false)}><i className="fa-solid fa-circle-chevron-right"></i></button>
            </div>
            
        </section>}
        </section>)
}