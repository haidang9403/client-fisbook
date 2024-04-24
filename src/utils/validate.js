import { object, string } from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const userSchema = {
    validate: object({
        fullname: string().required("Hãy nhập họ và tên"),
        email: string().required("Hãy nhập email").email("Email không hợp lệ"),
        phone: string().required("Hãy nhập số điện thoại").matches(phoneRegExp, "Số điện thoại không hợp lệ"),
        address: string().required("Hãy nhập địa chỉ")
    })
}

export const errorValidateAll = (error) => {
    if (error.name && error.name === "ValidationError") {
        const errors = error.inner.reduce((totalErrors, err) => {
            return {
                ...totalErrors,
                [err.path]: err.message
            }
        }, {});
        return errors
    }
    return {}
}
