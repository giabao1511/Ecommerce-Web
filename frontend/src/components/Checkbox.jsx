import PropTypes from 'prop-types';
import React, { useRef } from 'react';

const Checkbox = props => {
    const inputRef = useRef(null);

    // console.log(props.onChange);
    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current);
        }
    }

    return (
        <label className="custom-checkbox">
            <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked} />
            <span className="custom-checkbox__checkmark">
                <i className="bx bx-check"></i>
            </span>
            {props.label}
        </label>
    )
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool
}

export default Checkbox