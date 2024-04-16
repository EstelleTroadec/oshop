function convertCentsToEuros(priceHT) {
    return priceHT / 100;
}

function addTva(priceHT) {
    const TVA = 20 / 100;

    const montantTva = priceHT * TVA;

    return priceHT + montantTva;
}

function formatPrice(priceHT) {
    return addTva(convertCentsToEuros(priceHT)).toFixed(2);
}

module.exports = formatPrice;