import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    // stages: [
    //     {duration: '5m', target: 100}, // ramp up to 100 users
    //     {duration: '30m', target: 100}, // stay at 100 users for 30 minutes
    //     {duration: '5m', target: 0} // ramp down to 0 users
    // ]

    stages: [
        {duration: '5s', target: 10},
        {duration: '30s', target: 10},
        {duration: '5s', target: 0} 
    ]
}

export default function () {
    http.get('https://test.k6.io');
    sleep(1);
    http.get('https://test.k6.io/contacts.php');
    sleep(2);
    http.get('https://test.k6.io/news.php');
    sleep(2);
}