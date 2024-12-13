import http from 'k6/http';
import { sleep, check, group } from 'k6';

// export const options = {
//     thresholds: {
//         http_req_duration: ['p(95)<250'],
//         'group_duration{group:::Main page}': ['p(95)<250'], // defining a threshold for the group duration needs three colons
//         'group_duration{group:::Main page::Assets}': ['p(95)<250'], // two columns because it's a sub-group
//     }
// }

// export default function () {

//     group('Main page', function () { // group is used to group together related HTTP requests
//         let res = http.get('https://test.k6.io/');
//         check(res, { 'status is 200': (r) => r.status === 200 });

//         group('Assets', function () { // sub-group
//             http.get('https://test.k6.io/static/css/site.css');
//             http.get('https://test.k6.io/static/js/prism.js');
//         })


//     });

//     group('News page', function () {
//         http.get('https://test.k6.io/news.php');
//     });

//     sleep(1);
// }

// ==============================================

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<250'],
        'group_duration{group:::Main page}': ['p(95)<8000'],
        'group_duration{group:::News page}': ['p(95)<6000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<3000'],
    }
}

export default function () {

    group('Main page', function () {
        let res = http.get('https://run.mocky.io/v3/4fa2bff8-1b34-40e1-bd57-51af0a9b0fe5?mocky-delay=5000ms');
        check(res, { 'status is 200': (r) => r.status === 200 });

        group('Assets', function () { 
            http.get('https://run.mocky.io/v3/4fa2bff8-1b34-40e1-bd57-51af0a9b0fe5?mocky-delay=1000ms');
            http.get('https://run.mocky.io/v3/4fa2bff8-1b34-40e1-bd57-51af0a9b0fe5?mocky-delay=1000ms');
        })


    });

    group('News page', function () {
        http.get('https://run.mocky.io/v3/4fa2bff8-1b34-40e1-bd57-51af0a9b0fe5?mocky-delay=5000ms');
    });

    sleep(1);
}
