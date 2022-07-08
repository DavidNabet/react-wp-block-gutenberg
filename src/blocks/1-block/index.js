/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

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
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

const STYLES = {
	boxShadow: "0 0 0.25em 0.25em rgba(0, 0, 0, 0.25)",
	borderRadius: "15px",
	minHeight: 100,
	padding: "48px 48px 0 48px",
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
	title: __("Inner Blocks", "first-blocks"),
	description: __(
		"Example block written with ESNext standard and JSX support – build step required.",
		"first-blocks"
	),
	category: "get-blocks",
	icon: "smiley",
	supports: {
		align: true,
	},
	edit: (props) => {
		const ALLOWED_BLOCKS = [
			"core/image",
			"core/paragraph",
			"core/columns",
			"core/heading",
		];

		const TEMPLATE = [
			[
				"core/columns",
				{},
				[
					["core/column", {}, [["core/image"]]],
					[
						"core/column",
						{},
						[
							[
								"core/heading",
								{
									level: 3,
									placeholder: "Enter side title...",
								},
							],
							[
								"core/paragraph",
								{
									placeholder: "Enter side content...",
								},
							],
						],
					],
				],
			],
		];

		return (
			<div {...useBlockProps({ style: STYLES })}>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
			</div>
		);
	},
	save: (props) => {
		return (
			<div {...useBlockProps.save({ style: STYLES })}>
				<div>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});
