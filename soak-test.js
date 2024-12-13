import { sleep } from 'k6';
import http from 'k6/http';

export const options = {

    stages: [
        {duration: '5m', target: 1000},
        {duration: '20h', target: 1000}, // stay at 1000 users for 20 hours
        {duration: '5m', target: 0} 
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