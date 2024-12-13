import { sleep } from 'k6';
import http from 'k6/http';

export const options = {

    //target could be much more than 10000
    stages: [
        { duration: '2h', target: 10000 }, // rump-up gradually 
    ]
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}