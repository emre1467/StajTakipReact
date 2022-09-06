import { useFormik } from "formik"
import * as Yup from "yup";
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Form, FormSelect, Select } from 'semantic-ui-react';
import CompanyService from "../services/companyService"
import InternshipRequestService from "../services/internshipRequestService"
import PeriodService from "../services/periodService";
import { storage } from "./firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";



export default function AddInternshipRequest() {
    let { id } = useParams();

    let internshipRequestService = new InternshipRequestService();
    const [companies, setCompanies] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [i,setI]=useState()
    useEffect(() => {
        let companyService = new CompanyService();
        companyService.getCompanies().then((result) => setCompanies(result.data.data))
        let periodService = new PeriodService();
        periodService.getPeriods().then((result) => setPeriods(result.data.data))
    }, [])

    const {
        values,
        errors,
        touched,
        handleSubmit,
        handlereset,
        handleChange,
        handleBlur,
        dirty,
        setFieldValue,
        onBlur,


    } = useFormik({
        initialValues: {
            company: { companyId: "" },
            period: { periodId: "" },
            confirm: "Onaylanmayı bekliyor",
            isgName: "",
            isgUrl: "",
            internshipformName: "",
            internshipformUrl: "",
            müstehaklıkUrl: "",
            müstehaklıkName:"",
            startDate: "",
            endDate: "",
            workDay: "",
            student: { studentId: 1 },
        },
        validationSchema: Yup.object({
            companyCompanyId: Yup.number().required("Bir şirket seçiniz"),
            periodPeriodId: Yup.number().required("Bir Dönem seçiniz"),
            startDate: Yup.date().required("Başlangıç tarihi giriniz"),
            endDate: Yup.date().required("Bitiş tarihi giriniz"),
            workDay: Yup.number().required("İş günü sayısı")

        }),
        onSubmit: (values) => {
            },
    });
    function gönder(){
        let p=0;
        while(p<1){
            p=p+1;
        deneme()

        }
    }
    function deneme() {
        let k=0;
       let j=0;
        while (j < 1) {

            values.student.studentId = id
            while(k<1){
                k=k+1;
            console.log("içinde")

                formHandler()
            }
         
          

            j=j+1;
        }
        console.log("dışında")


    }
    

    const companiesOptions = companies.map((company) => ({
        key: company.companyId,
        text: company.name,
        value: company.companyId,
    }));

    const periodsOptions = periods.map((period) => ({
        key: period.periodId,
        text: period.name,
        value: period.periodId,
    }));

    const [isg, setIsg] = useState()
    const [internshipform, setInternshipform] = useState()
    const [z, setZ] = useState();
    //************************* */


//****************** */

    const [progress, setProgress] = useState(0)
    const [progress2, setProgress2] = useState(0)
    const [progress3, setProgress3] = useState(0)
    const [progress4, setProgress4] = useState(0)



    const formHandler = () => {
        z.preventDefault();
        const file = z.target.files[0];
        console.log("form handler1-1")

        uploadFiles(file)
    };
    const uploadFiles = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            setProgress(prog)

        }, (err) => console.log(err),
            () => {
                console.log("form handler1")
                values.müstehaklıkName=file.name
                getDownloadURL(uploadTask.snapshot.ref).then((url) => values.müstehaklıkUrl = url).finally(()=>formHandlerIsg())
            }
        )
    };




    const formHandlerIsg = () => {
        isg.preventDefault();
        const file = isg.target.files[0];
        console.log("form handler2-1")

        uploadFilesIsg(file)
    };
    const uploadFilesIsg = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            setProgress2(prog)

        }, (err) => console.log(err),
            () => {
                values.isgName = file.name
                console.log("form isg")
                
                getDownloadURL(uploadTask.snapshot.ref).then((url) => values.isgUrl = url).finally(()=>formHandlerForm())
            }
        )
    };




    const formHandlerForm = () => {
        internshipform.preventDefault();
        const file = internshipform.target.files[0];
        console.log("form handler3-1")

        uploadFilesForm(file)
    };
    const uploadFilesForm = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            setProgress3(prog)

        }, (err) => console.log(err),
            () => {
                values.internshipformName = file.name
                console.log("form form")

                getDownloadURL(uploadTask.snapshot.ref).then((url) => values.internshipformUrl = url).finally(()=>internshipRequestService.addInternshipRequest(values).then(result => alert("Staj talebi eklendi")))
            }
        )
    };




    return (
        <div align="center" className="form" style={{ marginTop: '50px', marginLeft: '130px' }} >
            <Card style={{color:"deepskyblue"}}>
                <Card.Content >
                    <Card.Header  style={{color:"deepskyblue"}}>Staj Talebi Oluştur</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Form size="tiny"style={{color:"deepskyblue"}}>
                        <Form.Group widths="equal" >
                            <FormSelect
                                id="company.companyId"
                                onChange={(fieldname, data) => setFieldValue("company.companyId", data.value)}
                                onBlur={onBlur}
                                options={companiesOptions}
                                label="Şirket"
                                value={values.company.companyId}
                                placeholder='Şirket seçiniz'
                                search
                                selection

                            />


                        </Form.Group>
                        <Form.Group >
                            <FormSelect
                                id="period.periodId"
                                onChange={(fieldname, data) => setFieldValue("period.periodId", data.value)}
                                onBlur={onBlur}
                                options={periodsOptions}
                                label="Dönem"
                                value={values.period.periodId}
                                placeholder='Dönem seçiniz'
                                search
                                selection
                                error={errors.periodId && touched.periodId}

                            />
                        </Form.Group>
                        <Form.Group>


                            <Form.Input
                                id="workDay"
                                type="number"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.workDay}
                                label="İş günü"
                                placeholder="İş günü"
                                error={errors.workDay && touched.workDay}
                            >
                            </Form.Input>
                        </Form.Group>

                        <Form.Group widths="equal"  >
                            <Form.Input
                            style={{color:"deepskyblue"}}
                                id="startDate"
                                type="date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.startDate}

                                label="Başlangıç Tarihi"
                                placeholder="Tarihi seçin"
                                error={errors.startDate && touched.startDate}
                            ></Form.Input>


                            <Form.Input
                                id="endDate"
                                type="date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.endDate}
                                label="Bitiş Tarihi"
                                placeholder="Tarihi seçin"
                                error={errors.endDate && touched.endDate}
                            ></Form.Input>
                        </Form.Group>


                        <Form.Group widths="equal" >
                            <Form.Input
                                id="url"
                                type='file'
                                onChange={(r) => setIsg(r)}
                                onBlur={onBlur}
                                label="İsg Belgesi"
                            />

                        </Form.Group>

                        <Form.Group widths="equal" >
                            <Form.Input
                                id="url"
                                type='file'
                                onChange={(r) => setInternshipform(r)}
                                onBlur={onBlur}
                                label="Zorunlu Staj Başvuru Formu"
                            />

                        </Form.Group>

                        <Form.Group widths="equal" >
                            <Form.Input
                                id="url"
                                type='file'
                                onChange={(r) => setZ(r)}
                                onBlur={onBlur}
                                label="Müstehaklık belgesi"
                            />

                        </Form.Group>



                        <Link style={{marginRight:"20px",color:"deepskyblue"}} to={`/myPage/${id}/AddCompany`}>Şirket Talebi</Link>
                        <Button style={{backgroundColor:"deepskyblue",color:"white"}} type="submit" onClick={deneme} >Oluştur</Button>
<h4>Yükleniyor  {progress3}</h4>
                    </Form>
                </Card.Content>
            </Card>


        </div>
    )
}

