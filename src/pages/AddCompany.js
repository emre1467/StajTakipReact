import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Button, Card, Form, Grid } from 'semantic-ui-react';
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "./firebase-config"
import CompanyService from '../services/companyService';
import { db } from "./firebase-config"
import { collection, getDocs,addDoc, query,where,updateDoc ,doc} from "firebase/firestore"

const companyCollectionRef = collection(db, "companies")

export default function AddCompany() {
  const createCompany=async ()=>{

      const docref=await addDoc(companyCollectionRef,{name:values.name,address:values.address,phoneNumber:values.phoneNumber,protocolUrl:values.protocolUrl,confirm:values.confirm,id:10})
      const stuDoc=doc(db,"companies",docref.id)
      await updateDoc(stuDoc,{id:docref.id})
    
  
  }
  let companyService = new CompanyService();
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handlereset,
    handleChange,
    handleBlur,
    dirty,
    onBlur,

  } = useFormik({
    initialValues: {
      companyId: "0",
      name: "",
      address: "",
      protocolUrl: "",
      phoneNumber: "",
      confirm: "Onaylanmayı bekliyor"
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Şirketin ismini giriniz"),
      address: Yup.string().required("Şirketin adresini giriniz"),
      phoneNumber: Yup.string().required("Şirketin telefon numarasını giriniz"),

    }),
    onSubmit: (values) => {

    }
  })
  const [z, setZ] = useState();
  const [progress, setProgress] = useState(0)

  function gönder() {
    dene()
  }
  let j = 0;

  function dene() {
    let i = 0;
    while (i < 1) {
      if(values.name==""||values.address==""||values.phoneNumber==""||z==null){
        alert("Alanları Boş bırakmayınız")
        
      }else{
        formHandler()

      }

console.log(values)


      
      i = i + 1;
    }
  }
  function kaydet() {
  }



  const formHandler = () => {
    console.log("form")
    z.preventDefault();
    const file = z.target.files[0];
    uploadFiles(file)
    
  };
  const uploadFiles = (file) => {
    if (!file) return;
    console.log(file)
    console.log(values)

    const storageRef = ref(storage, `/company/${values.phoneNumber}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

      setProgress(prog)

    }, (err) => console.log(err),
      () => {
        //getDownloadURL(uploadTask.snapshot.ref).then((url) => values.protocolUrl = url).finally(()=>companyService.addCompany(values).then(result => console.log(result)))
        getDownloadURL(uploadTask.snapshot.ref).then((url) => values.protocolUrl = url).finally(()=>createCompany())
       console.log(values.protocolUrl+"dcs")
      
      }
    )
  };


  return (
    <div align="center" style={{ marginTop: '100px', marginLeft: '130px', marginBottom: "160px" }}>
      <Card widths="equal">
        <Card.Content header="Şirket Ekle"></Card.Content>
        <Card.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths={'equal'}>
              <Form.Input
                id="name"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name && touched.name}
                label="İsim"
                placeholder="İsim giriniz"></Form.Input>
            </Form.Group>

            <Form.Group widths={'equal'}>
              <Form.Input
                id="address"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                error={errors.address && touched.address}
                label="Adres"
                placeholder="Adres giriniz"></Form.Input>
            </Form.Group>

            <Form.Group widths={'equal'}>
              <Form.Input
                id="phoneNumber"
                type='text'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                error={errors.phoneNumber && touched.phoneNumber}
                label="Telefon Numarası"
                placeholder="Telefon numarası giriniz"></Form.Input>
            </Form.Group>


            <Form.Group widths="equal" >
              <Form.Input
                id="url"
                type='file'
                onChange={(r) => setZ(r)}
                onBlur={onBlur}
                label="Şirket Protokolü"
              />

            </Form.Group>

            <Button type="submit" handleSubmit={handleSubmit} onClick={gönder} >oluştur</Button>
            <h3 > Yükleniyor {progress}</h3>

          </Form>
        </Card.Content>
      </Card>

    </div>
  );
}
