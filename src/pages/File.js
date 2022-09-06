import axios from 'axios';
import React from 'react';
import {useForm} from "react-hook-form";
import { Form, Input } from 'semantic-ui-react';

function uploadFile({target:{files}}){
    console.log(files[0])
    let data =new FormData();
    //data.append('file',files[0])
    data=files[0]
    
    console.log(data)
    
    axios.post("http://localhost:8080/file/add",data).then(res=>{
        //console.log(res)
    })
}

export default function File()  {
  
  
    return (
        <div>
    
        <Input onChange={uploadFile} type='file'></Input>
    
        </div>
      )
  
   
}
