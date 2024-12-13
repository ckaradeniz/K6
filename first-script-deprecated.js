import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '30s',
    // This configuration is DEPRECATED!
    ext: {
        loadimpact: {
            projectID: 23456789
        }
    }
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
}
