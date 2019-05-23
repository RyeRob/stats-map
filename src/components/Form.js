import React from 'react';

const Form = props => (
    <form onSubmit={props.getStats}>
        <label htmlFor="city">City</label>
        <input type="text" name="city" placeholder="City"/>
        <label htmlFor="country">Country</label>
        <input type="text" name="country" placeholder="Country"/>
        <button className="waves-effect waves-light btn">Get Info</button>
    </form>
)

export default Form