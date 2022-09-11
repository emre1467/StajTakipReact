import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Header, Icon, List, Tab, Table } from 'semantic-ui-react';
import InternshipRequestService from '../services/internshipRequestService';
import { db } from "./firebase-config"
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore"


export default function InternshipRequestDetail() {
    let { idd } = useParams();
    const [internships, setInternship] = useState([])
    const [company, setCompany] = useState([])
    const [student, setStudent] = useState([])
    const periodCollectionRef = collection(db, "periods")
    const [period, setPeriod] = useState([])
    const internshipCollectionRef = collection(db, "internshipRequests")
    const companyCollectionRef = collection(db, "companies")
    const studentCollectionRef = collection(db, "students")
    
    let onaylandı = "Onaylandı"
    let reddedildi = "Onaylanmadı"
    useEffect(() => {
        //internshipService.getInternshipRequestById(idd).then(result => setInternships(result.data.data))
        const getInternship = async () => {
            const q = query(internshipCollectionRef, where("id", "==", idd))
            const data = await getDocs(q);
            setInternship(data.docs.map((doc) => ({ ...doc.data() })))
            //setC(data.docs.map((doc) => ({ ...doc.data() }))[0].company)
            //setP(data.docs.map((doc) => ({ ...doc.data() }))[0].period)
            console.log(internships)
            const qcompany = query(companyCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].company))
            const data1 = await getDocs(qcompany);
            setCompany(data1.docs.map((doc) => ({ ...doc.data() })))
            console.log(company)
      
            const qstudent = query(studentCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].stuId))
            const data2 = await getDocs(qstudent);
            setStudent(data2.docs.map((doc) => ({ ...doc.data() })))
            console.log(student)

            const qperiod = query(periodCollectionRef, where("id", "==", data.docs.map((doc) => ({ ...doc.data() }))[0].period))
            const data3 = await getDocs(qperiod);
            setPeriod(data3.docs.map((doc) => ({ ...doc.data() }))[0].name)
 
      
          }
      
          getInternship()



    }, [])

    const onayla= async() =>{
       // internshipService.updateConfirm(idd, onaylandı).then(result => console.log(result.data.message))
       const stajDoc=doc(db,"internshipRequests",idd) 
       await updateDoc(stajDoc,{confirm:onaylandı})
       alert("Staj talebi onaylandı")
    }
    const reddet= async() =>{
        // internshipService.updateConfirm(idd, onaylandı).then(result => console.log(result.data.message))
        const stajDoc=doc(db,"internshipRequests",idd) 
        await updateDoc(stajDoc,{confirm:reddedildi})
        alert("Staj talebi reddedildi")
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
                    student.map((stu) => (
                        <Table.Row key={stu.id}>
                            <Table.Cell>{stu.name}</Table.Cell>
                            <Table.Cell >{stu.surname}</Table.Cell>
                            <Table.Cell >{stu.studentNo}</Table.Cell>
                            <Table.Cell >{stu.email}</Table.Cell>
                            <Table.Cell >{stu.department}</Table.Cell>
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
                    company.map((company) => (
                        <Table.Row key={company.id}>
                           <Table.Cell>{company.name}</Table.Cell>
                            <Table.Cell >{company.address}</Table.Cell>
                            <Table.Cell><a href={(company.protocolUrl)} target="_blank"><Icon size="small" circular name='file pdf' />Protokol</a></Table.Cell>
                            <Table.Cell >{company.phoneNumber}</Table.Cell>
                            <Table.Cell >{company.confirm}</Table.Cell>
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
                            <Table.Cell >{period}</Table.Cell>
                            <Table.Cell >{intern.confirm}</Table.Cell>
                            <Table.Cell><a href={(intern.isgUrl)} target="_blank"><Icon size="small" circular name='file pdf' />İsg Belgesi</a></Table.Cell>
                            <Table.Cell><a href={(intern.müstehaklıkUrl)} target="_blank"><Icon size="small" circular name='file pdf' />Müstehaklık Belgesi</a></Table.Cell>
                            <Table.Cell> <a href={(intern.internshipformUrl)} target="_blank"><Icon size="small" circular name='file pdf' />Başvuru formu</a></Table.Cell>

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

            <Button onClick={reddet} color='red' align="center">Reddet</Button>
            <Button onClick={onayla} color='green'>Onayla</Button>



        </div >

    )
}
//<Button onClick={Tıkla(intern.isgUrl)}>tıkla</Button>
