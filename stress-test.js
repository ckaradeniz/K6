import { sleep } from 'k6';
import http from 'k6/http';

export const options = {

    stages: [
        // increment the target step by step to 100 users or more for stress testing
        {duration: '5s', target: 100}, 
        {duration: '30s', target: 100}, 
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