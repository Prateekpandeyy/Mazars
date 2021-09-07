import React, { Component, Fragment } from "react";

class Select extends Component {
  render() {
    const { label, value, handleChange, data } = this.props;

    console.log("value-",value)
    return (
      <Fragment>
        <label>
          {label} :
          <select 
          className="form-control"
          defaultValue={value} 
          onChange={handleChange}>
            
            {data.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </Fragment>
    );
  }
}

export default Select;
