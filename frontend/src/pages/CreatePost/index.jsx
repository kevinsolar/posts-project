import { useRef, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const CreatePost = () => {

   const inputTitle = useRef();
   const inputBody = useRef();
   const inputImage = useRef();
   const [imagePreview, setImagePreview] = useState(null);

   async function createPosts() {
      const titleValue = inputTitle.current.value;
      const bodyValue = inputBody.current.value;
      const generatedSlug = transformSlug(titleValue);
      const date = new Date();
      const imageFile = inputImage.current.files[0];

      // Criar um FormData para enviar o arquivo
      const formData = new FormData();
      formData.append('slug', generatedSlug);
      formData.append('title', titleValue);
      formData.append('body', bodyValue);
      formData.append('createdAt', date);
      
      if (imageFile) {
         formData.append('image', imageFile);
      }

      try {
         await api.post('/posts', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         });
         alert('Post criado com sucesso!');
         // Limpar os campos após o envio
         inputTitle.current.value = '';
         inputBody.current.value = '';
         inputImage.current.value = '';
         setImagePreview(null);
      } catch (error) {
         console.error('Erro ao criar post:', error);
         alert('Erro ao criar o post. Tente novamente.');
      }
   }

   function transformSlug(title) {
      return title.toLowerCase().replace(/ /g, '-');
   }

   function handleImageChange(e) {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setImagePreview(reader.result);
         };
         reader.readAsDataURL(file);
      } else {
         setImagePreview(null);
      }
   }

   return (
      <section id="criar-post" className="lg:container mx-auto pt-8 pb-8">

         <div className="w-full max-w-4xl mx-auto p-5 bg-cyan-950 rounded-xl mb-10">
            <form className="text-center flex flex-col items-center gap-3 text-stone-500">
               <h1 className="text-4xl font-bold mb-4 text-cyan-200">Cadastrar novo post</h1>
               <input
                  placeholder="Titulo"
                  name="title" type="text"
                  className="w-full bg-cyan-100 placeholder-stone-500 py-1 px-2 rounded-sm"
                  ref={inputTitle} />
               <textarea
                  placeholder="O que esta pensando?"
                  name="body"
                  className="w-full min-h-44 bg-cyan-100 placeholder-stone-500 py-1 px-2 rounded-sm"
                  ref={inputBody} />
               
               <div className="w-full">
                  <label className="block text-left text-cyan-200 mb-1">Imagem do Post</label>
                  <input
                     type="file"
                     accept="image/*"
                     className="w-full bg-cyan-100 text-stone-500 py-1 px-2 rounded-sm"
                     ref={inputImage}
                     onChange={handleImageChange}
                  />
               </div>
               
               {imagePreview && (
                  <div className="w-full mt-2">
                     <p className="text-left text-cyan-200 mb-1">Pré-visualização:</p>
                     <img 
                        src={imagePreview} 
                        alt="Pré-visualização" 
                        className="max-h-60 rounded-md object-contain bg-white p-1" 
                     />
                  </div>
               )}

               <button
                  className="text-cyan-950 font-semibold bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
                  type="button"
                  onClick={createPosts}
               >
                  Post
               </button>
            </form>
         </div>

         <div className="w-full max-w-4xl mx-auto p-5 flex justify-center">
            <Link to="/" className="text-cyan-950 font-semibold bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2">Ver Posts</Link>
         </div>
      </section>
   )
}

export default CreatePost;