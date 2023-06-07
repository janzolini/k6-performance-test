import { group, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import Auth from '../requests/postAuth.request.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: '2m', target: 400 }, // aumentar para 400 usuários
    { duration: '3h56m', target: 400 }, // ficar em 400 por ~ 4 horas
    { duration: '2m', target: 0 }, // diminuir gradativamente (opcional)
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