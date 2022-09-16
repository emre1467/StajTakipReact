import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Card, Form, Grid } from 'semantic-ui-react';

import React, { useState } from 'react' 
import { useEffect } from 'react'
import { db } from "./firebase-config"
import { collection, getDocs,addDoc, query,where,updateDoc ,doc} from "firebase/firestore"

export default function AddStudent2() {


    const studentCollectionRef=collection(db,"students")
    const createUser=async ()=>{
        const docref=await addDoc(studentCollectionRef,{name:values.name,surname:values.surname,email:values.email,department:values.department,password:values.password,studentNo:values.studentNo, id:10})
        const stuDoc=doc(db,"students",docref.id)
        await updateDoc(stuDoc,{id:docref.id})
    
    
    }

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
            department: "",//Güncellemek için içine değer yaz
            email: "",
            name: "",
            password: "",
            studentId: "0",
            studentNo: "",
            surname: "",
        },
        validationSchema: Yup.object({
            department: Yup.string().required("bölüm giriniz"),
            email: Yup.string().email("email olacak").required("email giriniz"),
            name: Yup.string().required("İsim giriniz"),
            password: Yup.string().required("Şifre giriniz"),
            studentNo: Yup.string().required("Numaranızı giriniz"),
            surname: Yup.string().required("Soyadınızı giriniz"),
        }),
        onSubmit: (values) => {
            /*
            values.studentId = 0;
            console.log(values);
            studentService.addStudent(values)
                .then((result) => console.log(result.data.data)).finally(()=>alert("Kaydınız gerçekleşmiştir. Sisteme giriş yapabilirsiniz."))
*/
createUser()
alert("Öğrenci Eklendi")
        },
    });
    
    return (

        <div align="center" className="form" style={{ marginTop: '50px', marginLeft: '130px' }}>
            <Card    >
                <Card.Content header="KAYIT OL"></Card.Content>
                <Card.Content>
                    <Form onSubmit={handleSubmit} size="small">


                        <Form.Group widths="equal">
                            <Form.Input
                                id="name"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}

                                error={
                                    errors.name && touched.name && errors.name}
                                label="İsim"
                                placaholder="İsim giriniz"
                            ></Form.Input>
                        </Form.Group>

                        <Form.Group widths="equal">

                            <Form.Input
                                id="surname"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.surname}
                                label="Soyisim"
                                placaholder="Soyisim giriniz"
                                error={
                                    errors.surname && touched.surname && errors.surname
                                }
                            ></Form.Input>
                        </Form.Group>
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
                        </Form.Group><Form.Group widths="equal">
                            <Form.Input
                                id="department"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.department}

                                label="Bölüm"
                                placaholder="Bölüm giriniz"
                            ></Form.Input>
                        </Form.Group>

                        <Form.Group widths="equal">
                            <Form.Input
                                id="password"
                                type="text"
                                onChange={handleChange}
                                 onBlur={handleBlur}
                                value={values.password}

                            label="Şifre"
                            //placaholder="Şifre girinizz"
                            ></Form.Input>
                        </Form.Group>

                        <Form.Group widths="equal">
                            <Form.Input
                                id="studentNo"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.studentNo}

                                label="Okul Numara"
                                placaholder="Okul numaranızı giriniz"
                            ></Form.Input>
                        </Form.Group>
                        <a href='http://localhost:3000/' style={{marginRight:"20px"}}>Giriş Sayfası</a>

                        <Button handlereset={handlereset} type="submit" disabled={!dirty} primary> Kayıt Ol</Button>
                    
                    </Form>
                </Card.Content>
            </Card>

        </div>



    );
}   