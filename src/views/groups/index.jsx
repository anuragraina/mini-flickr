import { useState, useMemo } from 'react';
import Flickr from 'flickr-sdk';
import { throttle } from 'lodash';

//importing Material UI components
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//Creates a new Flickr REST API client
//for more details see https://www.npmjs.com/package/flickr-sdk#new-flickrauth
const flickr = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);

export default function Groups() {
	const [value, setValue] = useState(null);
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState([]);

	const throttleFunction = useMemo(
		() =>
			throttle(async newInputValue => {
				const response = await flickr.groups.search({
					text: newInputValue,
					per_page: 10,
				});
				const groupNames = response.body.groups.group.map(item => item.name);

				setOptions(groupNames);
			}, 1000),
		[]
	);

	const handleInputChange = (_, newInputValue) => {
		setInputValue(newInputValue);

		if (newInputValue) {
			throttleFunction(newInputValue);
		} else {
			setOptions([]);
		}
	};

	return (
		<>
			<div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
			<div>{`inputValue: '${inputValue}'`}</div>
			<br />
			{/* To understand more about Material UI Autocomplete visit https://material-ui.com/components/autocomplete/ */}
			<Autocomplete
				freeSolo
				autoHighlight
				value={value}
				onChange={(_, newValue) => {
					setValue(newValue);
				}}
				inputValue={inputValue}
				onInputChange={handleInputChange}
				id='search '
				options={options}
				renderInput={params => (
					<TextField {...params} variant='outlined' placeholder='Search for groups' />
				)}
			/>
		</>
	);
}
