
import { FileList } from "../cmps/FileList.jsx"
import { fileService } from "../services/file.service.js"
import { showSuccessMsg , showErrorMsg } from "../services/event-bus.service.js"


import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import bgPic from '../assets/img/bg-pic.jpeg'



export function FileIndex({filterBy,setFilterBy}){

    const [files, setFiles] = useState(null)
    const [newFile, setNewFile] = useState(fileService.getEmptyCase())
    const [maxPages, setMaxPages] = useState(1)

    const navigate=useNavigate()
    

    useEffect(() => {
        loadFiles()
    }, [filterBy])

    async function loadFiles() {
        try{
        const {cases,maxPages} = await fileService.query(filterBy) 
        setFiles(cases)
        setMaxPages(maxPages)
        }
        catch(err) 
        {
            console.log('err:', err)
            showErrorMsg('Error: cant load the files')
        }
    }

    async function onRemoveFile(fileId) {
        try{
            await fileService.remove(fileId)
            setFiles(prevFiles => {
                return prevFiles.filter(file => file.id !== fileId)
            })
            showSuccessMsg('The case successfully deleted')
            loadFiles()
        }
       catch(err) {
        console.log('err:', err)
        showErrorMsg('Error: cant load the file')
       }

    }

    async function onAddNewFile(ev){
        ev.preventDefault()
        if(!newFile.FileNumber) return
        try{
            await fileService.addNewFile(newFile)
            showSuccessMsg('The case successfully added')
            loadFiles()
        }
        catch(err)
        {
            console.log('err:', err)
            showErrorMsg('Error: cant add the file')
        }
    }


    function onOperations(fileId){
        navigate(`/case/${fileId}`)
    }


    async function onSetIsDone(file){
        try{
            await fileService.changeToDone(file)
            loadFiles()
            showSuccessMsg('The case successfully transferes')
        }
        catch(err) 
        {
            console.log('err:', err)
            showErrorMsg('Error: cant update the file')

        }
    }


    
    
   function handleChange({ target }){
   
    const field = target.name
    let value=target.value
   

    setNewFile(prevFile => ({...prevFile,[field]:value}))
   
   }

   function handleChangeFilter({ target }){
   
    const field = target.name
    let value=target.value
    setFilterBy(prevFilter => ({...prevFilter,[field]:value}))
   
   }

   function handleChangeSort(value){
    setFilterBy(prevFilter => ({...prevFilter,sortBy:value}))
   }




   function onSetPage(diff,filterBy) {
    let tempPageIdx=filterBy.pageIdx+diff

        if(tempPageIdx<0 || tempPageIdx>=maxPages) return

        setFilterBy(prevFilter=>({...prevFilter,pageIdx:tempPageIdx}))
}

console.log(files)
   const{FileNumber,createdAt}=newFile
    return (
       
        <section className="file-index">
            <img src={bgPic} />
             {!filterBy.isSent && <form className="add-new-file" onSubmit={onAddNewFile}>New file:
            <input type="text" value={FileNumber} name="FileNumber" onChange={handleChange}  placeholder="case number"/>
            <input type="date" value={createdAt} onChange={handleChange} name="createdAt" />
            <button>Add</button>
            </form>}
            {files &&
                <>
                    <div className="filter">
                        <label htmlFor="txt">search a case: </label>
                        <input onChange={handleChangeFilter} type="text" id="txt" name="txt" />
                    </div>
                    {(!files || files.length===0) &&<div className="no-cases">You have no cases, wanna start?</div>}
                    {(files && files.length!==0) &&<table className="main-table">
                    <thead className="main-thead">
                            <tr>
                            {filterBy.isSent && <td><input type="checkbox" /></td>}

                                <td onClick={()=> handleChangeSort("number")}>Case number</td>
                                <td onClick={()=> handleChangeSort("rdate")}>Received At</td>
            {filterBy.isSent  && <td onClick={()=> handleChangeSort("sdate")}>Done at</td>}
            {filterBy.isSent  && <td>Salary</td>}
                                <td></td>
                            </tr>
                        </thead>
                            <FileList files={files}  onRemoveFile={onRemoveFile} onSetIsDone={onSetIsDone} onOperations={onOperations}/>        
                    </table>}
                    <div className="pagination flex justify-between ">
                
                    <button onClick={()=>{onSetPage(-1,filterBy)}}><i className="fa-solid fa-arrow-left"></i>prev page</button>
                    <button onClick={()=>{onSetPage(1,filterBy)}}>next page<i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                                </>
            }
        </section>
    )
}