import { React, useState, useEffect } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import ActionBar from './components/ActionBar.js';
import StorageGrid from './components/StorageGrid.js';
import { NewItemForm, NewStorageForm } from './components/ModalForms.js'; 
import { nanoid } from 'nanoid';
import { getInventory, postStorage, postItem, putStorage, deleteStorage, putItem, deleteItem } from './server.js';

function App() {

    const [ showItemForm, setShowItemForm ] = useState(false);
    const toggleItemForm = () => { setFormMessage(''); setShowItemForm(!showItemForm) 
    };

    const [ showStorageForm, setShowStorageForm ] = useState(false);
    const toggleStorageForm = () => { 
        setFormMessage('');
        setShowStorageForm(!showStorageForm)};
 
    const emptyStorageForm = {'title'    : 'Register Storage', 
                              'name'     : '',
                              'location' : '',
                              'notes'    : ''}

    const [ storageFormValues, setStorageFormValues ] = useState(emptyStorageForm);
    const handleEditStorage = (storage) =>  {
        setStorageFormValues({ 'title'    : 'Edit Storage', 
                               'name'     : storage.name,
                               'location' : storage.location,
                               'notes'    : storage.notes,
                               'link'     : storage.href });
        toggleStorageForm();
    };

    const handleCloseStorageForm = () => {
        setStorageFormValues(emptyStorageForm);
        toggleStorageForm();
    };

    const validStatus = ['In Storage', 'In Use', 'Missing', 'Broken'];
    const emptyItemForm = { 'title'      : 'Register Item', 
                            'name'       : '',
                            'identifier' : nanoid(),
                            'storage'    : '',
                            'status'     : validStatus[0],
                            'category'   : '',
                            'serialNum'  : '',
                            'owner'      : '',
                            'notes'      : '',
                            'link'       : ''}

    const [ itemFormValues, setItemFormValues ] = useState(emptyItemForm);
    const handleEditItem = (item) => {
        setItemFormValues({'title'      : 'Edit Item', 
                           'name'       : item.name,
                           'identifier' : item.identifier,
                           'storage'    : item.storage,
                           'status'     : item.status,
                           'category'   : item.category,
                           'serialNum'  : item.serialNum,
                           'owner'      : item.owner,
                           'notes'      : item.notes,
                           'link'       : item.href }
        );
        toggleItemForm();
    };
    const handleCloseItemForm = () => {
        toggleItemForm();
        setItemFormValues(emptyItemForm);
    };

    const [ formMessage, setFormMessage ] = useState('');
    const handleFormResponse = (response) => {
        if(!response.ok) {
            setFormMessage(response.headers.get('message'));
        } else {
            setFormMessage('');
        }
    };

    const handleOnSubmitStorage = (data) => {

        if(data['isEdit']) {
            putStorage(data, handleFormResponse); 
        } else {
            postStorage(data, handleFormResponse);
        }

        getData();
        handleCloseStorageForm();
    };

    const handleSubmitItem = (data) => {
        if(data['isEdit']) {
            putItem(data, handleFormResponse);
        } else {
            postItem(data, handleFormResponse);
        }

        getData();
        handleCloseItemForm();
    };
    const handleDeleteStorage = (link) => {
        deleteStorage(link);  
    }

    const handleDeleteItem = (link) => {
        deleteItem(link);        
        handleCloseItemForm();
    }

    const handleAddItem = (link, storageName) => {
        setItemFormValues({'title'      : 'Register Item', 
                           'name'       : '',
                           'identifier' : nanoid(),
                           'storage'    : storageName,
                           'status'     : validStatus[0],
                           'category'   : '',
                           'serialNum'  : '',
                           'owner'      : '',
                           'notes'      : '', 
                           'link'       : link});
        toggleItemForm();
    };

    const [storages, setStorages ] = useState([]);
    const getData = () => getInventory(setStorages);

    useEffect(() => {
        const id = setInterval(getData, 3000);
        getData();
        return () => clearInterval(id);
    }, []);

    return (
        <Container className='mt-5'>
            <ActionBar newItem={toggleItemForm} newStorage={toggleStorageForm} />
            <StorageGrid onEditStorage={handleEditStorage}  onEditItem={handleEditItem} onDeleteStorage={handleDeleteStorage} onAddItem={handleAddItem} storages={storages} /> 
            { showItemForm ? <NewItemForm initValues={itemFormValues} validStatus={validStatus} storages={storages} onSubmit={handleSubmitItem} onShow={showItemForm} formMessage={formMessage} onToggle={handleCloseItemForm} onDeleteItem={handleDeleteItem}/> : null }
            { showStorageForm ?  <NewStorageForm initValues={storageFormValues} onSubmit={handleOnSubmitStorage} formMessage={formMessage} onShow={showStorageForm} onClose={handleCloseStorageForm} /> : null }
        </Container>
    );
}

export default App;
