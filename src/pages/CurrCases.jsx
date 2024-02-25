import { useState } from 'react'
import { FileIndex } from "../cmps/FileIndex.jsx"


export function CurrCases(){

    const [filterBy,setFilterBy] = useState({ isSent:false,pageIdx:0 })



    return(
        <FileIndex filterBy={filterBy} setFilterBy={setFilterBy}/>
    )}
