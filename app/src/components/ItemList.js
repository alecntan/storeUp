import { React } from 'react';

// React-Bootstrap
import Table from 'react-bootstrap/Table';

// Form
import ItemForm from './ItemForm.js';

// server
import { putItem } from '../server.js';

export default function ItemList(props) {

    const headers = ['Identifier', 'Name', 'Serial #', 'Category', 'Status', 'Owner', 'notes' ];
    return(
        <Table responsive>
            <thead>
                <tr>
                    { headers.map((header) => <th key={header}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                { props.items.map((item) => <ItemRow key={item.identifier} item={item} />) }
            </tbody>
        </Table>
    );
}

function ItemRow(props) {

    const [ show, setShow ] = useState('');
    const toggleForm = () => setShow(!show);

    return (
        <>
            <tr>
                <td>{props.item.identifier}</td>
                <td>{props.item.name}</td>
                <td>{props.item.serialNum}</td>
                <td>{props.item.category}</td>
                <td>{props.item.status}</td>
                <td>{props.item.owner}</td>
                <td>{props.item.notes}</td>
            </tr>
            { show && <ItemList show={show} onToggle={toggleForm} title={'Edit Item'} item={props.item
        </>
    );
}
