import http from 'k6/http';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000'],
        
    }
}

export default function () {
    http.get('https://run.mocky.io/v3/795231dd-3215-4cb5-b51f-6c11ee0e109e'); // 200
    http.get('https://run.mocky.io/v3/9fe50d42-111a-4cdf-84c7-278ffae8f7fe?mocky-delay=2000ms'); // 201
}