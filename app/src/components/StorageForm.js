import { React, useState } from 'react';

// React-Bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


export default function StorageForm(props) {

     // State
    const [name, setName] = useState('');
    const [loc, setLoc] = useState('');
    const [notes, setNotes] = useState('');
    const [ msg, setMsg ] = useState('');

    // Handlers
    const handleNameChange = (e) => setName(e.target.value);
    const handleLocChange = (e) => setLoc(e.target.value);
    const handleNotesChange = (e) => setNotes(e.target.value);
    const handleToggleForm = () => props.onToggle();

    const handleFormResponse = (response) => {
        if(!response.ok) {
            setMsg(response.headers.get('message'));
        } else {
            handleToggleForm();
        }
    }

    const handleSubmit = () => {
        const data = { 'data' : [{'name' : 'name', 'value' : name}
                                ,{'name' : 'location', 'value' : loc}
                                ,{'name' : 'notes', 'value' : notes}]};

        props.onSubmit(data, handleFormResponse);
    }

    const modalSetUp = () => {
        setName(props.storage.name);
        setLoc(props.storage.location);
        setNotes(props.storage.notes);
    }

    const modalCleanUp = () => {
        setName('');
        setLoc('');
        setNotes('');
        setMsg('');
    }


    return (
        <Modal
            show={props.show}
            onHide={handleToggleForm}
            onEnter={modalSetUp}
            onExited={modalCleanUp}
            backdrop='static'
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            { msg !== '' && <Alert variant={'warning'}>{msg}</Alert>}
            <Form>
                <Form.Group className='mb-3' controlId='storageName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={name} maxLength="15" onChange={handleNameChange} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='storageLocation'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type='text' value={loc} maxLength='50' onChange={handleLocChange} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='storageNotes'>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as='textarea' value={notes} maxLength='200' rows={3} onChange={handleNotesChange} />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleToggleForm}>
                    Cancel
                </Button>
                <Button variant='primary' onClick={handleSubmit}>
                    Submit
                </Button>
           </Modal.Footer>
        </Modal>
    );
}
