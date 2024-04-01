function mainPath(path) {
    if (path === '' || path === '/') {
        return '/';
    }
    // Tách chuỗi đường dẫn thành mảng các phần tử
    const parts = path.split('/');

    // Lọc ra các phần tử không trống
    const filteredParts = parts.filter(part => part !== '');

    // Ghép các phần tử lại với nhau, bắt đầu từ dấu '/'
    const simplifiedPath = '/' + filteredParts[0];

    return simplifiedPath;
}

export default mainPath;