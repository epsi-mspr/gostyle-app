import 'react-native';
import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import Login from '../../api/Login';

jest.mock('@react-navigation/native', () => ({
  createNavigatorFactory: jest.fn(),
  useNavigation: jest.fn()
}));
jest.mock('@react-native-community/masked-view', () => ({}));

beforeEach(() => {
  // @ts-ignore
  useNavigation.mockReset();
});

it('should login to firebase', async () => {
  const mockNavigate = jest.fn();
  useNavigation.mockImplementation(() => ({ navigate: mockNavigate }));
  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve({ token: 'fake-token' })
  });

  const username = 'test@test.fr';
  const password = 'test123';

  const {
    getByPlaceholderText,
    getByTestId
  } = render(<Login />);

  const button = getByTestId('touchable-opacity');

  await act(async () => {
    fireEvent.changeText(getByPlaceholderText(/Email/i), username);
    fireEvent.changeText(getByPlaceholderText(/Password/i), password);
  });

  await act(async () => {
    fireEvent.press(button);
  });

  await waitFor(() => expect(mockNavigate)
    .toHaveBeenCalledTimes(1));
  expect(mockNavigate)
    .toHaveBeenCalledWith('Account', { 'screen': 'Profile' });
});
