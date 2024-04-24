function queryString(query) {
    const queryParams = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (value) {
            queryParams.append(key, value);
        }
    });

    if (queryParams.toString()) {
        return `?${queryParams.toString()}`;
    } else return '';
}

export default queryString;