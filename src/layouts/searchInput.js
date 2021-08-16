import React, { PureComponent } from 'react';
import { Select } from 'antd';

const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus(select) {
  console.log(select);
}

function onSearch(val) {
  console.log('search:', val);
}

class SearchInput extends PureComponent {
  render() {
    return (
      <Select
      ref={select => { this.select = select }}
      showSearch
      style={{ width: 200, marginLeft: 400 }}
      placeholder="Select an institution"
      optionFilterProp="children"
      onChange={onChange}
      onFocus={() => onFocus(this.select)}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      >
        <Option value="jack">联影医院</Option>
        <Option value="lucy">华西医院</Option>
        <Option value="tom">中山医院</Option>
      </Select>
    );
  }
}
export default SearchInput;
