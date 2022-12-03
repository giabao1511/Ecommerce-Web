// import React from 'react'
// import PropTypes from 'prop-types'
// import { inputRequirement } from '../imports';
// import { useForm } from "react-hook-form"

// const InputField = props => {
//     const { label, inputType, placeholder, setData, classStyle, index, ref } = props;
//     const { emailRequire, usernameRequire, passwordLoginRequire } = inputRequirement();
//     const {
//         register,
//         formState: { errors },
//         handleSubmit,
//         watch } = useForm({
//             defaultValues: {
//                 email: "",
//                 password: "",
//             },
//         })

//     return (
//         <div className={classStyle}>
//             <label htmlFor={index}>{label}</label>
//             <input
//                 ref={ref}
//                 id={index}
//                 type={inputType}
//                 placeholder={placeholder}
//                 onChange={(e) => setData(e.target.value)}
//             />
//         </div>
//     );
// }

// InputField.propTypes = {
//     label: PropTypes.string,
//     inputType: PropTypes.string.isRequired,
//     placeholder: PropTypes.string,
//     setData: PropTypes.func,
//     classStyle: PropTypes.string
// }

// export default InputField