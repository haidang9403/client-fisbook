export default function convertObjectValues(obj) {
    const result = {};

    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (value.includes(',')) {
                result[key] = value.split(',').map(item => item.trim());
            } else {
                result[key] = [value];
            }
        }
    }

    return result;
}