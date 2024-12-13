import http from 'k6/http';
import { sleep } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'; // find it from documentation

export const options = {
    vus: 5,
    duration: '5s'
}

export default function () {

    const credentials = {
        username: 'test_'+ randomString(8),
        password: 'secret_' + randomString(8),
    }

    console.log(credentials);

    http.post('https://test.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}