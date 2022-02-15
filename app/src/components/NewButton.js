import { React } from 'react';
import Button from 'react-bootstrap/Button';


export default function NewButton(props) {

    return (
          <Button variant={'success'} onClick={props.newStorage}>Add Storage</Button>
    );
}

