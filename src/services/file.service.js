import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const KEY = 'caseDB'

const BASE_URL = 'case/'





export const fileService = {
    query,
    get,
    remove,
    save,
    getEmptyCase,
    getDefaultFilter,
    addNewFile,
    changeToDone,
    getEmptyAction,
    removeAction,
    saveAction
}


function query(filterBy) {

    return httpService.get(BASE_URL, filterBy)
}



function get(caseId) {
    return httpService.get(BASE_URL + caseId)

}

function remove(caseId) {
    return httpService.delete(BASE_URL + caseId)

}

function save(file) {  
    if (file._id) {
        
        return httpService.put(BASE_URL , file)
    } else {
        return httpService.post(BASE_URL, file)
    }
   
}

function getEmptyCase() {
    return { FileNumber : '',createdAt:'', SentAt : '' }
}


function getDefaultFilter() {
    return { isSent:false ,pageIdx:1 }
}



function changeToDone(file){  
    file.sentAt=Date.now()
    file.isSent=true
    return save(file)
}





function getEmptyAction(){
    return {id:"",dateTime:"",place:"",action:"", KM:""}
}

function addNewFile(newFile){
 if(!newFile.FileNumber) return

const file=
  {
    "FileNumber": `${newFile.FileNumber}`,
    "createdAt": `${newFile.createdAt}`,
    "isSent":false,
    "sentAt": "",
    "salary":"",

    }
    return save(file)
  }


  function saveAction(action,fileId){
    return httpService.post(BASE_URL + fileId+'/msg/',action)
}

function removeAction(fileId,revId){
    console.log(fileId,revId)
    return httpService.delete(BASE_URL + fileId+'/msg/'+ revId)
}


