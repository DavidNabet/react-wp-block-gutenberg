import { useBlockProps } from "@wordpress/block-editor";
import { Spinner } from "@wordpress/components";

const Message = ({ label, withSpinner }) => {
	return (
		<p {...useBlockProps({ className: "get-blocks-message" })}>
			{withSpinner && <Spinner />}
			{label}
		</p>
	);
};

export default Message;
