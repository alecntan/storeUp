import { React, useState } from 'react';

// React-Bootstrap
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// React-Icons
import { BsFillArrowUpSquareFill } from 'react-icons/bs';

// Components
import NewStorageButton from './NewStorageButton.js';


export default function ActionBar(props) {
    return (
        <Container fluid>
            <Row>
                <Col><h3>Store <BsFillArrowUpSquareFill /></h3></Col>
                <Col className='d-flex justify-content-end'><NewStorageButton /></Col>
            </Row>
            <hr />
        </Container>
    );
}


