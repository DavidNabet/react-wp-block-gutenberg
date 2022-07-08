/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { useSelect } from "@wordpress/data";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const blockProps = useBlockProps();

	// Récupération dynamique des articles
	const posts = useSelect((select) => {
		return select("core").getEntityRecords("postType", "post", { per_page: 3 });
	});

	// L'API n'a pas encore répondu
	if (!posts.data) {
		return (
			<div {...blockProps}>
				<p className="dynamic-placeholder">
					{__("Fetching posts", "dynamic-articles")}
				</p>
			</div>
		);
	}

	// L'API a répondu mais aucun article ne correspond aux critères
	if (posts.data.length === 0) {
		return (
			<div {...blockProps}>
				<p className="dynamic-placeholder">
					{__("No post found", "dynamic-articles")}
				</p>
			</div>
		);
	}

	// L'API a répondu avec des résultats à afficher
	return (
		<ul {...blockProps}>
			{posts.data.map((post) => (
				<li>
					<a href={post.link}>{post.title.rendered}</a>
				</li>
			))}
		</ul>
	);
}
