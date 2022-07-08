/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { Fragment } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { createHigherOrderComponent } from "@wordpress/compose";
import { PanelBody, SelectControl } from "@wordpress/components";

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

/**
 * addFilter
 * 3 args:
 * - Le premier est le nom du hook sur lequel on veut se brancher.
 * - Le second permet de nommer notre hook. Donnez un nom arbitraire mais unique afin de ne pas faire d'éventuels conflit
 * - Le troisième est la fonction de callback.
 */

const allowedBlocks = ["get-blocks/hook", "core/paragraph", "core/button"];

function addAttributes(settings, name) {
	// Ne rien faire si ce n'est pas notre bloc
	if (!allowedBlocks.includes(name)) {
		return settings;
	}

	// Ajout de l'attribut et de sa valeur par défaut
	settings.attributes = Object.assign(settings.attributes, {
		size: {
			type: "string",
			default: "medium",
		},
	});
	return settings;
}
/**
 * Se branche sur la définition du bloc et nous permet d'accéder aux attributs de celui-ci
 */
addFilter(
	"blocks.registerBlockType",
	"get-blocks/custom-attributes",
	addAttributes
);

const addAdvancedControls = createHigherOrderComponent((Block) => {
	return (props) => {
		const {
			name,
			attributes: { size },
			setAttributes,
			isSelected,
		} = props;

		if (!allowedBlocks.includes(name)) {
			return <Block {...props} />;
		}

		// Ajout de l'élément dans l'inspecteur
		return (
			<Fragment>
				<Block {...props} />
				{isSelected && (
					<InspectorControls>
						<PanelBody title={__("Text Size", "get-blocks")}>
							<SelectControl
								label={__("Size", "get-blocks")}
								value={size}
								options={[
									{ label: __("Small", "get-blocks"), value: "small" },
									{ label: __("Medium", "get-blocks"), value: "medium" },
									{ label: __("Large", "get-blocks"), value: "large" },
								]}
								onChange={(size) => {
									setAttributes({ size });
								}}
							/>
						</PanelBody>
					</InspectorControls>
				)}
			</Fragment>
		);
	};
}, "addAdvancedControls");

/**
 * Se branche au code du bloc pendant l'édition, et nous permet d'ajouter nos propres champs de paramètres dans l'inspecteur.
 */
addFilter(
	"editor.BlockEdit",
	"get-blocks/custom-advanced-control",
	addAdvancedControls
);

const addCustomClassToBlock = createHigherOrderComponent((Block) => {
	return (props) => {
		const {
			name,
			attributes: { size },
		} = props;

		if (!allowedBlocks.includes(name)) {
			return <Block {...props} />;
		}

		// Ajout de la classe
		const className = `has-size-${size}`;

		// Ajout de l'élément dans l'inspecteur
		return <Block {...props} className={className} />;
	};
}, "addAdvancedControls");

/**
 * Se branche au moment du rendu du bloc dans l'éditeur, et nous permet d'ajouter la classe CSS custom dans l'éditeur.
 */
addFilter(
	"editor.BlockListBlock",
	"get-blocks/custom-block-class",
	addCustomClassToBlock
);

function applyExtraClass(extraProps, blockType, attributes) {
	if (!allowedBlocks.includes(blockType.name)) {
		return extraProps;
	}

	const { size } = attributes;
	extraProps.className += ` has-size-${size}`; // On génère la classe
	return extraProps;
}

/**
 * Se branche au moment de l'enregistrement du bloc en HTML et nous permet d'ajouter notre classe CSS pour le front
 */
addFilter(
	"blocks.getSaveContent.extraProps",
	"get-blocks/applyExtraClass",
	applyExtraClass
);
