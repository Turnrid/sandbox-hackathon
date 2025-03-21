import getHttpService from "./httpService";

const { httpService } = getHttpService();

const getAITest = async () => {
    await httpService.get("/ai/test")
    .then((response) => {
        if (response.status === 200) {
            return response.data;
        }
    });
    return null;
}