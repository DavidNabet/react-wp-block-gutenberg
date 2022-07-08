/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
// import Edit from "./edit";
// import save from "./save";
import metadata from "./block.json";
import Autocomplete from "./components/Autocomplete";

const STYLES = {
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	apiVersion: 2,
	title: __(metadata.name.replace("-", " ").toUpperCase(), "second-blocks"),
	description: __(
		"Example block written with ESNext standard and JSX support – build step required.",
		"second-blocks"
	),
	category: "get-blocks",
	icon: "cart",
	supports: {
		align: true,
	},
	attributes: {
		value: {
			type: "string",
		},
	},
	edit: ({ attributes, setAttributes }) => {
		return (
			<div {...useBlockProps({ style: STYLES })}>
				<Autocomplete
					name="Autocomplete"
					options={[
						{ value: "🍎", label: "Apple", id: 1 },
						{ value: "🍊", label: "Orange", id: 2 },
						{ value: "🍇", label: "Grapes", id: 3 },
					]}
					value={attributes.value}
					onChange={(newValue) => {
						setAttributes({ value: newValue });
					}}
				/>
			</div>
		);
	},
	save: ({ attributes }) => (
		<div {...useBlockProps.save({ style: STYLES })}>
			<RichText.Content value={attributes.value} />
		</div>
	),
});
