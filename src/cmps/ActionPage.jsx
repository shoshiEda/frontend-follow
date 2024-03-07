import { useNavigate } from 'react-router-dom'
import { useState } from 'react'




export function ActionPage ({newAction,setNewAction}){

    const navigate = useNavigate()

    const [txt,setTxt]= useState(newAction.action || '')

    function handleChange(ev){
        setTxt(ev.target.value)
        console.log(txt)
    }

function submit(){
    setNewAction(prevAction => ({ ...prevAction, action: txt }))
    navigate(-1)
}


    return (
         <section className="modal">
        <textarea className="text-area cell" name="action" value={txt} onChange={handleChange}></textarea>
        <div className="btns">
        <button onClick={()=>Navigate(-1)}><i className="fa-solid fa-rotate-left"></i></button>
        <button onClick={submit}><i className="fa-solid fa-circle-chevron-right"></i></button>
        </div>
        
    </section>
    )
}