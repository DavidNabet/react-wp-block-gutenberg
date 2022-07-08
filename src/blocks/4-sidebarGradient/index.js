/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	RichText,
	PanelColorSettings,
	ContrastChecker,
} from "@wordpress/block-editor";
import { Panel, PanelBody, TextControl } from "@wordpress/components";

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

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	apiVersion: 2,
	title: __(metadata.name.replace("-", " "), "sidebar-gradient"),
	description: __("Sidebar Block Gradient", "sidebar-gradient"),
	category: "get-blocks",
	icon: "chart-bar",
	supports: {
		align: true,
		color: {
			gradients: true,
		},
	},
	attributes: {
		blockColor: {
			type: "string",
		},
		blockBackground: {
			type: "string",
		},
		blockText: {
			default: "Get Blocks Plugin",
			type: "string",
		},
	},
	edit: ({
		attributes: { blockColor, blockBackground, blockText },
		setAttributes,
	}) => {
		return (
			(
				<InspectorControls>
					<Panel>
						<PanelBody
							title={__("Block Content Settings", "sidebar-gradients")}
							icon="admin-plugins"
						>
							<TextControl
								label={__("Example Meta", "sidebar-gradients")}
								help={__("This is an example meta field", "sidebar-gradients")}
								onChange={(blockText) => setAttributes({ blockText })}
								value={blockText}
							/>
						</PanelBody>
						<PanelColorSettings
							title={__("Block Color Settings", "sidebar-gradients")}
							icon="art"
							initialOpen={false}
							colorSettings={[
								{
									value: blockColor,
									onChange: (blockColor) => setAttributes({ blockColor }),
									label: __("Font color", "sidebar-gradients"),
									colors: [
										{
											name: __("Brown", "sidebar-gradients"),
											slug: "brown",
											color: "#3a3335",
										},
										{
											name: __("Orange", "sidebar-gradients"),
											slug: "orange",
											color: "#f0544f",
										},
										{
											name: __("Light Green", "sidebar-gradients"),
											slug: "light-green",
											color: "#c6d8d3",
										},
									],
								},
								{
									value: blockBackground,
									onChange: (blockBackground) =>
										setAttributes({ blockBackground }),
									label: __("Background Color", "sidebar-gradients"),
									colors: [
										{
											name: __("Brown", "sidebar-gradients"),
											slug: "brown",
											color: "#3a3335",
										},
										{
											name: __("Orange", "sidebar-gradients"),
											slug: "orange",
											color: "#f0544f",
										},
										{
											slug: "light-green",
											name: __("Light Green", "sidebar-gradients"),
											color: "#c6d8d3",
										},
									],
								},
							]}
						>
							<ContrastChecker
								isLargeText="false"
								textColor={blockColor}
								backgroundColor={blockBackground}
							/>
						</PanelColorSettings>
					</Panel>
				</InspectorControls>
			),
			(
				<p
					{...useBlockProps()}
					style={{ backgroundColor: blockBackground, color: blockColor }}
				>
					<RichText
						className="block__text"
						keepPlaceholderOnFocus
						onChange={(blockText) => setAttributes({ blockText })}
						placeholder={__("Block Text", "sidebar-gradients")}
						tagName="span"
						value={blockText}
					/>
				</p>
			)
		);
	},
	save: ({ attributes: { blockColor, blockBackground, blockText } }) => {
		return (
			<p
				{...useBlockProps.save()}
				style={{ backgroundColor: blockBackground, color: blockColor }}
			>
				{blockText}
			</p>
		);
	},
});
