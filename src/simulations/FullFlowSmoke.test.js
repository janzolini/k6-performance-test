import { group, sleep } from 'k6';
import Auth from '../requests/postAuth.request.js';
import Crocodiles from '../requests/getCrocodiles.request.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 1, // 1 usuário em loop por 1 minuto
  duration: '3s',

  thresholds: {
    http_req_failed: ['rate < 0.01'],
    http_req_duration: ['p(95) < 900']
  }
};

export default function () {
  const auth = new Auth();
  const crocodiles = new Crocodiles();

  group('smoke test', () => {
    crocodiles.getCrocodilesRequest(auth.getToken());
  })
  sleep(1);
}

export function handleSummary(data) {
  return {
    "reports/teste_k6.html": htmlReport(data),
  };
}