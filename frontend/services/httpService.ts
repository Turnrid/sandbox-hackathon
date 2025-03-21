import axios from "axios";

const setBaseURL = () => {
    const base = process.env.BLUE_MAGMA_API
    axios.defaults.baseURL = base;
}

const getHttpService = () => {
    return {
        httpService: {
            get: axios.get,
            post: axios.post,
            put: axios.put,
            delete: axios.delete,
            request: axios.request,
            url: setBaseURL(),
        },
    };
};

export default getHttpService;