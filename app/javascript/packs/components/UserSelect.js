import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { fetch, fetchJson } from './Fetch';
import Routes from 'routes';

export default class UserSelect extends Component {
  state = {
     inputValue: '',
  }

  getOptionLabel = (option) => {
    return option.first_name + ' ' + option.last_name
  }

  getOptionValue = (option) => {
    return option.id
  }

  loadOptions = (inputValue) => {
  	const params = {
      method: 'GET',
      route: Routes.api_v1_users_path,
      body: {
        q: { first_name_or_last_name_cont: inputValue }
      }
    };

    return fetchJson(params).then(({data}) => {
      return data.items
    });
  }

  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  }

  componentDidMount() {
    this.loadOptions();
  }

	render() {
		const { isDisabled, value, onChange } = this.props;
    return (
      <div>
        <AsyncSelect
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
          getOptionLabel={this.getOptionLabel}
          getOptionValue={this.getOptionValue}
          isDisabled={isDisabled}
          defaultValue={value}
          onChange={onChange}
        />
      </div>
    );
  }
} 