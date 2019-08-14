import Vue from 'vue'
import axios from 'axios'

const BASE_URI = 'http://localhost:8585/api/v1';
const client = axios.create({
    baseURL: BASE_URI,
    json: true
});

const APIClient = {
    getBookmarks() {
        return this.perform('get', '/bookmarks');
    }
};

export default APIClient;
