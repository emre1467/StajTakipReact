import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Header, Icon, Table } from 'semantic-ui-react';
import InternshipRequestService from '../services/internshipRequestService';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"

export default function MyInternshiprequest() {
    let { id } = useParams();

    const internshipCollectionRef = collection(db, "internshipRequests")

    const [internships, setInternship] = useState([])
    useEffect(() => {
        //let internshipService = new InternshipRequestService()
        //internshipService.getInternshipRequestByStudentId(id).then(result => setInternship(result.data.data))
    
        const q = query(internshipCollectionRef, where("stuId", "==", id))
        const getInternships = async () => {
            let data = await getDocs(q);
            setInternship(data.docs.map((doc) => ({ ...doc.data() })))
            //console.log(studentCollectionRef)
       
           
        }
        //students.map((stu) => setId(stu.id))
        getInternships().then(()=>console.log(internships ))
      
        
    
    }, []);


    return (
        <div style={{marginTop:"50px",marginLeft:"50px"}} >

            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Staj Taleplerim</Header.Content>
            </Header>
            <Table >
                <Table.Body>{
                    internships.map((internship) => (

                        <Table.Row  key={internship.id}>
                            <Table.Cell >{internship.confirm}</Table.Cell>
                            <Table.Cell><Link to={`/myPage/${id}/MyInternshipRequest/${internship.id}`}> Görüntüle</Link></Table.Cell>

                        </Table.Row>

                    ))
                }

                </Table.Body>
            </Table>
            <Button><Link to={`/myPage/${id}/MyInternshipRequestAdd`}> Yeni Staj Talebi</Link></Button>
        </div>
    )
}
