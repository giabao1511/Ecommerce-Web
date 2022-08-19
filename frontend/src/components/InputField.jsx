import React from 'react'
import PropTypes from 'prop-types'

const InputField = props => {
    const { label, inputType, placeholder, setData, classStyle, index } = props;

    return (
        <div className={classStyle}>
            <label htmlFor={index}>{label}</label>
            <input
                id={index}
                type={inputType}
                placeholder={placeholder}
                onChange={(e) => setData(e.target.value)}
            />
        </div>
    );
}

InputField.propTypes = {
    label: PropTypes.string,
    inputType: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    setData: PropTypes.func,
    classStyle: PropTypes.string
}

export default InputField