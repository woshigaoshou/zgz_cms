const TIME_OUT = 10000;
let BASE_URL = 'http://152.136.185.210:5000';
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api';
} else if (process.env.NODE_ENV === 'test') {
  BASE_URL = 'http://152.136.185.210:5000';
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000';
}

export { BASE_URL, TIME_OUT };
