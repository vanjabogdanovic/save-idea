import ax from 'axios';

const axios = ax.create({
    baseURL: 'https://save-ideas-001.firebaseio.com/'
});

export default axios;