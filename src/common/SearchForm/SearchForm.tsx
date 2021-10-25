import React from "react";
import { Input } from 'antd';

const { Search } = Input;

export default function SearchForm({isLoading, placeholder, onSearch}:{isLoading:boolean, placeholder:string, onSearch: Function}) {

  const searchHandler = (event: any) => {
    console.log(event);
    onSearch(event);
  }
  
  return (
    <React.Fragment>
      <Search onSearch={searchHandler} placeholder={placeholder} loading={isLoading} enterButton />
    </React.Fragment>
  );
}