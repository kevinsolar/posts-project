import express from "express";
import cors from "cors";
import { PrismaClient } from './generated/prisma/index.js';

const prisma = new PrismaClient();
/*
   A importacao padrao nao funcionou aqui, e nao faco ideia do pq, mas com ajuda da IA, eu consegui pelo menos reverter com esse metodo acima.
   A importacao padrao funcionaria assim:
      import { PrismaClient } from '@prisma/client';

      const prisma = new PrismaClient();
*/

const app = express();
app.use(express.json()); //Por padrao o express nao entende json, por isso precisamos adicionar essa funcao.
app.use(cors()); //Permite que o front-end acesse o back-end.

app.post('/posts', async (req, res) => {

   await prisma.post.create({
      data: {
         slug: req.body.slug,
         title: req.body.title,
         body: req.body.body,
         test: req.body.test
      }
   })
   res.status(201).json(req.body);
});

app.get('/posts', async (req, res) => {
   //utilizando o query params para fazer um filtro
   let posts = []

   if (req.query) {
      posts = await prisma.post.findMany({
         where: {
            title: {
               contains: req.query.title,
            },
            id: req.query.id,
         }
      })
   } else {
      posts = await prisma.post.findMany();
   }

   res.status(200).json(posts); //Retorna todos os posts
});

app.put('/posts/:id', async (req, res) => {
   await prisma.post.update({
      where: {
         id: req.params.id,
      },
      data: {
         slug: req.body.slug,
         title: req.body.title,
         body: req.body.body,
         test: req.body.test
      }
   });

   res.status(201).json(req.body);
});

app.delete('/posts/:id', async (req, res) => {
   await prisma.post.delete({
      where: {
         id: req.params.id,
      }
   });
   res.status(200).json({ message: "Deletado com sucesso!" })
});

const port = 3000;
app.listen(port, () => {
   console.log(`Servidor rodando na porta ${port}`);
});

/*
   Objetivo:
   Criar nossa API de posts.
   1- Criar um post
   2- Listar todos os posts
   3- Deletar um post
   4- Atualizar um post
   5- Buscar um post pelo id
*/