/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
// import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { Fragment } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { createHigherOrderComponent } from "@wordpress/compose";
import { PanelBody, ToggleControl } from "@wordpress/components";

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

const allowedBlocks = [""];

function addAttributes(settings, name) {
	if (!allowedBlocks.includes(name)) {
		return settings;
	}

	settings.attributes = Object.assign(settings.attributes, {
		enableVoting: {
			default: false,
			type: "boolean",
		},
	});

	return settings;
}

addFilter("blocks.registerBlockType", "cie369-blocks/gallery", addAttributes);

const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const {
			attributes: { enableVoting },
			setAttributes,
			name,
		} = props;

		return (
			<Fragment>
				<BlockEdit {...props} />
				{name === "core/gallery" && (
					<InspectorControls>
						<PanelBody title={__("Section Voting", "cie369-blocks")}>
							<ToggleControl
								label={__("Enable voting", "cie369-blocks")}
								checked={enableVoting}
								onChange={() => {
									setAttributes({ enableVoting: !enableVoting });
								}}
							/>
						</PanelBody>
					</InspectorControls>
				)}
			</Fragment>
		);
	};
}, "withInspectorControl");

addFilter("editor.BlockEdit", "cie369-blocks/gallery", withInspectorControls);

const addExtraData = (extraProps, blockType, attributes) => {
	if (!allowedBlocks.includes(blockType.name)) {
		return extraProps;
	}

	let classes = extraProps.className.split(" ");

	if (attributes.enableVoting) {
		!classes.includes("is-voting") && classes.push("is-voting");
	} else {
		classes = classes.filter((className) => className !== "is-voting");
	}

	extraProps.className = classes.join(" ");
	console.log("extraProps ", extraProps);

	return extraProps;
};

addFilter(
	"blocks.getSaveContent.extraProps",
	"cie369-blocks/gallery",
	addExtraData
);
