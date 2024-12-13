import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 10,
    duration: '10s',
    cloud: {
        projectID: 3729315 // we are getting this id from k6 cloud
    }
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}