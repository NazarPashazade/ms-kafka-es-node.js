# ms-kafka-es-node.js

Microservices & Kafka & Elastic Search & Node.js

---

## Configuration of catalog-service

### Install dependencies

npm install -y

### Install runtime dependencies

npm install express nodemon

### Install development dependencies

npm install --save-dev typescript ts-node @types/node @types/express rosie @types/rosie

### Initialize TypeScript configuration

tsc --init

---

## TDD - Test Driven Development for catalog-service

# ms-kafka-es-node.js

Microservices & Kafka & Elastic Search & Node.js

---

## Configuration of catalog-service

### Install dependencies

npm install -y

### Install runtime dependencies

npm install express nodemon

### Install development dependencies

npm install --save-dev typescript ts-node @types/node @types/express rosie @types/rosie

### Initialize TypeScript configuration

tsc --init

---

## TDD - Test Driven Development for catalog-service

### Install testing dependencies

npm install --save-dev jest ts-jest @types/jest supertest @types/supertest @faker-js/faker

npx create-jest

Add the following property to your tsconfig.json file:

"types": ["jest"]

Add test script to your package.json file:

"scripts": {
"test": "jest"
}
