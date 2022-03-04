import { React, useState } from 'react'; 

// React-Bootstrap
import Button from 'react-bootstrap/Button';

// Components
import StorageForm from './StorageForm.js';

// Server
import { postStorage } from '../server.js';

export default function NewStorageButton(props) {

    const [ show, setShow ] = useState(false);
    const toggleForm = () => setShow(!show);
    const emptyStorage = {'name' : ''
                         ,'location' : ''
                         ,'notes' : ''};
                         
    return (
        <>
            <Button variant={'success'} onClick={toggleForm}>Add Storage</Button>
            { show && <StorageForm show={show} onToggle={toggleForm} title={'Add Storage'} storage={emptyStorage}  onSubmit={postStorage} />}
        </>
    );
}
