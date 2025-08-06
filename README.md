# ms-kafka-es-node.js

Microservices & Kafka & Elastic Search & Node.js

---

## Configuration of catalog-service

### Install dependencies

```
npm install -y
```

### Install runtime dependencies

```
npm install express nodemon
```

### Install development dependencies

```
npm install --save-dev typescript ts-node @types/node @types/express rosie @types/rosie
```

### Initialize TypeScript configuration

```
tsc --init
```

---

## TDD - Test Driven Development for catalog-service

### Install testing dependencies

```
npm install --save-dev jest ts-jest @types/jest supertest @types/supertest @faker-js/faker
```

```
npx create-jest
```

Add the following property to your tsconfig.json file:

```
"types": ["jest"]
```

Add test script to your package.json file:

```
 "scripts":  { "test": "jest" }
```

For Validation

```
npm install class-validator class-transformer.
```

---

## Set up Database for catalog-service

### Install dependencies

```
npm install --save-dev prisma
```

### create schema.prisma and .env files (update values)

```
npx prisma init --datasource-provider postgresql
```

adjust .env file: DATABASE_URL="postgresql://postgres:Database123!@localhost:5432/catalog-db?schema=public"

Create new Migration (Migration folder will be created)

```
npx prisma migrate dev --name init
```
