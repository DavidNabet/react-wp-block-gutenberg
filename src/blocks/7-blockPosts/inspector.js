import { InspectorControls } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { PanelBody, ToggleControl } from "@wordpress/components";
import SearchPost from "../../components/SearchPost";

export default function Inspector(props) {
	const {
		attributes: { postID, showImage, showAuthor, showCategory },
		setAttributes,
	} = props;

	return (
		<InspectorControls>
			<PanelBody title={__("Choose a post", "get-blocks")}>
				<SearchPost
					onChange={(postID) => setAttributes({ postID })}
					postType="posts"
					placeholder={__("Search post", "get-blocks")}
				/>
			</PanelBody>

			{postID && (
				<PanelBody title={__("Customize", "get-blocks")}>
					<ToggleControl
						label={__("Show Image?", "get-blocks")}
						checked={showImage}
						onChange={() => setAttributes({ showImage: !showImage })}
					/>
					<ToggleControl
						label={__("Show Author?", "get-blocks")}
						checked={showAuthor}
						onChange={() => setAttributes({ showAuthor: !showAuthor })}
					/>
					<ToggleControl
						label={__("Show Category?", "get-blocks")}
						checked={showCategory}
						onChange={() => setAttributes({ showCategory: !showCategory })}
					/>
				</PanelBody>
			)}
		</InspectorControls>
	);
}
