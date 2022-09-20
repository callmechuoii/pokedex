export interface Pokemon {
	name: string;
	url: string;
}

export interface PokemonDetail {
	id: number;
	name: string;
	image: string;
	types: string[];
}

export interface PokemonSuperDetail extends PokemonDetail {
	stats: {
		base_stat: number;
		name: string;
	}[];
}
