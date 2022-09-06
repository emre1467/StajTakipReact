import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Header, Icon, Table } from 'semantic-ui-react';
import InternshipRequestService from '../services/internshipRequestService';

export default function MyInternshiprequest() {
    let { id } = useParams();

    const [internships, setInternship] = useState([])
    useEffect(() => {
        let internshipService = new InternshipRequestService()
        internshipService.getInternshipRequestByStudentId(id).then(result => setInternship(result.data.data))
    }, []);


    return (
        <div style={{marginTop:"50px",marginLeft:"50px"}} >

            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Staj Taleplerim</Header.Content>
            </Header>
            <Table>
                <Table.Body>{
                    internships.map((internship) => (

                        <Table.Row key={internship.id}>
                            <Table.Cell>{internship.company.name}</Table.Cell>
                            <Table.Cell>{internship.confirm}</Table.Cell>
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
