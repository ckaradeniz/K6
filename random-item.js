import http from 'k6/http';
import { check } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'; // find it from documentation

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    // Get all the crocodiles
    const crocodiles = res.json();
    // Get all the crocodile ids
    const crocodileIds = crocodiles.map(item => item.id);
    console.log(crocodileIds);

    // Get a random crocodile id
    const crocodileId = randomItem(crocodileIds);  
    console.log(crocodileId);

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'crocodile has the correct id': (r) => r.json().id === crocodileId
    });
}