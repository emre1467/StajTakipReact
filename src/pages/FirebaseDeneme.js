
import React, { useState } from 'react' 
import { useEffect } from 'react'
import { db } from "./firebase-config"
import { collection, getDocs,addDoc, query,where,updateDoc ,doc} from "firebase/firestore"
import { Button } from 'semantic-ui-react'

export default function FirebaseDeneme() {
    const [newName,setNewName]=useState("")
    const [newSurname,setNewSurname]=useState("")

    const [students, setStudents] = useState([])
    const studentCollectionRef = collection(db, "students")

    const createUser=async ()=>{
        const docref=await addDoc(studentCollectionRef,{name:newName,surname:newSurname,id:10})
        const stuDoc=doc(db,"students",docref.id)
        await updateDoc(stuDoc,{id:docref.id})
    
    
    }

const q=query(studentCollectionRef,where("name","==","Emre"),where("surname","==","Yiğit"))
    useEffect(() => {
        const getStudents = async () => {
            const data = await getDocs(q);
            setStudents(data.docs.map((doc) => ({ ...doc.data(), id:doc.id })))
            console.log(studentCollectionRef)
        }

        getStudents().finally(()=>console.log(students))
        
    }, [])


    return (
        <div>
            {students.map((stu) => {
                return (
                    <div>
                        <h1>{stu.name}</h1>
                        <h1>{stu.surname}</h1>
                        <h1>{stu.id}</h1>

                    </div>
                )


            })}
            <input placeholder='name' onChange={(event)=>{
                setNewName(event.target.value)}}></input>
            <input placeholder='surname' onChange={(event)=>{
                setNewSurname(event.target.value)}}></input>
            <Button onClick={createUser}>Create Student</Button>
        </div>
    )
}


