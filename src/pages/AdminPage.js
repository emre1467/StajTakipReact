import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Container, Dropdown, Icon, List, Menu } from 'semantic-ui-react';
import AdminService from '../services/adminService';

export default function AdminPage() {

let {id} =useParams();

const[admins,setAdmin]=useState([])
useEffect(() => {
    
        let adminService=new AdminService()
        adminService.getById(id).then(result=>setAdmin(result.data.data))
}, [])


  return (
    <div>
        <Container style={{ marginBottom: "50px",backgroundColor: "lightgreen"  }}>
        <List size="big" style={{ backgroundColor: "lightgreen" }}>
          <List.Item>
            <List.Content >
              <List.Header> {admins.map((s) => <h1>{s.name} {s.surname}</h1>)} </List.Header>
              {admins.map((s) => (s.email))}
            </List.Content>
          </List.Item></List >

      </Container>




      <Menu secondary vertical size='big' >


        <Dropdown item text='Şirketler'>
          <Dropdown.Menu>
            <Dropdown.Item><Link style={{ color: "black" }} to={`/adminPage/${id}/ApprovedConfirmCompanies`}>Onaylanan Şirketler</Link></Dropdown.Item>
            <Dropdown.Item><Link style={{ color: "black" }} to={`/adminPage/${id}/RejectedConfirmCompanies`}>Onaylanmayan Şirketler</Link></Dropdown.Item>
            <Dropdown.Item><Link style={{ color: "black" }} to={`/adminPage/${id}/UncertainConfirmCompanies`}>Onaylanmayı Bekleyen Şirketler</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text='Staj Talepleri'>
          <Dropdown.Menu>
            <Dropdown.Item><Link style={{ color: "black" }} to={`/adminPage/${id}/ApprovedInternshipRequest`}>Onaylanan Staj Talepleri</Link></Dropdown.Item>
            <Dropdown.Item><Link style={{ color: "black" }} to={`/adminPage/${id}/RejectedInternshipRequest`}>Onaylanmayan Staj Talepleri</Link></Dropdown.Item>
            <Dropdown.Item><Link style={{ color: "black" }} to={`/adminPage/${id}/UncertainInternshipRequest`}>Onaylanmayı Bekleyen Staj Talepleri</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
name='Çıkış Yap'>
<Link  style={{ color: "black" ,marginLeft:"-190px"}} to={`/`}>Çıkış Yap</Link>

</Menu.Item>

      </Menu>
    </div>
  )
}
