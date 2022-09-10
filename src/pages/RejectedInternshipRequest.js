import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header, Icon, Table } from 'semantic-ui-react';
import InternshipRequestService from '../services/internshipRequestService';

export default function RejectedInternshipRequest() {
  let {id} =useParams();
  const [internships,setInternships]=useState([])

  useEffect(() => {
    let confirm="Onaylanmadı"
  let internshipRequestService=new InternshipRequestService()
  internshipRequestService.getConfirmInternshipRequest(confirm).then(result=>setInternships(result.data.data) )
   console.log(internships)
  }, [])
  
  
    return (
    <div style={{marginTop:"30px"}}>
         <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Staj Talepleri</Header.Content>

            </Header>
            <Table>
            <Table.Header>
                    <Table.Row>
                        
                        <Table.HeaderCell>Öğrencinin Adı</Table.HeaderCell>
                        <Table.HeaderCell>Öğrencinin Soyadı</Table.HeaderCell>
                        <Table.HeaderCell>Şirket Adı </Table.HeaderCell>
                        <Table.HeaderCell>Onay Durumu </Table.HeaderCell>
                   
                    </Table.Row>
                </Table.Header>

                <Table.Body>{
                    internships.map((intern) => (
                        <Table.Row key={intern.id}>
                            <Table.Cell>{intern.student.name}</Table.Cell>
                            <Table.Cell>{intern.student.surname}</Table.Cell>
                            <Table.Cell>{intern.company.name}</Table.Cell>
                           
                            <Table.Cell>{intern.confirm}</Table.Cell>
                           
                            <Table.Cell><Link to={`/adminPage/${id}/RejectedInternshipRequest/${intern.id}`}> Görüntüle</Link></Table.Cell>
                        </Table.Row>
                    ))
                }
                </Table.Body>
            </Table>
    </div>
  )
}
