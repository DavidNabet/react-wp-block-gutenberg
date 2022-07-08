/**
 * Fonction Throttle: s'exécute avec un intervalle régulier, afin par exemple de limiter les lancements d'événements lors d'un scroll
 * Fonction Debounce: permet de retarder le lancement d'une fonction. Lors de la saisie au clavier, cela permet d'attendre un peu, pour voir si l'utilisateur a encore quelque chose à taper, avant de lancer la recherche.
 */
import { debounce } from "throttle-debounce";
import { TextControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useState, Fragment } from "@wordpress/element";

import "./style.scss";

const SearchPost = ({ postType, placeholder, onChange }) => {
	// La déclaration de la variable à surveiller
	const [results, setResults] = useState(false);

	// lancer la recherche après 300 ms d'inactivité sur le champ
	const onSearch = debounce(300, (search) => {
		console.log(search); // ce qu'a tapé l'utilisateur

		// Pas de recherche tant qu'il n'y a pas au moins 3 caractères
		if (search.length < 3) {
			return;
		}

		// Mise à jour de nos résultats
		setResults(__("Chargement...", "get-blocks"));

		// Route API qui permet de lancer une recherche
		apiFetch({
			path: `/wp/v2/${postType}/?search=${encodeURI(search)}&per_page=20`,
		}).then((posts) => {
			// Affiche les résultats dans la console
			console.log(posts);
			if (posts.length == 0) {
				posts = __("Aucun résultat", "get-blocks");
			}

			setResults(posts);
		});
	});

	return (
		<Fragment>
			<TextControl
				type="search"
				placeholder={placeholder}
				onChange={(value) => onSearch(value)}
			/>
			<div className="get-blocks-results">
				{results && Array.isArray(results) ? (
					<ul>
						{results.map((result) => (
							<li key={result.id} onClick={() => onChange(result.id)}>
								{result.title.rendered}
							</li>
						))}
					</ul>
				) : (
					<p>{results}</p>
				)}
			</div>
		</Fragment>
	);
};

export default SearchPost;
