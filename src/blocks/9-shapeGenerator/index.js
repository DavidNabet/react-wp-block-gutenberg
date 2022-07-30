/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { Fragment } from "@wordpress/element";
import { BlockControls } from "@wordpress/block-editor";
import { createHigherOrderComponent } from "@wordpress/compose";
import { ToolbarGroup, ToolbarButton } from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";
import shapes from "./shapes.json";

/**
 * Internal dependencies
 */
import metadata from "./block.json";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

const allowedBlocks = ["core/cover"];

const withShapeGenerator = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (!allowedBlocks.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const updateBackgroundShape = () => {
			const newRandomShape = shapes[Math.floor(Math.random() * shapes.length)];
			const encodedShape = `data:image/svg+xml,${encodeURIComponent(
				newRandomShape
			)}`;
			props.setAttributes({ url: encodedShape });
		};

		return (
			<Fragment>
				<BlockEdit {...props} />
				<BlockControls>
					<ToolbarGroup>
						<ToolbarButton
							showTooltip
							icon="update"
							onClick={updateBackgroundShape}
							label={__("Updated shape", "get-blocks")}
						/>
					</ToolbarGroup>
				</BlockControls>
			</Fragment>
		);
	};
}, "withInspectorControls");

addFilter(
	"editor.BlockEdit",
	"get-blocks/with-inspector-controls",
	withShapeGenerator
);
