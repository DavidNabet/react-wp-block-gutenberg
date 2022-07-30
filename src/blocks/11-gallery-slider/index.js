/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

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

const allowedMediaTypes = ["image"];

function MyMediaUploader({ mediaIDs, onSelect }) {
	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={onSelect}
				allowedTypes={allowedMediaTypes}
				value={mediaIDs}
				render={({ open }) => (
					<Button onClick={open} className="button button-large">
						{mediaIDs.length < 1 ? "Upload/Select Images" : "Edit"}
					</Button>
				)}
				gallery={true}
				multiple={true}
			/>
		</MediaUploadCheck>
	);
}

registerBlockType(metadata.name, {
	apiVersion: 2,
	title: __(metadata.title, "cie369-blocks"),
	description: __(metadata.description, "cie369-blocks"),
	category: "layout",
	icon: "cover-image",
	attributes: {
		images: {
			type: "array",
			source: "query",
			selector: ".slider-item",
			default: [],
			query: {
				mediaID: {
					type: "number",
					source: "attribute",
					attribute: "data-id",
					selector: "img",
				},
				mediaURL: {
					type: "string",
					source: "attribute",
					attribute: "src",
					selector: "img",
				},
				thumbnail: {
					type: "string",
					source: "attribute",
					attribute: "data-thumb",
					selector: "img",
				},
			},
		},
	},
	edit: ({ attributes, setAttributes }) => {
		const onSelect = (items) => {
			setAttributes({
				images: items.map((item) => {
					return {
						mediaID: parseInt(item.id, 10),
						mediaURL: item.url,
						thumbnail: item?.sizes?.thumbnail.url,
					};
				}),
			});
		};

		return (
			<div {...useBlockProps()}>
				{attributes.images.length >= 1 ? (
					<div className="slider">
						{attributes.images.map((item) => (
							<div className="slider-item" key={`image-${item.mediaID}`}>
								<img src={item.thumbnail || item.mediaURL} alt={item.mediaID} />
							</div>
						))}
					</div>
				) : (
					<p>Click the button and add some images to your slider!</p>
				)}
				<MyMediaUploader
					mediaIDs={attributes.images.map((item) => item.mediaID)}
					onSelect={onSelect}
				/>
			</div>
		);
	},
	save: ({ attributes }) => {
		if (attributes.images.length < 1) {
			return null;
		}

		const blockProps = useBlockProps.save({ className: "slider" });

		return (
			<div {...blockProps}>
				{attributes.images.map((item) => (
					<div className="slider-item" key={`image-${item.mediaID}`}>
						<img
							src={item.mediaURL}
							data-id={item.mediaID}
							data-thumb={item.thumbnail}
							alt={item.mediaID}
						/>
					</div>
				))}
			</div>
		);
	},
});
