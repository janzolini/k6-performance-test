import http from 'k6/http';
import { check, sleep } from 'k6';
import Utils from "../utils/utils.js";

export default class Crocodiles {

    getCrocodilesRequest(token) {

        const params = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        const response = http.get(`${Utils.getBaseUrl()}/my/crocodiles`, params,);

        check(response, {
            'Status code 200': (resp) => resp.status === 200,
        });

        sleep(1)
    }

    getCrocodilesIdRequest(crocodilo) {

        const response = http.get(`${Utils.getBaseUrl()}/public/crocodiles/${crocodilo}`,);
        check(response, {
            'Status code 200': (resp) => resp.status === 200,
        });

        sleep(1)
    }
}