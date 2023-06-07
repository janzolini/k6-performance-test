import { group, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import Auth from '../requests/postAuth.request.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export let options = {
  stages: [
    { duration: '30s', target: 50 }, // simula o aumento do tráfego de 50 usuários em 30 segundos
    { duration: '1m', target: 300 }, // fica em 300 usuários por 1 minuto
    { duration: '30s', target: 0 }, // redução para 0 usuários nos últimos 30 segundos
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% das solicitações devem ser concluídas abaixo de 1,5s
    'http_req_failed': ['rate<0.01'], // erros http devem ser menores que 1%
  },
};

const csvData = new SharedArray('Leitura dos dados', function () {
  return papaparse.parse(open('../data/csv/usuarios.csv'), { header: true }).data;
});

export default () => {
  const user = csvData[Math.floor(Math.random() * csvData.length)].email;
  const pass = csvData[Math.floor(Math.random() * csvData.length)].senha;

  const auth = new Auth();

  group('soak test', () => {
    auth.postAuth(user, pass);
  })
  sleep(1);
}

export function handleSummary(data) {
  return {
    "reports/teste_k6.html": htmlReport(data),
  };
}