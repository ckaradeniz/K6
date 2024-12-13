import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<300'],
        'http_req_duration{page:order}': ['p(95)<250'], // Add tag to check
        http_errors: ['count==0'],
        'http_errors{page:order}': ['count==0'],
        checks: ['rate>0.99'],
        'checks{page:order}': ['rate>0.99']
    }
}

let httpErrors = new Counter('http_errors');

export default function () {
    let res = http.get('https://run.mocky.io/v3/795231dd-3215-4cb5-b51f-6c11ee0e109e');

    if (res.error) {
        httpErrors.add(1);
    }

    check(res, {
        'status is 200': (r) => r.status === 200
    });

    // Submit order
    res = http.get(
        'https://run.mocky.io/v3/9fe50d42-111a-4cdf-84c7-278ffae8f7fe?mocky-delay=2000ms',
        {
            tags: {
                page: 'order'
            }
        });

    if (res.error) {
        httpErrors.add(1, { page: 'order' });
    }

    check(res, {'status is 201': (r) => r.status === 201}, {page: 'order'}); // Add tag to check

    sleep(1);
}