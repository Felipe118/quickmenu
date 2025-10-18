import api  from "../api";

export default {
    getAddress(id) {
        return api.get(`/api/address/get/${id}`);
    }
}