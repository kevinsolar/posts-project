import { useEffect, useRef, useState } from "react";
import BotaoEditar from "../../components/BotaoEditar";
import BotaoExcluir from "../../components/BotaoExcluir";
import api from "../../services/api";
import { Link } from "react-router-dom";

const Home = () => {
	const [posts, setPosts] = useState([]);
   let dateF;

	async function getPosts() {
		const allPosts = await api.get("/posts");
		setPosts(allPosts.data);
	}

	useEffect(() => {
		getPosts();
	}, []);

	async function deletePosts(id) {
		await api.delete(`/posts/${id}`);
		// Atualize a lista de posts após excluir
		getPosts();
	}

	return (
		<section id="hero" className="lg:container mx-auto pt-8 pb-8">
			<div className="flex justify-end">
				<Link
					to="/criar"
					className="text-white bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-cyan-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-sky-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-600 ease-in-out"
				>
					Criar novo
				</Link>
			</div>

			<div className="max-w-4xl text-center mx-auto mb-7">
				<span className="text-cyan-300 text-2xl md:text-3xl font-semibold">
					Ultimos posts
				</span>
			</div>

			<div className="flex flex-col gap-3 h-full items-center justify-center">
				{/* Boxes de cada post. */}
				{posts.map((post) => {
					return (
						<div
							key={post.id}
							className="w-full max-w-4xl my-auto flex flex-col gap-3 bg-stone-400 rounded-xl p-6 text-center"
						>
							<div className="content">
								<h2 className="text-3xl font-bold mb-4 text-cyan-200">
									{post.title}
								</h2>
								{post.createdAt && (
									<span className="date text-cyan-100 text-sm">
										{dateF = new Date(post.createdAt).toLocaleDateString('pt-BR', {day: 'numeric', month: 'long', year: 'numeric'})}
									</span>
								)}
								<p className="text-cyan-100">{post.body}</p>
							</div>
							<div className="actions flex gap-3 justify-center">
								<BotaoEditar
									onClick={() => {
										console.log("Edit!");
									}}
								>
									Editar
								</BotaoEditar>
								<BotaoExcluir onClick={() => deletePosts(post.id)}>
									Excluir
								</BotaoExcluir>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Home;
