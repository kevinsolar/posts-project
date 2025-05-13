import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/index.js";
import multer from "multer";
import path from "path";

/*
   Objetivo:
   Criar nossa API de posts.
   1- Criar um post
   2- Listar todos os posts
   3- Deletar um post
   4- Atualizar um post
   5- Buscar um post pelo id
*/

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

app.get("/posts", async (req, res) => {
   //utilizando o query params para fazer um filtro
   let posts = [];

   if (req.query) {
      posts = await prisma.post.findMany({
         where: {
            title: {
               contains: req.query.title,
            },
            id: req.query.id,
         },
      });
   } else {
      posts = await prisma.post.findMany();
   }

   res.status(200).json(posts); //Retorna todos os posts
});

app.put("/posts/:id", async (req, res) => {
   await prisma.post.update({
      where: {
         id: req.params.id,
      },
      data: {
         slug: req.body.slug,
         title: req.body.title,
         imgpath: req.body.imgpath,
         body: req.body.body,
         createdAt: req.body.createdAt,
      },
   });

   res.status(201).json(req.body);
});

app.delete("/posts/:id", async (req, res) => {
   await prisma.post.delete({
      where: {
         id: req.params.id,
      },
   });
   res.status(200).json({ message: "Deletado com sucesso!" });
});

/*
   Users:
  * 
*/
app.post("/users", async (req, res) => {
   await prisma.user.create({
      data: {
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
      },
   });
   res.status(201).json(req.body);
});

app.get("/users", async (req, res) => {
   let users = []; //Criando um array vazio para armazenar os usuarios encontrados no banco de dados

   if (req.query) {
      users = await prisma.user.findMany({
         where: {
            name: {
               contains: req.query.name,
            },
            id: req.query.id,
         },
      });
   } else {
      users = await prisma.user.findMany();
   }

   res.status(200).json(users);
});

const port = 3000;
app.listen(port, () => {
   console.log(`Servidor rodando na porta ${port}`);
});


// Configuração do multer para salvar as imagens na pasta uploads/
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "../frontend/public/uploads/");
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
   }
});
const upload = multer({ storage: storage });

// Certifique-se de servir a pasta uploads como estática
app.use("/uploads", express.static("../frontend/public/uploads"));

// Altere o endpoint para aceitar upload de arquivo
app.post("/posts", upload.single("image"), async (req, res) => {
   const imgpath = req.file ? `/uploads/${req.file.filename}` : "";
   await prisma.post.create({
      data: {
         slug: req.body.slug,
         title: req.body.title,
         imgpath: imgpath,
         body: req.body.body,
         createdAt: req.body.createdAt,
      },
   });
   res.status(201).json({ ...req.body, imgpath });
});
