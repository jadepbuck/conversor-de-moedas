import React from 'react';

function CoinList() {

    const COINS = [

        { "initials": "AUD", "description": "Dólar australiano" },
		{ "initials": "BGN", "description": "Lev búlgaro" },
		{ "initials": "BRL", "description": "Real brasileiro" },
		{ "initials": "CAD", "description": "Dólar canadense" },
		{ "initials": "CHF", "description": "Franco suíço" },
		{ "initials": "CNY", "description": "Yuan Chinês" },
		{ "initials": "CZK", "description": "Coroa República Tcheca" },
		{ "initials": "DKK", "description": "Coroa dinamarquesa" },
		{ "initials": "EUR", "description": "Euro" },
		{ "initials": "GBP", "description": "Libra Esterlina" },
		{ "initials": "HKD", "description": "Dólar de Hong Kong" },
		{ "initials": "HRK", "description": "Coroa Croácia" },
		{ "initials": "HUF", "description": "Florim húngaro" },
		{ "initials": "IDR", "description": "Rupia indonésia" },
		{ "initials": "ILS", "description": "Novo shekel israelense" },
		{ "initials": "INR", "description": "Rupia indiana" },
		{ "initials": "JPY", "description": "Iene japonês" },
		{ "initials": "KRW", "description": "Won sul-coreano" },
		{ "initials": "MXN", "description": "Peso mexicano" },
		{ "initials": "MYR", "description": "Malásia Ringgit" },
		{ "initials": "NOK", "description": "Coroa Noruega" },
		{ "initials": "NZD", "description": "Dólar da Nova Zelândia" },
		{ "initials": "PHP", "description": "Peso filipino" },
		{ "initials": "PLN", "description": "Złoty Polónia" },
		{ "initials": "RON", "description": "Leu romeno" },
		{ "initials": "RUB", "description": "Belarus Ruble" },
		{ "initials": "SEK", "description": "Coroa Suécia" },
		{ "initials": "SGD", "description": "Dólar de Singapura" },
		{ "initials": "THB", "description": "Baht Tailândia" },
		{ "initials": "TRY", "description": "Lira turca" },
		{ "initials": "USD", "description": "Dólar dos Estados Unidos" },
		{ "initials": "ZAR", "description": "Rand África do Sul" }
    ];

    function compare(coin1, coin2) {
        if (coin1.description < coin2.description) {
            return -1;
        } else if (coin1.description > coin2.description) {
            return 1;
        } 
        return 0;
    }

    return COINS.sort(compare).map(coin => 
        <option value={coin.initials} key={coin.initials}>
            {coin.description}
        </option>
    );
}

export default CoinList;