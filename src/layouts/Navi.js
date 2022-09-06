import React, { useState } from 'react'
import { Button, Dropdown, Menu, Grid, Icon } from 'semantic-ui-react'
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'
import { Link } from 'react-router-dom'




export default function Navi() {

    const [isAuthenticated, setisAuthenticated] = useState(false)

    function handleSignedOut(params) {
        setisAuthenticated(false)
    }
    function handleSignedIn(params) {
        setisAuthenticated(true)
    }




    return (
        <div >

            <Menu color='teal' inverted fixed  >
                <Link to={`/`}><Menu.Item
                    icon="handshake outline"
                    name='İnsan Kaynakları'
                /></Link>



                <Menu.Menu position='right' >
                  

                    {isAuthenticated ? <SignedIn signOut={handleSignedOut} /> : <SignedOut signIn={handleSignedIn} />}
                </Menu.Menu>


            </Menu>

        </div>
    )
}
