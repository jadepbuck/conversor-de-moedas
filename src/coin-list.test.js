import React from 'react';
import ReactDOM from 'react-dom';
import CoinList from './coin-list';

describe('CoinList test', ()=>{

    it('render without error', ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<CoinList />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});