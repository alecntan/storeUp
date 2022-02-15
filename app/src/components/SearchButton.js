import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Search } from 'react-bootstrap-icons';


export default function SearchButton() {
    return (
        <>
            <Button variant='mx-1 outline-secondary'>
               <Search />
            </Button>
        </>
    );
}
         
