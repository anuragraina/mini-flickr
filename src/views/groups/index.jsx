import { useState } from 'react';
import Flickr from 'flickr-sdk';

//importing Material UI components
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//Creates a new Flickr REST API client
//for more details see https://www.npmjs.com/package/flickr-sdk#new-flickrauth
const flickr = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);

export default function ControllableStates() {
	const [value, setValue] = useState(null);
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState([]);

	const handleInputChange = async (_, newInputValue) => {
		setInputValue(newInputValue);

		if (newInputValue) {
			const response = await flickr.groups.search({
				text: newInputValue,
				per_page: 10,
			});
			const groupNames = response.body.groups.group.map(item => item.name);

			setOptions(groupNames);
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
