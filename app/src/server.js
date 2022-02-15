const inventory_url = 'https://apinventory.alectan.dev/';

export function getInventory(callback) {
    return fetch(inventory_url, {
        headers: {
            'Content-Type' : 'application/vnd.collection+json'
        }
    })
    .then(responses => responses.json())
    .then(data => generateStorageList(data['collection']))
    .then(collection => callback(collection))
    .catch((error) => console.log(error));
}

function generateStorageList(collection) {
    let storages = collection['items'];
    return storages.map((s) => Object.assign({}, {
        href      : s['href'],
        name      : getData(s['data'], 'name'),
        location  : getData(s['data'], 'location'),
        notes     : getData(s['data'], 'notes'),
        itemsLink : s['links'][0]['href'],
    }));
}

function getData(dataArray, key) {
    for(let i=0; i < dataArray.length; ++i) {
        let key_value = dataArray[i];
        if(key_value['name']  === key) { return key_value['value']; }
    }
}

export function getItems(link, callback) {
    return fetch(link)
        .then(responses => responses.json())
        .then(data => generateItemList(data['collection']))
        .then(collection => callback(collection))
        .catch((error) => console.log(error));
}

function generateItemList(collection) {
    let items = collection['items'];
    return items.map((i) => Object.assign({}, {
        href        : i['href'],
        name        : getData(i['data'], 'name'),
        identifier  : getData(i['data'], 'identifier'),
        status      : getData(i['data'], 'status'),
        category    : getData(i['data'], 'category'),
        notes       : getData(i['data'], 'notes'),
        serialNum   : getData(i['data'], 'serialNumber'),
        owner       : getData(i['data'], 'owner'),
        storage     : getData(i['data'], 'storage'),
        storageLink : i['links'][0]['href']
    }));
}

export function postStorage(data, callback) {
    return fetch(inventory_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data['content'])
    }).then(response => callback(response));
}

export function putStorage(data, callback){
    return fetch(data['link'], {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data['content'])
    }).then(response => callback(response));
}

export function deleteStorage(link) {
    return fetch(link, { method: 'DELETE' });
}

export function postItem(data, callback) {
    return fetch(data['link'], {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        }, body: JSON.stringify(data['content'])
    }).then(response => callback(response));
}

export function putItem(data, callback) {
    return fetch(data['link'], {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        }, body: JSON.stringify(data['content'])
    }).then(response => callback(response));
}

export function deleteItem(link) {
    return fetch(link, { method: 'DELETE' });
}


