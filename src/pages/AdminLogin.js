import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Form, Grid, Image } from 'semantic-ui-react';
import * as Yup from "yup";
import AdminService from '../services/adminService';


export default function AdminLogin() {
  let adminService = new AdminService();
  const [e, setE] = useState()

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handlereset,
    handleChange,
    handleBlur,
    dirty,

  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("mail olarak girin").required("email giriniz"),
      password: Yup.string().required("email giriniz"),
    }),

    onSubmit: (values) => {
      adminService.getAdminsByEmailandPassword(values.email, values.password)
        .then(result => setE(result.data.data[0].adminId))
      console.log(e)
      if (e != null) {
        window.location.assign(`http://localhost:3000/adminPage/${e}`)

      }


    },
  });
  document.body.style.backgroundImage = "url('https://dijital.ninja/wp-content/uploads/2021/01/purple-background-1920x1080_c.jpg')";

  return (
    <div align="center" style={{ marginTop: '150px' ,fontFamily: 'Josefin Sans'} }>
      <Card widths="equal" image='/resim.png' color='blue' style={{ borderRadius: "15px 15px 15px 15px"}}>

        <Card.Content header="Giriş Yap">

          <Image
            floated='left'
            size='tiny'
            src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Aibu.jpg"
          />
          <Card.Header style={{ color: "#00ADB5", marginTop: "8px", marginRight: "45px" }}><h1 >BAIBU</h1><h5 style={{ marginLeft: "45px", marginTop: "-15px" }}>Staj Takip Yönetim Sistemi</h5></Card.Header>
        </Card.Content>
        <Card.Content >
          <Form onSubmit={handleSubmit} >
            <Form.Group widths="equal">
              <Form.Input
                id="email"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={
                  errors.email && touched.email}
                label="Email"
                placaholder="Email giriniz"
              ></Form.Input>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                id="password"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={
                  errors.password && touched.password}
                label="Şifre"
                placaholder="Şifre giriniz"
              ></Form.Input>
            </Form.Group>
            <Button /*handlereset={handlereset} */ color='green' disabled={!dirty} type="submitt" >Giriş Yap </Button>


          </Form>
        </Card.Content>
      </Card>
    </div>
  )
}
