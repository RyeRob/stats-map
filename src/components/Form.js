import React from 'react';
// not currently used
const Form = props => (
  <form className="searchForm" onSubmit={props.getStats}>
    <label htmlFor="city">City</label>
    <input type="text" name="city" id="city" placeholder="City"/>
    <label htmlFor="country">Country</label>
    <input type="text" name="country" id="country" placeholder="Country"/>
    <button className="waves-effect waves-light btn">Get Info</button>
  </form>
);

export default Form