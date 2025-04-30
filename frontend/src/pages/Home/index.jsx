import { useEffect, useRef, useState } from "react";
import BotaoEditar from "../../components/BotaoEditar";
import BotaoExcluir from "../../components/BotaoExcluir";
import api from "../../services/api";

const Home = () => {

   const [posts, setPosts] = useState([]);

   const inputTitle = useRef();
   const inputBody = useRef();

   async function getPosts() {
      const allPosts = await api.get('/posts');
      setPosts(allPosts.data);
   }

   useEffect(() => {
      getPosts();
   }, [])

   async function createPosts() {
      const titleValue = inputTitle.current.value;
      const bodyValue = inputBody.current.value;
      const generatedSlug = transformSlug(titleValue);

      await api.post('/posts', {
         slug: generatedSlug,
         title: titleValue,
         body: bodyValue
      });
      // Atualize a lista de posts após criar
      getPosts();
   }

   async function deletePosts(id) {
      await api.delete(`/posts/${id}`);
      // Atualize a lista de posts após excluir
      getPosts();
   }

   function transformSlug(title) {
      return title.toLowerCase().replace(/ /g, '-');
   }

   return (
      <section id="hero" className='lg:container mx-auto pt-8 pb-8'>

         <div className="w-full max-w-4xl mx-auto p-5 bg-cyan-950 rounded-xl mb-10">
            <form className="text-center flex flex-col gap-3 text-stone-500">
               <h1 className="text-4xl font-bold mb-4 text-cyan-200">Cadastrar novo post</h1>
               <input
                  placeholder="Titulo"
                  name="title" type="text"
                  className="bg-cyan-100 placeholder-stone-500 py-1 px-2 rounded-sm"
                  ref={inputTitle} />
               <textarea
                  placeholder="O que esta pensando?"
                  name="body"
                  className="min-h-44 bg-cyan-100 placeholder-stone-500 py-1 px-2 rounded-sm"
                  ref={inputBody} />

               <button
                  type="button"
                  onClick={createPosts}
               >
                  Post
               </button>
            </form>
         </div>

         <div className="flex flex-col gap-3 h-full items-center justify-center">
            {/* Boxes de cada post. */}
            {posts.map((post) => {
               return (
                  <div key={post.id} className='w-full max-w-4xl my-auto flex flex-col gap-3 bg-stone-400 rounded-xl p-6 text-center'>
                     <div className="content">
                        <h2 className='text-3xl font-bold mb-4 text-cyan-200'>
                           {post.title}
                        </h2>
                        <p className='text-cyan-100'>
                           {post.body}
                        </p>
                     </div>
                     <div className="actions flex gap-3 justify-center">
                        <BotaoEditar onClick={() => { console.log('Edit!') }}>Editar</BotaoEditar>
                        <BotaoExcluir onClick={() => deletePosts(post.id)}>Excluir</BotaoExcluir>
                     </div>
                  </div>
               )
            })}

         </div>
      </section>
   )
}

export default Home;