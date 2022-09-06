import React from 'react';
import StudentList from '../pages/StudentList';
//import { Grid } from 'semantic-ui-react'
import { Route } from 'react-router';
import InternshipRequestList from '../pages/InternshipRequestList';
import AddStudent from '../pages/AddStudent';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import MyInternshiprequest from '../pages/MyInternshiprequest';
import AddInternshipRequest from '../pages/AddInternshipRequest';
import MyInternshipRequestDetail from '../pages/MyInternshipRequestDetail';
import File from '../pages/File';
import AdminLogin from '../pages/AdminLogin';
import Navi from './Navi';
import { Grid, GridColumn } from 'semantic-ui-react';
import FileUploadd from '../pages/FileUploadd';
import FirebaseFile from '../pages/FirebaseFile';
import AddCompany from '../pages/AddCompany';
import Companies from '../pages/Companies';
import AdminPage from '../pages/AdminPage';
import ApprovedConfirmCompanies from '../pages/ApprovedConfirmCompanies';
import RejectedConfirm from '../pages/RejectedConfirm';
import UncertainConfirmCompanies from '../pages/UncertainConfirmCompanies';
import CompanyDetail from '../pages/CompanyDetail';
import ApprovedInternshipRequest from '../pages/ApprovedInternshipRequest';
import UncertainInternshipRequest from '../pages/UncertainInternshipRequest';
import RejectedInternshipRequest from '../pages/RejectedInternshipRequest';
import InternshipRequestDetail from '../pages/InternshipRequestDetail';
import Profil from '../pages/Profil';

export default function Dashboard() {
    return (
        <div >
            <Route exact path="/" component={Login} />
            <Route exact path="/1" component={FileUploadd} />
            <Route exact path="/2" component={FirebaseFile} />
            <Route exact path="/3" component={AddCompany} />
            <Route exact path="/adminLogin" component={AdminLogin} />




            <Route exact path="/addstudent" component={AddStudent} />

            <Grid divided >
                <Grid.Row>
                    <Grid.Column width={3}>


                        <Route exact path="/students" component={StudentList} />
                        <Route path="/myPage/:id" component={MyPage} />
                        <Route path="/adminPage/:id" component={AdminPage} />

                        <Route path="/internshiprequest" component={InternshipRequestList} />



                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Route exact path="/myPage/:id/MyInternshipRequest" component={MyInternshiprequest} />
                        <Route path="/myPage/:id/MyInternshipRequestAdd" component={AddInternshipRequest} />
                        <Route path="/myPage/:id/AddCompany" component={AddCompany} />
                        <Route path="/myPage/:id/Companies" component={Companies} />
                        <Route path="/myPage/:id/Profil" component={Profil} />


                        <Route exact path="/adminPage/:id/Companies" component={Companies} />
                        <Route path="/adminPage/:id/AddCompany" component={AddCompany} />
                        <Route exact path="/adminPage/:id/ApprovedConfirmCompanies" component={ApprovedConfirmCompanies} />
                        <Route exact path="/adminPage/:id/RejectedConfirmCompanies" component={RejectedConfirm} />
                        <Route exact path="/adminPage/:id/UncertainConfirmCompanies" component={UncertainConfirmCompanies} />

                        <Route exact path="/adminPage/:id/ApprovedInternshipRequest" component={ApprovedInternshipRequest} />
                        <Route exact path="/adminPage/:id/RejectedInternshipRequest" component={RejectedInternshipRequest} />
                        <Route exact path="/adminPage/:id/UncertainInternshipRequest" component={UncertainInternshipRequest} />


                        <Route exact path="/myPage/:id/MyInternshipRequest/:idd" component={MyInternshipRequestDetail} />
                        <Route exact path="/adminPage/:id/ApprovedConfirmCompanies/:idd" component={CompanyDetail} />
                        <Route exact path="/adminPage/:id/RejectedConfirmCompanies/:idd" component={CompanyDetail} />
                        <Route exact path="/adminPage/:id/UncertainConfirmCompanies/:idd" component={CompanyDetail} />

                        <Route exact path="/adminPage/:id/ApprovedInternshipRequest/:idd" component={InternshipRequestDetail} />
                        <Route exact path="/adminPage/:id/RejectedInternshipRequest/:idd" component={InternshipRequestDetail} />
                        <Route exact path="/adminPage/:id/UncertainInternshipRequest/:idd" component={InternshipRequestDetail} />


                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}
