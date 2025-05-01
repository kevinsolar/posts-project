# Projeto simples de Post, simulando como seria um blog.

O intuito desse projeto foi treinar a criação de uma API, então quis juntar essa prática com algo que eu já tinha vontade de fazer, que era a crição de um blog, ou algo parecido.

## Tecnologias utilizadas:
- NodeJS
- Vite
- Express
- Prisma
- MongoDB
- Router DOM

### Para rodar o projeto:
- backend:

```
cd backend  
npm install  
node --watch server.js  
```

- frontend:
```
cd frontend  
npm install  
npm run dev  
```

### Anotações:
>Quando Utilizamos Prisma, apos a criacão do schema, se quisermos adicionar mais campos ao nosso modelo, precisamos parar o servidor, adicioanr o campo que queremos, e depois rodar o comando:
```
npx prisma db push
```