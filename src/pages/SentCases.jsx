import { FileIndex } from "../cmps/FileIndex.jsx"
import { useState } from 'react'



    export function SentCases(){

        const [filterBy,setFilterBy] = useState({ isSent:true,pageIdx:0 })



        return(
            <FileIndex filterBy={filterBy} setFilterBy={setFilterBy}/>
        )}

