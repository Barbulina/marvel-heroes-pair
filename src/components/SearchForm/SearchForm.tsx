import { useState } from "react";
import { Input } from "antd";
import { Select } from "antd";
import { AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../state/actions";
import debounce from "../../helpers/debounce/debounce";

const DEBOUNCE_TIME = 1000;
const TYPES = ["comics", "creators", "events", "series", "stories"];
const { Option } = Select;
const { Search } = Input;

export default function SearchForm({
  isLoading,
  placeholder,
  onSearch,
}: {
  isLoading: boolean;
  placeholder: string;
  onSearch: Function;
}) {
  const dispatch = useDispatch();
  const [typeSelected, setType] = useState("");
  const [idTypeSelected, setIdType] = useState();

  const searchHandler = (event: any) => {
    let filter;
    if (idTypeSelected && typeSelected) {
      filter = {
        type: typeSelected,
        id: idTypeSelected,
      };
    }
    onSearch(event, filter);
  };

  const handleChangeType = (type: string) => {
    dispatch(actions.loadTypes([]));
    setType(type);
  };
  const onSelectType = (value: string, option: any) => setIdType(option.id);
  const options: { label: string; value: string }[] = useSelector(
    (store: any) => store.types
  );

  const onSearchByType = debounce((value: string) => {
    setIdType(undefined);
    dispatch(actions.getTypes(typeSelected, value));
  }, DEBOUNCE_TIME);

  return (
    <div className="App__search-form">
      <Search
        onSearch={searchHandler}
        placeholder={placeholder}
        loading={isLoading}
        enterButton
      />
      <AutoComplete
        allowClear={true}
        options={options}
        style={{ width: "70%" }}
        onSelect={onSelectType}
        onSearch={onSearchByType}
        placeholder="search "
        disabled={!typeSelected}
      />
      <Select
        placeholder="test"
        style={{ width: "30%" }}
        onChange={handleChangeType}
      >
        {TYPES.map((type) => (
          <Option key={type} value={type}>
            {type}
          </Option>
        ))}
      </Select>
    </div>
  );
}
