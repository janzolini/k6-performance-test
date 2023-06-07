<h1 align="center">Testes de performance utilizando o K6</h1>

> O k6-load-testing é um projeto de testes de performance utilizando o K6.

## :scroll: Instalação

- Documentação do [**k6**](https://k6.io/docs/getting-started/installation/)

## :scroll: ## Execução

- Smoke test 
  -  ```npm run smoke-test```
- Load test 
  -  ```npm run load-test```
- Soak test 
  -  ```npm run soak-test```
- Spike test 
  -  ```npm run spike-test```
- Stress test 
  -  ```npm run stress-test```

## :open_file_folder: Organização de pastas

A organização de pastas do projeto.

```
root
├── reports
│   ├── cucumber-report
├── src
│   ├── data
│   │   ├── csv
│   │   ├── json
│   ├── requests
│   ├── simulations
│   ├── utils
├── package.json
```


### :wrench: Tipos de Testes de Performance abordados no projeto:  
- Smoke Test
  - Teste rápido para verificar se o sistema está funcional e pronto para testes mais detalhados.
  - Verifica as funcionalidades básicas do sistema para garantir que não haja falhas graves.
![Smoke Test](https://k6.io/docs/static/243effef66c366044cc692f439cfb9a3/448f2/smoke-test.png)


- Load Test (Teste de Carga)
  - Teste para avaliar o desempenho do sistema sob carga normal ou esperada.
  - Simula o uso real do sistema, aumentando gradualmente a carga para identificar limites e possíveis problemas de desempenho.
![Load Test](https://k6.io/docs/static/53c756573c738528633ed7b67a7819df/52df6/load-test.png)

- Stress Test 
  - Teste para avaliar os limites do sistema e identificar seu ponto de falha.
  - Aplica uma carga extremamente alta ao sistema, além de sua capacidade normal, para verificar como ele se comporta e identificar possíveis falhas ou problemas de desempenho.
![Stress Test](https://k6.io/docs/static/5a1571e3a4df83a907e0346e586c784f/e134c/stress-test.png)

- Soak Test (Testes de imersão)
  - Teste de longa duração para avaliar a estabilidade do sistema sob carga constante.
  - Verifica se o sistema é capaz de lidar com cargas sustentadas ao longo do tempo sem falhas ou degradação significativa.
![Soak Test](https://k6.io/docs/static/d0a41ac91b107891e1fe9ef45d410e5b/deb37/soak-test.png)

- Spike Test
  - Teste que avalia como o sistema se comporta diante de picos súbitos de carga.
  - Simula aumentos repentinos e significativos de tráfego para verificar se o sistema é capaz de lidar com esses picos sem falhas graves.
![Spike Test](https://www.ubik-ingenierie.com/wp-content/uploads/2019/01/Spike-Test.png)

