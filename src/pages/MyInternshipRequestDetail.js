import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Header, Icon, List, Table } from 'semantic-ui-react';
import InternshipRequestService from '../services/internshipRequestService';


export default function MyInternshipRequestDetail() {
    let { idd } = useParams();
    const [internship, setInternship] = useState([])
    useEffect(() => {
        let internshipService = new InternshipRequestService()
        internshipService.getInternshipRequestById(idd).then(result => setInternship(result.data.data))
    }, [])
    function gönder(params) {
        window.location.replace(` ${params}`);
    }

    return (
        <div style={{ marginTop: "50px"  }}>
            
          
            <Header as="h3">
                <Icon name="list alternate outline" />
                <Header.Content>Şirket Bilgileri </Header.Content>

            </Header>

            <Table color='blue' celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                        <Table.HeaderCell>Adresi</Table.HeaderCell>
                        <Table.HeaderCell>Protokol</Table.HeaderCell>
                        <Table.HeaderCell>Telefon Numarası</Table.HeaderCell>
                        <Table.HeaderCell>Onay Durumu</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    internship.map((intern) => (
                        <Table.Row key={intern.id}>
                            <Table.Cell>{intern.company.name}</Table.Cell>
                            <Table.Cell >{intern.company.address}</Table.Cell>
                            <Table.Cell><a href={(intern.company.protocolUrl)} target="_blank">Protokol</a></Table.Cell>
                            <Table.Cell >{intern.company.phoneNumber}</Table.Cell>
                            <Table.Cell >{intern.company.confirm}</Table.Cell>
                        </Table.Row>
                    ))
                }
                </Table.Body>
            </Table>
            <Header as="h3">
                <Icon name="list alternate outline" />
                <Header.Content>Staj Talebi Bilgileri</Header.Content>

            </Header>
            <Table color='red' celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell>Staj Dönemi</Table.HeaderCell>
                        <Table.HeaderCell>Onay Durumu</Table.HeaderCell>
                        <Table.HeaderCell>İsg Belgesi</Table.HeaderCell>
                        <Table.HeaderCell>Müstehaklık Belgesi</Table.HeaderCell>
                        <Table.HeaderCell>Başvuru Formu</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    internship.map((intern) => (
                        <Table.Row key={intern.id}>
                            <Table.Cell >{intern.period.name}</Table.Cell>
                            <Table.Cell >{intern.confirm}</Table.Cell>
                            <Table.Cell><a href={(intern.isgUrl)} target="_blank">İsg Belgesi</a></Table.Cell>
                            <Table.Cell><a href={(intern.müstehaklıkUrl)} target="_blank">Müstehaklık Belgesi</a></Table.Cell>
                            <Table.Cell> <a href={(intern.internshipformUrl)} target="_blank">Başvuru formu</a></Table.Cell>

                        </Table.Row>
                    ))

                }
                </Table.Body>

            </Table>

            <Table  celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
                        <Table.HeaderCell>Bitiş Tarihi</Table.HeaderCell>
                        <Table.HeaderCell> İş günü</Table.HeaderCell>

                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    internship.map((intern) => (
                        <Table.Row key={intern.id}>
                            <Table.Cell >{intern.startDate}</Table.Cell>
                            <Table.Cell >{intern.endDate}</Table.Cell>
                            <Table.Cell>{intern.workDay}</Table.Cell>

                        </Table.Row>
                    ))

                }
                </Table.Body>

            </Table>

        </div>
        
    )
}
