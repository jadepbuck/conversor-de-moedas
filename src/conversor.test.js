import React from 'react';
import ReactDOM from 'react-dom';
import Conversor from './conversor';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios';

describe('Convert coins test', () => {

  it('renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Conversor />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('error free currency converter', async () => {
    const { findByTestId, getByTestId } = render(<Conversor />);
    axiosMock.get.mockResolvedValueOnce({
      data: {success: true, rates: { BRL: 1, USD: 0.19 }}
    });
    fireEvent.click(getByTestId('btn-converter'));
    const modal = await findByTestId('modal');
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(modal).toHaveTextContent('1 BRL = 0.19 USD');
  });

});