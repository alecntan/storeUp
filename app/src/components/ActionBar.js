import { React } from 'react'
import { ArrowUpSquareFill } from 'react-bootstrap-icons';
import NewButton from './NewButton.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function ActionBar(props) {
    return (
        <>
        <Container>
            <Row>
                <Col md='auto'><h3>Store <ArrowUpSquareFill /></h3></Col>
                <ManageStorage newItem={props.newItem} newStorage={props.newStorage} />
            </Row>
        </Container>
        <hr />
        </>
    );
}

function ManageStorage(props) {
    return (
        <Col className='d-flex justify-content-end'>
            <NewButton newItem={props.newItem} newStorage={props.newStorage} />
        </Col>
    );
}

