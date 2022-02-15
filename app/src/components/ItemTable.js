import React from 'react'
import Table from 'react-bootstrap/Table';


export default function ItemTable(props) {

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Identifier</th>
                    <th>Status</th>
                    <th>Category</th>
                    <th>Serial #</th>
                    <th>Owner</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map((i) => <ItemRow key={i.identifier} handleEdit={props.handleEdit} item={i} />)}
            </tbody>
        </Table>
    );
}

function ItemRow(props) {

    const handleClick = () => {
        props.handleEdit(props.item);
    };

    return (
        <>
            <tr onClick={handleClick}>
                <td>{props.item.name}</td>
                <td>{props.item.identifier}</td>
                <td>{props.item.status}</td>
                <td>{props.item.category}</td>
                <td>{props.item.serialNum}</td>
                <td>{props.item.owner}</td>
                <td>{props.item.notes}</td>
            </tr>
        </>
    );
}
