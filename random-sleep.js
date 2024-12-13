import { sleep } from 'k6';
import http from 'k6/http';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'; // find it from documentation

export const options = {
    vus: 5,
    duration: '20s'
}

export default function () {
    http.get('https://test.k6.io');

    console.log('- VU Stage -');
    sleep(randomIntBetween(1, 5));
}