/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor";

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
import metadata from "./block.json";
import Autocomplete from "./components/Autocomplete";

const STYLES = {
	minHeight: 100,
	padding: "20px 14px 0 14px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "white",
	color: "black",
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	apiVersion: 2,
	title: __(metadata.name.replace("-", " "), "third-blocks"),
	description: __(
		"Example block written with JSX – build step required.",
		"third-blocks"
	),
	category: "get-blocks",
	icon: "admin-network",
	supports: {
		align: true,
		color: {
			gradients: true,
		},
	},
	attributes: {
		value: {
			type: "string",
		},
	},
	edit: ({ attributes, setAttributes }) => {
		const allowedBlocks = [
			"core/columns",
			"core/column",
			"core/image",
			"core/heading",
			"core/paragraph",
			"core/gallery",
			"core/button",
			"core/spacer",
		];

		const TEMPLATE = [
			[
				"core/columns",
				{},
				[
					[
						"core/column",
						{},
						[
							[
								"core/image",
								{
									linkClass: "block-gallery-item",
								},
							],
						],
					],
					[
						"core/column",
						{},
						[
							[
								"core/heading",
								{
									level: 3,
									content: "<strong>Sous-titre</strong>",
									className: "theater-heading",
								},
							],
							["core/paragraph", { content: "Petite description" }],
						],
					],
				],
			],
			["core/gallery", {}],
		];

		return (
			<div {...useBlockProps({ style: STYLES })}>
				<InnerBlocks
					allowedBlocks={allowedBlocks}
					template={TEMPLATE}
					// renderAppender={() => <InnerBlocks.DefaultBlockAppender />}
				/>
			</div>
		);
	},
	save: ({ attributes }) => {
		return (
			<div {...useBlockProps.save({ style: STYLES })}>
				<div>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});
