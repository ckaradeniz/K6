import http from 'k6/http';
import { check } from 'k6';

export default function () {

    const credentials = {
        username: 'test_' + Date.now(),
        password: 'secret_' + Date.now(),
    }

    http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const accessToken = res.json().access;
    console.log(accessToken);

    http.get(
        'https://test-api.k6.io/my/crocodiles/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    const bodyContent = {
        "name": "Test Crocodile",
        "sex": "M",
        "date_of_birth": "1991-10-10"
    }

    res = http.post(
        'https://test-api.k6.io/my/crocodiles/',
        JSON.stringify(bodyContent),
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            }
        }
    )

    const crocodileId = res.json().id;

    res = http.get(`https://test-api.k6.io/my/crocodiles/${crocodileId}/`,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );

    check(res, {
        'status is 200': (r) => r.status === 200,
        'New crocodile id': (r) => r.json().id === crocodileId
    });


    // put request = to update the information of the crocodile
    res = http.put(
        `https://test-api.k6.io/my/crocodiles/${crocodileId}/`,
        JSON.stringify({
            "name": "Updated Crocodile",
            "sex": "M",
            "date_of_birth": "1991-10-10"
        }),
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            }
        }
    )

    // patch request = to update the specific information of the crocodile
    res = http.patch(
        `https://test-api.k6.io/my/crocodiles/${crocodileId}/`,
        JSON.stringify({
            "sex": "F",
        }),
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            }
        }
    )

    // delete request = to delete the crocodile
    res = http.del(
        `https://test-api.k6.io/my/crocodiles/${crocodileId}/`,
        null,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    )

}