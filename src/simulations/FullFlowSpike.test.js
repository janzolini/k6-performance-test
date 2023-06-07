import { group, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import Auth from '../requests/postAuth.request.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // carga baixa normal
    { duration: '1m', target: 50 },
    { duration: '10s', target: 500 }, // em 10 segundos acontece pico de 1400 usuários
    { duration: '10s', target: 5 }, // tem uma queda de uso
    { duration: '3m', target: 1400 }, // fica 3 minutos com os 1400 usuarios
    { duration: '2m', target: 250 },
    { duration: '10s', target: 1200 }, // começa a baixar a escala
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 },
  ],
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