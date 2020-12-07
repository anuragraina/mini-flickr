import { useState, useMemo } from 'react';
import Flickr from 'flickr-sdk';
import { throttle } from 'lodash';
import { useHistory } from 'react-router-dom';

//importing Material UI components
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from './styles';

//Creates a new Flickr REST API client
//for more details see https://www.npmjs.com/package/flickr-sdk#new-flickrauth
const flickr = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);

export default function Searchbar() {
	const classes = useStyles();
	const history = useHistory();
	const [value, setValue] = useState(null);
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState([]);

	//function to prevent making unnecessary calls when the user is typing a query in the search box
	const throttleFunction = useMemo(
		() =>
			throttle(async newInputValue => {
				const response = await flickr.groups.search({
					text: newInputValue,
					per_page: 10,
				});

				const groupNames = response.body.groups.group.map(item => item.name);
				setOptions(groupNames);
			}, 500),
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
			{/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
			<div>{`inputValue: '${inputValue}'`}</div>
			<br /> */}
			{/* To understand more about Material UI Autocomplete visit https://material-ui.com/components/autocomplete/ */}
			<Autocomplete
				freeSolo
				blurOnSelect
				value={value}
				size='small'
				onChange={(_, newValue) => {
					history.push(`/groups?searchKey=${newValue}`);
					setValue(newValue);
				}}
				inputValue={inputValue}
				onInputChange={handleInputChange}
				id='search-groups'
				options={options}
				renderInput={params => (
					<TextField
						{...params}
						variant='outlined'
						placeholder='Search for groups'
						InputProps={{
							...params.InputProps,
							startAdornment: (
								<>
									<InputAdornment position='start'>
										<SearchIcon />
									</InputAdornment>
									{params.InputProps.startAdornment}
								</>
							),
						}}
					/>
				)}
				renderOption={option => {
					return (
						<>
							<section className={classes.optionIcon}>
								<SearchIcon />
							</section>
							{option}
						</>
					);
				}}
				classes={{
					option: classes.options,
					listbox: classes.listbox,
				}}
			/>
		</>
	);
}
