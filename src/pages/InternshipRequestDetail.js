import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Header, Icon, List, Tab, Table } from 'semantic-ui-react';
import InternshipRequestService from '../services/internshipRequestService';


export default function InternshipRequestDetail() {
    let { idd } = useParams();
    const [internships, setInternships] = useState([])
    const [s, setS] = useState([])

    let internshipService = new InternshipRequestService()
    let onaylandı = "Onaylandı"
    let reddedildi = "Onaylanmadı"
    useEffect(() => {
        internshipService.getInternshipRequestById(idd).then(result => setInternships(result.data.data))

    }, [])

    function Onayla() {
        internshipService.updateConfirm(idd, onaylandı).then(result => console.log(result.data.message))
        alert("Staj talebi onaylandı")
    }
    function Reddet() {
        internshipService.updateConfirm(idd, reddedildi).then(result => console.log(result.data.message))
        alert("Staj Talebi Reddedildi")
    }


    return (
        <div style={{ marginTop: "50px" }}>
            <Header as="h3">
                <Icon name="list alternate outline" />
                <Header.Content>Öğrenci Bilgileri </Header.Content>

            </Header>
            <Table color='green' celled>
                <Table.Header>
                    <Table.Row>

                        <Table.HeaderCell> Adı</Table.HeaderCell>
                        <Table.HeaderCell>Soyadı</Table.HeaderCell>
                        <Table.HeaderCell>Öğrenci Numarası</Table.HeaderCell>
                        <Table.HeaderCell>E-posta</Table.HeaderCell>
                        <Table.HeaderCell>Bölüm</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{
                    internships.map((intern) => (
                        <Table.Row key={intern.id}>
                            <Table.Cell>{intern.student.name}</Table.Cell>
                            <Table.Cell >{intern.student.surname}</Table.Cell>
                            <Table.Cell >{intern.student.studentNo}</Table.Cell>
                            <Table.Cell >{intern.student.email}</Table.Cell>
                            <Table.Cell >{intern.student.department}</Table.Cell>
                        </Table.Row>
                    ))
                }
                </Table.Body>
            </Table>
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
                    internships.map((intern) => (
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
                    internships.map((intern) => (
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
                    internships.map((intern) => (
                        <Table.Row key={intern.id}>
                            <Table.Cell >{intern.startDate}</Table.Cell>
                            <Table.Cell >{intern.endDate}</Table.Cell>
                            <Table.Cell>{intern.workDay}</Table.Cell>

                        </Table.Row>
                    ))

                }
                </Table.Body>

            </Table>

            <Button onClick={Reddet} color='red' align="center">Reddet</Button>
            <Button onClick={Onayla} color='green'>Onayla</Button>



        </div >

    )
}
//<Button onClick={Tıkla(intern.isgUrl)}>tıkla</Button>
