import { React, useState, useEffect } from 'react' 
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ItemTable from './ItemTable.js';
import Alert from 'react-bootstrap/Alert';
import { getItems } from '../server.js';


export default function StorageGrid(props) {

        
    return (
        <Container className='my-4'>
            { props.storages.length > 0 ? <Grid onEditStorage={props.onEditStorage} onAddItem={props.onAddItem} onEditItem={props.onEditItem} storages={props.storages} onDeleteStorage={props.onDeleteStorage} /> : <h4>No Storages</h4> }
        </Container>
    );
}

function Grid(props) {
    return (
        <>
        <h4>Storages</h4>
        { props.storages.map((s) => <Storage onEditStorage={props.onEditStorage} onAddItem={props.onAddItem} onEditItem={props.onEditItem} onDeleteStorage={props.onDeleteStorage} key={s.name} storage={s} itemsLink={s.itemsLink} />) }
        </>
    );
}

function Storage(props) {

    const [items, setItems] = useState([]);
    const getData = () => getItems(props.itemsLink, setItems);
    useEffect(() => {
        const id = setInterval(getData, 3000);
        getData();
        return () => clearInterval(id);
    }, []);

    return (
        <StorageCard onEditStorage={props.onEditStorage} onEditItem={props.onEditItem} onAddItem={props.onAddItem} onDeleteStorage={props.onDeleteStorage} storage={props.storage} items={items} itemsLink={props.itemsLink}/>
    );
}


function StorageCard(props) {
    const [showItems, setShowItems] = useState(false);
    const toggleShowItems = () => setShowItems(!showItems);

    const handleEditStorage = () => { props.onEditStorage(props.storage); };
    const handleDeleteStorage = () => { props.onDeleteStorage(props.storage.href) };

    const handleAddItem = () => { props.onAddItem(props.itemsLink, props.storage.name) };
    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title>{props.storage['name']}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>{props.storage['location']}</Card.Subtitle>
                <Card.Text>
                    {props.storage['notes']}
                </Card.Text>
                { showItems ? <EmbeddedItemTable items={props.items} handleEdit={props.onEditItem} /> : null}
                <Container>
                    <Row md='auto'>
                        <Col><Button onClick={toggleShowItems} variant='primary'>{ showItems ? "Hide Items" : "Show Items"}</Button></Col>
                        <Col><Button onClick={handleAddItem} variant='success'>Add Item</Button></Col>
                        <Col><Button variant='secondary' onClick={handleEditStorage}>Edit</Button></Col>
                        <Col>
                            <OverlayTrigger overlay={<Tooltip id='tooltip-disabled'>Must be empty</Tooltip>}>
                                <span className='d-inline-block'>
                                    { props.items.length > 0 ? <Button variant='danger' onClick={handleDeleteStorage} disabled>Delete</Button> : <Button variant='danger' onClick={handleDeleteStorage} >Delete</Button> }
                               </span>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    );
}

function EmbeddedItemTable(props) {
    return (
        <Container className='mb-3'>
            <Card.Title>Items</Card.Title> 
            <Alert variant={'info'}>Click on Item to Edit</Alert>
            { props.items.length > 0 ? <ItemTable items={props.items} handleEdit={props.handleEdit}/> : <p>No items</p> }
        </Container>
    );
}
