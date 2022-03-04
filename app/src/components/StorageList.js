import { React, useState, useContext } from 'react';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Accordion  from 'react-bootstrap/Accordion';
import useAccordionButton from 'react-bootstrap/AccordionButton';
import AccordionContext from 'react-bootstrap/AccordionContext';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Collapse from 'react-bootstrap/Collapse';

// React Icons
import { IoIosListBox } from 'react-icons/io';
import { HiPencilAlt } from 'react-icons/hi';
import { IoAddCircle, IoTrashBinSharp } from 'react-icons/io5';

// Components
import StorageForm from './StorageForm.js';
import ItemForm from './ItemForm.js';
import ItemList from './ItemList.js';


// Server
import { postStorage, deleteStorage, postItem} from '../server.js';

export default function StorageList(props) {

    return (
        <Container>
            { props.storages.map((s) => <StorageCard key={s.name} storage={s} />) }
        </Container>
    );
}

function StorageCard(props) {

    const [ showItems, setShowItems ] = useState(false)
    const toggleItems = () => {
        console.log('hello');
        setShowItems(!showItems);
    }


    const items = [ {'identifier' : 'AAA'
                    ,'name'       : 'HDMI'
                    ,'serialNum'  : 'BBB'
                    ,'category'   : 'Cable'
                    ,'status'     : 'In storage'
                    ,'owner'      : 'Tech'
                    ,'notes'      : 'Very Good! Althought might need replacement'}];

    return (
        <Card>
            <Card.Body>
                <Card.Title >
                    {props.storage.name} 
                 </Card.Title>
                 <Card.Subtitle className='mb-3 text-muted'>{props.storage.location}</Card.Subtitle>
                <Card.Subtitle>Notes:</Card.Subtitle>
                <Card.Text>
                    { props.storage.notes }
                </Card.Text>
                <Stack direction='horizontal'>
                    <ToggleItemButton onToggleItems={toggleItems} />
                    <AddNewItemButton />
                    <EditStorageButton storage={props.storage} />
                    <DeleteStorageButton has_items={items.length > 0} />
                </Stack>
                <Collapse in={showItems}>
                    <div aria-expanded={showItems}>
                        <ItemList items={items} />
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
}

function ToggleItemButton(props){

    const handleClick = () => {
        props.onToggleItems()
    }

    return (
        <>
        <OverlayTrigger 
            placement={'top'}
            overlay={
                <Tooltip>
                    Toggle Items
                </Tooltip>
            }
        >
            <Button 
                variant={'white'} 
                onClick={handleClick}
                aria-controls='items'
        >
            <IoIosListBox size='1.3em'/>
        </Button>
        </OverlayTrigger>
        </>
    );
}

function AddNewItemButton(props){

    const [ show, setShow ] = useState(false);
    const toggleForm = () => setShow(!show);
    const empty_item = {'identifier' : ''
                       ,'name'       : ''
                       ,'serialNum'  : ''
                       ,'category'   : ''
                       ,'status'     : ''
                       ,'owner'      : ''
                       ,'notes'      : ''}
    return (
        <>
            <OverlayTrigger 
                placement={'top'}
                overlay={
                    <Tooltip>
                        Add New Item
                    </Tooltip>
                }
            >
                <Button variant={'white'} onClick={toggleForm}><IoAddCircle size='1.3em'/></Button>
            </OverlayTrigger>
            <ItemForm show={show} onToggle={toggleForm} title={'Register Item'} item={empty_item} onSubmit={postItem} /> 
        </>
    );
}

function EditStorageButton(props){
    const [ show, setShow ] = useState(false);
    const toggleForm = () => setShow(!show);

    return (
        <>
            <OverlayTrigger 
                placement={'top'}
                overlay={
                    <Tooltip>
                        Edit Storage
                    </Tooltip>
                }
            >
                <Button variant={'white'} onClick={toggleForm} ><HiPencilAlt size='1.3em'/></Button>
            </OverlayTrigger>
            { show && <StorageForm show={show} onToggle={toggleForm} title={'Edit Storage'} storage={props.storage} onSubmit={postStorage} />}
        </>
    );
}

function DeleteStorageButton(props){
    
    const handleDeleteStorage = () => {
        if(!props.has_items) {
            deleteStorage(deleteStorage(props.storage.href));
        }
    }

    return (
        <>
        <OverlayTrigger 
            placement={'top'}
            overlay={
                <Tooltip>
                { props.has_items ? "Remove Items before deleting Storage" : "Delete Storage" }
                </Tooltip>
            }
        >
            <Button variant={'white'} onClick={handleDeleteStorage} ><IoTrashBinSharp size='1.3em' /></Button>
        </OverlayTrigger>
        </>
    );
}
