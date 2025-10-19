import api from './api'

export default {
    login(data) {
        return api.post('/login', data)
    },

    logout() {
        return api.post('/logout')
    },
    
    register(data) {
        return api.post('/register', data)
    }
}