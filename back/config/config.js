require('dotenv').config();

module.exports = {
    url: process.env.API_URL || 'http://localhost:3032/api',
    domain: process.env.FRONTEND_URL || 'http://localhost:3000',
    urlPublic: process.env.FRONTEND_URL || 'http://localhost:3000',
    apiSecret: process.env.API_SECRET,
    SECRET_KEY_WEBHOOK: process.env.SECRET_KEY_WEBHOOK,

    // Mercado Pago — Sandbox (desenvolvimento)
    MP_PUBLIC_KEY_SANDBOX: process.env.MP_PUBLIC_KEY_SANDBOX,
    MP_ACCESS_TOKEN_SANDBOX: process.env.MP_ACCESS_TOKEN_SANDBOX,

    // Mercado Pago — Produção
    mp_prod: {
        publickey: process.env.MP_PUBLIC_KEY_PROD,
        AccessToken: process.env.MP_ACCESS_TOKEN_PROD,
        ClientID: process.env.MP_CLIENT_ID,
        ClientSecret: process.env.MP_CLIENT_SECRET,
    }
}
