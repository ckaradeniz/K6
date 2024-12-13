import http from 'k6/http';
import { sleep } from 'k6';
import { Counter, Trend } from 'k6/metrics';

export const options = {
    vus: 5,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95)<250'], // 95% of requests must complete below 250ms
        my_counter: ['count>10'], // must have more than 10 successful requests
        response_time_news_page: ['p(95)<150', 'p(99)<200'], // 95% of requests must complete below 150ms, 99% below 200ms
    }
}

let myCounter = new Counter('my_counter');
let newaPageResponseTrend = new Trend('response_time_news_page');

export default function () {
    let res = http.get('https://test.k6.io');
    myCounter.add(1);
    sleep(2);

    res = http.get('https://test.k6.io/news.php');
    newaPageResponseTrend.add(res.timings.duration);
}