module.exports = {
    app: {
        name: "MERN-Store",
    },
    api: {
        base_url: 'http://localhost:3900/api/',
        products: `product`,
        signin: `auth/signin`,
        signup: `auth/signup`
    },
    _status: {
        idle: 'idle',
        loading: 'loading',
        pending: 'pending',
        succeeded: 'succeeded',
        failed: 'failed',

    },
    regex: {
        email: /^[A-Za-z0-9._+\-\']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/,
        phone: /^\d{3}\d{3}\d{4}$/
    }
}