/**
 * Validação de CPF, CNPJ e Email
 */

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;

    return true;
}

function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj.charAt(i)) * weights1[i];
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;
    if (parseInt(cnpj.charAt(12)) !== digit1) return false;

    sum = 0;
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj.charAt(i)) * weights2[i];
    }
    remainder = sum % 11;
    const digit2 = remainder < 2 ? 0 : 11 - remainder;
    if (parseInt(cnpj.charAt(13)) !== digit2) return false;

    return true;
}

function validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    if (email.length > 254) return false;

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) return false;

    const parts = email.split('@');
    if (parts.length !== 2) return false;

    const domain = parts[1];
    const domainParts = domain.split('.');
    if (domainParts.length < 2) return false;

    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2 || tld.length > 63) return false;

    return true;
}

function identifyDocument(doc) {
    const cpfWithPunctuation = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const cpfWithoutPunctuation = /^\d{11}$/;
    const cnpjWithPunctuation = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    const cnpjWithoutPunctuation = /^\d{14}$/;

    if (cpfWithPunctuation.test(doc) || cpfWithoutPunctuation.test(doc)) {
        return 'CPF';
    } else if (cnpjWithPunctuation.test(doc) || cnpjWithoutPunctuation.test(doc)) {
        return 'CNPJ';
    }
    return 'Invalid';
}

module.exports = {
    validateCPF,
    validateCNPJ,
    validateEmail,
    identifyDocument
};
