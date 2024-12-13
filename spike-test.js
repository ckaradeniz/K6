import { sleep } from 'k6';
import http from 'k6/http';

export const options = {

    // 4 times of stress test target value is a good point to start a spike test
    stages: [
        {duration: '2m', target: 10000}, // rump-up
        {duration: '1m', target: 0} // ramp-down
    ]
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}