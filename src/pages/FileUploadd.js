import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

export default function FileUploadd() {
/*
    const [loading ,setLoading]=useState(false)
    const[image,setImage]=useState("")
    const uploadImage = async e => {
        const files = e.target.files
        const data=new FormData()
        data.append('file',files[0])
        data.append('upload_preset','stajtakipbelgeler')
        setLoading(true)
        const res=await fetch("https://api.cloudinary.com/v1_1/staj-takip/image/upload",
        {
            method:'POST',
            body:data
        })

        const file=await res.json()

        console.log(file)
        console.log(file.secure_url)

  }*/
  const [k,setK]=useState()
  const upload =async ()=>{
    const data1=new FormData()
    data1.append('file',k)
    data1.append('upload_preset','stajtakipbelgeler')
    
    const res=await fetch("https://api.cloudinary.com/v1_1/staj-takip/image/upload",
    {
        method:'POST',
        body:data1
    })

    const file=await res.json()

    console.log(file)
    console.log(file.secure_url)

  }
  function deneme(){
    let i=0;
    while (i<1) {
        upload()
    deneme2()
    i=i+1;
    }
    
  }
  function deneme2(){
    console.log("deneme")
  }
    return (
        <div className='fileuploadd'>
            <h1>Upload</h1>
            <input type='file' placeholder='upload file' onChange={(r)=>setK(r.target.files[0])}
                 />
                 <Button onClick={deneme} > gönder</Button>
                 
               
        </div>
    )
}
