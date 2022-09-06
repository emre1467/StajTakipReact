//import { ref } from 'firebase/storage';
import React, { useState } from 'react'
import {storage} from "./firebase"
import {getDownloadURL,ref,uploadBytesResumable} from "@firebase/storage";

export default function FirebaseFile() {

    const [progress,setProgress]=useState(0)

const  formHandler=(r)=>{
    r.preventDefault();
    const file=r.target[0].files[0];
    const file2=r.target[1].files[0];
    console.log(file)
    console.log(file2)

    uploadFiles(file)
    uploadFiles(file2)

};


const uploadFiles=(file)=>{
    if(!file) return;
    const storageRef=ref (storage,`/files/${file.name}`)
    const uploadTask=uploadBytesResumable(storageRef,file)
    uploadTask.on("state_changed",(snapshot)=>{
        const prog=Math.round( (snapshot.bytesTransferred/snapshot.totalBytes)*100);
    
        setProgress(prog)
    
    },(err)=>console.log(err),
    ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((url)=>console.log(url))
        
    }
    )
};
  return (
    <div>
        <form onSubmit={formHandler}>
            <input type='file' className='input'/>
            <input type='file' className='input'/>

            <button type='submit'>Upload</button>
        </form>
        <h3 > Uploaded {progress}</h3>
    </div>
  )
}
