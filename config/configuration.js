module.exports = {
    'db': 'mongodb://localhost/csel',
    'port': process.env.port || 8000,
    'jwtSecret': "MyS3cr3tK3Y",
    'jwtSession': {
        session: false
    }
};
