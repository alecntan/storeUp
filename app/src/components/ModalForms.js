import { React, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export function NewStorageForm(props) {
    
    const [storageName, setStorageName] = useState(props.initValues.name);
    const handleNameChange = (e) => setStorageName(e.target.value);
    
    const [storageLoc, setStorageLoc] = useState(props.initValues.location);
    const handleLocChange = (e) => setStorageLoc(e.target.value);

    const [storageNote, setStorageNote] = useState (props.initValues.notes);
    const handleNoteChange = (e) => setStorageNote(e.target.value);

    const handleSubmit = () => {
        const data = {
            'isEdit'  : props.initValues.name === '' ? false : true,
            'link'    : props.initValues.link,
            'content' : { 'data': [ {'name' : 'name', 'value' : storageName },
                                    {'name' : 'location', 'value' : storageLoc},
                                    {'name' : 'notes', 'value' : storageNote}]
                        }
        };
        props.onSubmit(data);
    };


    return (
        <Modal
            show={props.onShow}
            onHide={props.onClose}
            backdrop='static'
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.initValues.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {props.formMessage !== '' ? <Alert variant={'warning'}>{props.formMessage}</Alert> : null}
            <Form>
                <Form.Group className='mb-3' controlId='storageName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={storageName} maxLength="15" onChange={handleNameChange} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='storageLocation'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type='text' value={storageLoc} maxLength='50' onChange={handleLocChange} />
                </Form.Group>
                <Form.Group className='mb-3' controlId='storageNotes'>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as='textarea' value={storageNote} maxLength='200' rows={3} onChange={handleNoteChange} />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.onClose}>
                    cancel
                </Button>
                <Button variant='primary' onClick={handleSubmit}>
                    submit
                </Button>
           </Modal.Footer>
        </Modal>
    );
}



export function NewItemForm(props) {

    const [name, setName] = useState(props.initValues.name);
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const [serialNum, setSerialNum] = useState(props.initValues.serialNum);
    const handleSerialChange = (e) => {
        setSerialNum(e.target.value);

    };

    const [owner, setOwner] = useState(props.initValues.owner);
    const handleOwnerChange = (e) => {
        setOwner(e.target.value);
    };

    const [notes, setNotes] = useState(props.initValues.notes);
    const handleNoteChange = (e) => {
        setNotes(e.target.value);
    };
    
    const [category, setCategory] = useState(props.initValues.category);
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const [storage, setStorage] = useState(props.initValues.storage);
    const handleStorageChange = (e) => {
        setStorage(e.target.value);
    };

    const [itemStatus, setStatus] = useState(props.initValues.status);
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleSubmit = () => {
        const data = {
            'isEdit'  : props.initValues.name === '' ? false : true,
            'link'    : props.initValues.name === '' ? props.storages.find(s => s.name === storage).itemsLink : props.initValues.link,
            'content' : { 'data': [ {'name' : 'name'        , 'value' : name },
                                    {'name' : 'identifier'  , 'value' : props.initValues.identifier},
                                    {'name' : 'status'      , 'value' : itemStatus},
                                    {'name' : 'category'    , 'value' : category},
                                    {'name' : 'notes'       , 'value' : notes},
                                    {'name' : 'serialNumber', 'value' : serialNum},
                                    {'name' : 'owner'       , 'value' : owner},
                                    {'name' : 'storage'     , 'value' : storage}]
                        }
        };
        props.onSubmit(data);
    };

    const handleDelete = () => {
        props.onDeleteItem(props.initValues.link);
    };

    return (
        <Modal
            show={props.onShow}
            onHide={props.onToggle}
            backdrop='static'
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.initValues.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.formMessage !== '' ? <Alert variant={'warning'}>{props.formMessage}</Alert> : null}
                <Form>
                    <Form.Group className='mb-3' controlId='itemName'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' maxLength="15" value={name} onChange={handleNameChange} />
                    </Form.Group>
                    <fieldset disabled>
                        <Form.Group className='mb-3' controlId='itemIdentifier'>
                            <Form.Label>Identifier</Form.Label>
                            <Form.Control defaultValue={props.initValues.identifier} type='text' maxLength="15" />
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
                            {props.validStatus.map((is) => <option value={is} key={is}>{is}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='storage'>
                        <Form.Label>Storage</Form.Label>
                        <Form.Select value={storage} onChange={handleStorageChange}>
                            {props.storages.map((s) => <option value={s.name} key={s.name}>{s.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='itemNotes'>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control value={notes} as='textarea' maxLength='200' rows={3} onChange={handleNoteChange}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                { props.initValues.name !== '' ?  <Button variant='danger' onClick={handleDelete}>
                                                    Delete
                                                 </Button>
                                              : null }
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
