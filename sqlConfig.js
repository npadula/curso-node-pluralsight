const mssqlConfig = {
    server: "NTB001\\SQLEXPRESS",
    database: "Test",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
};

module.exports = mssqlConfig;