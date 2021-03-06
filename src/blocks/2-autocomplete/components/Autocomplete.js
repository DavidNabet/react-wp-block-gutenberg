import { __ } from "@wordpress/i18n";

import { RichText } from "@wordpress/block-editor";

import { Fragment } from "@wordpress/element";

/**
 * An Autocomplete component
 * ----------
 * Based on a RichText component. Autocompletes when typing a prefix and gives a list with options that a user can select from.
 * Show text front end by using RichText.Content. If so, remember to include RichText from '@wordpress/block-editor'.
 *
 * @param   {String}  	value          The value of the RichText
 * @param   {Function}  onChange       The function that updates the value
 * @param   {Array}  	options        An array with options to be chosen between
 * @param   {String} 	name           The title of the component
 * @param   {String}  	triggerPrefix  The prefix to be used to show the options list
 *
 * @return  {Component}                 The component.
 */

const Autocomplete = ({
	value,
	onChange,
	options,
	name,
	triggerPrefix = "/",
	...props
}) => {
	const autoConfigs = [
		{
			name,
			triggerPrefix,
			options,
			getOptionLabel: (option) => (
				<span>
					<span className="icon">{option.value}</span> {option.label}
				</span>
			),
			// Declares that options should be matched by their name or value
			getOptionKeywords: (option) => [option.label, option.value],
			// Declares that the Grapes option is disabled
			getOptionCompletion: (option) => (
				<abbr title={option.label}>{option.value}</abbr>
			),
		},
	];

	return (
		<Fragment>
			<RichText
				{...props}
				autocompleters={autoConfigs}
				value={value}
				onChange={onChange}
				placeholder={__(
					`Type ${autoConfigs[0].triggerPrefix} to choose a ${autoConfigs[0].name}`
				)}
			/>
		</Fragment>
	);
};

export default Autocomplete;
