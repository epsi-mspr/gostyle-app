import 'react-native';
import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import Signup from '../../api/Signup';
import Firebase from '../../config/firebaseConfig';

jest.mock('@react-navigation/native', () => ({
  createNavigatorFactory: jest.fn(),
  useNavigation: jest.fn()
}));
jest.mock('@react-native-community/masked-view', () => ({}));

beforeEach(() => {
  // @ts-ignore
  useNavigation.mockReset();
});

describe('Signup', () => {
  afterAll(() => {
    Firebase.delete();
  });

  it('should sign up to firebase', async () => {
    const mockNavigate = jest.fn();
    useNavigation.mockImplementation(() => ({ navigate: mockNavigate }));
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ token: 'fake-token' })
    });

    const firstname = 'test';
    const lastname = 'test';
    const email = `${Math.random()
      .toString(36)
      .substring(2, 15)}@test.fr`;
    const password = 'test123';

    const {
      getByPlaceholderText,
      getByTestId
    } = render(<Signup navigation={mockNavigate} />);

    const button = getByTestId('touchable-opacity');

    await act(async () => {
      fireEvent.changeText(getByPlaceholderText(/First name/i), firstname);
      fireEvent.changeText(getByPlaceholderText(/Last name/i), lastname);
      fireEvent.changeText(getByPlaceholderText(/Email/i), email);
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
});
