import { useRef, useState } from 'react';
import api from '../../services/api';

const User = () => {

   const userName = useRef();
   const userEmail = useRef();
   const userPassword = useRef();
   const userConfirmPassword = useRef();

   const [pswdError, setPswdError] = useState("");

   async function createUser(e) {
      e.preventDefault();

      const name = userName.current.value;
      const email = userEmail.current.value;
      const password = userPassword.current.value;
      const confirmPassword = userConfirmPassword.current.value;

      // Validação dos campos obrigatórios
      if (!name || !email || !password || !confirmPassword) {
         setPswdError("Preencha todos os campos.");
         return;
      }

      if (password !== confirmPassword) {
         setPswdError("As senhas não conferem");
         return;
      }

      setPswdError("");

      try {
         await api.post('/users', {
            name: name,
            email: email,
            password: password
         });
         alert("Usuário cadastrado com sucesso!");
         userName.current.value = "";
         userEmail.current.value = "";
         userPassword.current.value = "";
         userConfirmPassword.current.value = "";
      } catch (error) {
         setPswdError("Erro ao cadastrar usuário.");
      }
   }

   return (
      <section id="hero" className="lg:container mx-auto pt-8 pb-8">
         <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-1/2 w-full">
               <div className="login">
               </div>
            </div>

            <div className="lg:w-1/2 w-full">
               <div className="cadastro bg-stone-400 rounded-xl p-6 text-center">
                  <h1 className="text-4xl font-bold mb-4 text-cyan-200">Cadastro</h1>
                  <form className="flex flex-col gap-3" onSubmit={createUser}>
                     <input
                        placeholder="Nome de Usuario"
                        className="bg-stone-800 border text-cyan-200 placeholder-sky-200 border-stone-950 rounded-sm px-2 py-1"
                        ref={userName}
                        name="name" type="text" />
                     <input
                        placeholder="Email"
                        className="bg-stone-800 border text-cyan-200 placeholder-sky-200 border-stone-950 rounded-sm px-2 py-1"
                        ref={userEmail}
                        name="email" type="email" />
                     <input
                        placeholder="Senha"
                        className="bg-stone-800 border text-cyan-200 placeholder-sky-200 border-stone-950 rounded-sm px-2 py-1"
                        ref={userPassword}
                        name="password" type="password" />
                     <input
                        placeholder="Confirmar Senha"
                        className="bg-stone-800 border text-cyan-200 placeholder-sky-200 border-stone-950 rounded-sm px-2 py-1"
                        ref={userConfirmPassword}
                        type="password" />

                     {pswdError && <p className="text-red-500">{pswdError}</p>}

                     <button
                        type="submit"
                        className="bg-cyan-400 hover:bg-cyan-500 text-cyan-900 font-bold py-2 px-4 rounded-sm disabled:opacity-40 disabled:cursor-not-allowed"
                        disabled={!!pswdError}
                     >
                        Cadastrar
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>
   )
}

export default User