import React from 'react'
import { Button, Menu } from 'semantic-ui-react'


export default function SignedOut({signIn}) {
    return (
        <div>
            <Menu.Item>
                
                <Button  color='white'  inverted onClick={signIn} style={{marginRight:'1.4em'}} >Giriş yap</Button>
                <Button  color='white'  inverted style={{marginLeft:'0.5em'}}>Kayıt ol</Button>
            </Menu.Item>
        </div>
    )
}
