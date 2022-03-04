import { React, useState, useEffect } from 'react';

// React-Bootstrap
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

// Server
import { getInventory } from '../server.js';


// nanoid
import { nanoid } from 'nanoid';

export default function ItemForm(props) {

    // State
    const [name, setName] = useState('');
    const [serialNum, setSerialNum] = useState('');
    const [owner, setOwner] = useState('');
    const [notes, setNotes] = useState('');
    const [category, setCategory] = useState('');
    const [storage, setStorage] = useState('');
    const [itemStatus, setStatus] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [ msg, setMsg ] = useState('')
    const [storages, setStorages] = useState([{'name': 'box-a'}, {'name' : 'box-b'}]);

    const handleNameChange = (e) => setName(e.target.value);
    const handleSerialChange = (e) => setSerialNum(e.target.value);
    const handleOwnerChange = (e) => setOwner(e.target.value);
    const handleNoteChange = (e) => setNotes(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleStorageChange = (e) => setStorage(e.target.value);
    const handleStatusChange = (e) => setStatus(e.target.value);
    const handleDelete = () => props.onDeleteItem(props.initValues.link);
    const handleToggleForm = () => props.onToggle();

    const handleFormResponse = (response) => {
        if(!response.ok) {
            setMsg(response.header.get('message'))
        } else {
            handleToggleForm();
        }
    }

    const handleSubmit = () => {
        const data = { 'data': [ {'name' : 'name'        , 'value' : name },
                                 {'name' : 'identifier'  , 'value' : identifier},
                                 {'name' : 'status'      , 'value' : itemStatus},
                                 {'name' : 'category'    , 'value' : category},
                                 {'name' : 'notes'       , 'value' : notes},
                                 {'name' : 'serialNumber', 'value' : serialNum},
                                 {'name' : 'owner'       , 'value' : owner},
                                 {'name' : 'storage'     , 'value' : storage}]
        };

        props.onSubmit(data, handleFormResponse);
    }

    const modalSetUp = () => {
        setName(props.item.name);
        setSerialNum(props.item.serialNum);
        setOwner(props.item.owner);
        setNotes(props.item.notes);
        setCategory(props.item.category);
        setStorage(props.item.storage);
        setStatus(props.item.status);
        setIdentifier(props.item.identifier !== '' ? props.item.identifier : nanoid());
    }


    const modalCleanUp = () => {
        setName('');
        setSerialNum('');
        setOwner('');
        setNotes('');
        setCategory('');
        setStorage('');
        setStatus('');
        setMsg('');
    }

    const validStatus = ['In Storage', 'In Use', 'Broken', 'Missing']
    const getStorages = () => getInventory(setStorages);
/*
    useEffect(() => {
        getStorages();
    }, []);
*/

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
                {msg !== '' ? <Alert variant={'warning'}>{props.formMessage}</Alert> : null}
                <Form>
                    <Form.Group className='mb-3' controlId='itemName'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' maxLength="15" value={name} onChange={handleNameChange} />
                    </Form.Group>
                    <fieldset disabled>
                        <Form.Group className='mb-3' controlId='itemIdentifier'>
                            <Form.Label>Identifier</Form.Label>
                            <Form.Control defaultValue={identifier} type='text' maxLength="15" />
                        </Form.Group>
                    </fieldset>

                    <Form.Group className='mb-3' controlId='itemCategory'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='text' maxLength="15" value={category} onChange={handleCategoryChange}/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='itemSerialNum'>
                        <Form.Label>Serial Number</Form.Label>
                        <Form.Control type='text' value={serialNum} onChange={handleSerialChange}/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='itemOwner'>
                        <Form.Label>Owner</Form.Label>
                        <Form.Control  type='text' maxLength="15" value={owner} onChange={handleOwnerChange}/>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='itemStatus'>
                        <Form.Label>Status</Form.Label >
                        <Form.Select value={itemStatus} onChange={handleStatusChange}>
                            {validStatus.map((is) => <option value={is} key={is}>{is}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='storage'>
                        <Form.Label>Storage</Form.Label>
                        <Form.Select value={storage} onChange={handleStorageChange}>
                            {storages.map((s) => <option value={s.name} key={s.name}>{s.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='itemNotes'>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control value={notes} as='textarea' maxLength='200' rows={3} onChange={handleNoteChange}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                { name !== '' &&  <Button variant='danger' onClick={handleDelete}>Delete</Button> }
                <Button variant='secondary' onClick={props.onToggle}>
                    Done
                </Button>
                <Button variant='primary' onClick={handleSubmit}>
                    submit
                </Button>
           </Modal.Footer>
        </Modal>
    )
}
