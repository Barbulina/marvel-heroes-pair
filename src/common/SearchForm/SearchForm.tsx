import React, { useState } from "react";
import { Input } from 'antd';
import { Select } from 'antd';
import { AutoComplete } from 'antd';
import debounce from "../../helpers/debounce";
const DEBOUNCE_TIME = 1000;
const TYPES = [
'comics', 'creators', 'events', 'series', 'stories'
]
const { Option } = Select;
const { Search } = Input;

export default function SearchForm({isLoading, placeholder, onSearch}:{isLoading:boolean, placeholder:string, onSearch: Function}) {

  const [typeSelected, setType] = useState('');
  const searchHandler = (event: any) => {
    console.log(event);
    onSearch(event);
  }

  const handleChangeType = (type: string)  => {
    setType(type);
  }

  const options = [{value: 'option 1'}, {value: 'option 2'}];

  const onSelect = (e: any) => {
    console.log('on select' , e, typeSelected);
  }
   
  const onSearchByType = debounce((value: string) => {
    console.log('values debounced' , value);  
  }, DEBOUNCE_TIME);
  
  return (
    <React.Fragment>
      <Search onSearch={searchHandler} placeholder={placeholder} loading={isLoading} enterButton />
      <AutoComplete
        options={options}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={onSearchByType}
        placeholder="search " 
        disabled={!typeSelected}
      />
      <Select placeholder="test" style={{ width: 120 }} onChange={handleChangeType}>
        {TYPES.map(type =>  <Option  key={type} value={type}>{type}</Option>)}
    </Select>
    </React.Fragment>
  );
}