import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Pokemon, PokemonDetail } from "../interface/pokemons";
import styles from "../styles/Home.module.css";

type Props = {
	pokemons: PokemonDetail[];
	next: string;
};

const Home: NextPage<Props> = ({ pokemons, next }) => {
	const [pokes, setPokes] = useState<PokemonDetail[]>(pokemons);
	const [nextUrl, setNextUrl] = useState(next);

	const getMorePokes = async () => {
		const res = await fetch(nextUrl);
		const data = await res.json();

		setNextUrl(data.next);

		const pokemons = data.results as Pokemon[];

		for (let i = 0; i < pokemons.length; i++) {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemons[i].name}`);
			const dataDetail = await response.json();
			const pokemonDetail: PokemonDetail = {
				name: dataDetail.name,
				id: dataDetail.id,
				image: dataDetail.sprites.other["dream_world"]["front_default"],
				types: dataDetail.types.map((e: any) => e.type.name),
			};
			setPokes((p) => [...p, pokemonDetail]);
		}
	};

	return (
		<>
			<ul className="list-none p-1.5 flex flex-wrap justify-center">
				{pokes.map((poke) => (
					<li key={poke.id}>
						<Link
							href={{
								pathname: "/pokemon/[name]",
								query: { name: poke.name },
							}}
						>
							<a>
								<div className={`p-4 relative flex border border-solid border-white rounded-2xl m-3 w-56 h-32 ${poke.types[0]} drop-shadow-md`}>
									<div className={styles.nombreTipos}>
										<h3 className="font-bold capitalize text-base">{poke.name}</h3>
										<div className='flex flex-col shrink'>
											{poke.types.map((type) => (
												<p className='text-white bg-slate-200 m-1 rounded-2xl py-1 px-3 capitalize text-s place-self-start text-center bg-opacity-30' key={type}>
													{type}
												</p>
											))}
										</div>
									</div>
									<div className='absolute -right-5 top-5 hover:-right-3 hover:top-2 ease-out duration-500'>
										<Image
											src={poke.image}
											width="120px"
											height="120px"
											layout="fixed"
											alt={poke.name}
										/>
									</div>
								</div>
							</a>
						</Link>
					</li>
				))}
			</ul>
			<div className='flex justify-center p-5'>
				<button className='px-6 py-3 uppercase border-0 rounded-xl bg-green-500 text-white font-bold' onClick={getMorePokes}>
					Load more
				</button>
			</div>
		</>
	);
};

export async function getServerSideProps() {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");
	const data = await res.json();
	const pokemons = data.results as Pokemon[];

	const pokemonsDetail: PokemonDetail[] = [];

	for (let i = 0; i < pokemons.length; i++) {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemons[i].name}`);
		const dataDetail = await response.json();
		const pokemonDetail: PokemonDetail = {
			name: dataDetail.name,
			id: dataDetail.id,
			image: dataDetail.sprites.other["dream_world"]["front_default"],
			types: dataDetail.types.map((e: any) => e.type.name),
		};
		pokemonsDetail.push(pokemonDetail);
	}

	return {
		props: { pokemons: pokemonsDetail, next: data.next }, // will be passed to the page component as props
	};
}

export default Home;
