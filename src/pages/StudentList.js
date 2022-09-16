import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'

export default function StudentList() {
    const [students, setStudents] = useState([])

    useEffect(() => {
    }, [])



    return (
        <div>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        
                        <Table.HeaderCell>Ad</Table.HeaderCell>
                        <Table.HeaderCell>Soyad</Table.HeaderCell>
                        <Table.HeaderCell>Öğrenci Numarası</Table.HeaderCell>
                        <Table.HeaderCell>Bölüm </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        students.map((student) => (
                            
                            <Table.Row key ={student.studentId}>
                              <Table.Cell>{student.name}</Table.Cell>
                              <Table.Cell>{student.surname}</Table.Cell>
                              <Table.Cell>{student.studentNo}</Table.Cell>
                              <Table.Cell>{student.department}</Table.Cell>   
                            </Table.Row>

                         ))
                    }


                </Table.Body>

            </Table>

        </div>
    )
}