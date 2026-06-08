/**
 * config.js — Configuração dinâmica de URLs
 * Detecta automaticamente o ambiente (local, staging, produção)
 */

const hostname = window.location.hostname;
const parts = hostname.split('.');
const apiProtocol = window.location.protocol;
const port = 3032;

let apiDomain;
let portalDomain;

if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Desenvolvimento local
    apiDomain = `${hostname}:${port}`;
    portalDomain = `${hostname}:3000`;
} else if (hostname.includes('minisitio.com.br')) {
    apiDomain = hostname;
    portalDomain = hostname;
} else if (hostname.includes('automaplay.com.br')) {
    apiDomain = 'automaplay.com.br';
    portalDomain = 'minitest.automaplay.com.br';
} else if (parts.length >= 2) {
    // Qualquer outro domínio (produção genérica)
    apiDomain = parts.slice(-2).join('.');
    portalDomain = hostname;
} else {
    apiDomain = hostname;
    portalDomain = hostname;
}

const apiUrl = `${apiProtocol}//${apiDomain}/api`;
const ioUrl  = `${apiProtocol}//${apiDomain}`;
const domain = `${apiProtocol}//${portalDomain}`;

export const masterPath = {
    url: apiUrl,
    domain: domain,
    ioUrl: ioUrl,
    accessToken: sessionStorage.getItem('userTokenAccess'),
};

export const version = {
    version: 'v2.1.29',
};
