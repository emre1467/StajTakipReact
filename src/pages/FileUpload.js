import React from 'react'
import { Formik, Form } from 'formik'
import { Button, Container, GridColumn, GridRow, Input } from 'semantic-ui-react'


export default function FileUpload() {
    return (
        <div>
            <Container>
                <GridRow>
                    <GridColumn>
                        <Formik initialValues={{ photo1: '' }} onSubmit={(values) => { 
                            let data=new FormData();
                            }}>
                            {(formProps) => (
                                <Form>
                                    <Input type='file' name="photo1"
                                        onChange={(event) => formProps.setFieldValue
                                            ('photo1', event.target.files[0])}></Input>
                                    <Button type="submit">Submit </Button>
                                </Form>
                            )}
                        </Formik>
                    </GridColumn>
                </GridRow>
            </Container>
        </div>
    )
}
