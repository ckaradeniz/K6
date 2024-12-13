import http from 'k6/http';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

// Load the JSON file and parse it to get the users array of objects 
const userCredentials = new SharedArray('users with credentials', function () {
    return JSON.parse(open('./users.json')).users;
});

console.log(userCredentials);

export default function () {

    // userCredentials.forEach((item) => {
    //     const credentials = {
    //         username: item.username,
    //         password: item.password,
    //     }

    //     let res = http.post(
    //         'https://test-api.k6.io/user/register/',
    //         JSON.stringify(credentials),
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }
    //     );

    //     check(res, {
    //         'status is 201': (r) => r.status === 201
    //     });

    // });

    const randomCredentials = randomItem(userCredentials);

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: randomCredentials.username,
                password: randomCredentials.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'has access token': (r) => r.json() !== undefined
    });

    const accessToken = res.json().access;

}