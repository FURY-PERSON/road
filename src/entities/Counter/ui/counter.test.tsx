import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@/shared/lib/helpers/tests/renderWithProviders/renderWithProviders';
import { Counter } from './Counter';

describe('Counter', () => {
  test('should be in the document', () => {
    renderWithProviders(<Counter />, {
      initialState: {counter: {value: 3}}
    });

    expect(screen.getByTestId('value')).toBeInTheDocument();
  });

  test('should have value', () => {
    renderWithProviders(<Counter />, {
      initialState: {counter: {value: 3}}
    });

    expect(screen.getByTestId('value')).toHaveTextContent('3');
  });

  test('should increment', () => {
    renderWithProviders(<Counter />, {
      initialState: {counter: {value: 3}}
    });
    const incrementButton = screen.getByTestId('increment-btn');
    fireEvent.click(incrementButton);
    expect(screen.getByTestId('value')).toHaveTextContent('4');
  });

  test('should decrement', () => {
    renderWithProviders(<Counter />, {
      initialState: {counter: {value: 3}}
    });
    const incrementButton = screen.getByTestId('decrement-btn');
    fireEvent.click(incrementButton);
    expect(screen.getByTestId('value')).toHaveTextContent('2');
  });
});
