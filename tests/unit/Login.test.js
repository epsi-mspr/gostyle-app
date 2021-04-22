import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react-native';
import App from '../../App';

jest.mock('@react-native-community/masked-view', () => ({}));

describe('login', () => {
  it('should logout correctly', async () => {
    const username = 'test@test.fr';
    const password = 'test123';
    const {
      getByPlaceholderText,
      findByTestId,
      findByText
    } = render(<App />);

    // Navigate to the account page
    const accountPage = await findByText('Account');
    fireEvent(accountPage, 'click');
    // Type email and password then click login button
    const loginButton = await findByTestId('touchable-opacity');
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText(/Email/i), username);
      fireEvent.changeText(getByPlaceholderText(/Password/i), password);
    });
    await act(async () => {
      fireEvent.press(loginButton);
    });
    // Click on the logout button
    const logoutButton = await findByTestId('logout');
    await act(async () => {
      fireEvent.press(logoutButton);
    });

    expect(await findByText('Vous n\'avez pas de compte? Clicker ici'))
      .toBeTruthy();
  });

  it('should login to firebase', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ token: 'fake-token' })
    });
    const username = 'test@test.fr';
    const password = 'test123';
    const {
      getByPlaceholderText,
      findByTestId,
      queryByTestId,
      getByTestId,
      findByText
    } = render(<App />);

    // Navigate to the account page
    const accountPage = await findByText('Account');
    fireEvent(accountPage, 'click');
    // Type email and password then click login button
    const loginButton = await findByTestId('touchable-opacity');
    await act(async () => {
      fireEvent.changeText(getByPlaceholderText(/Email/i), username);
      fireEvent.changeText(getByPlaceholderText(/Password/i), password);
    });
    await act(async () => {
      fireEvent.press(loginButton);
    });

    await waitFor(() => expect(queryByTestId('email'))
      .toBeTruthy());

    expect(getByTestId('email').props.children)
      .toBe(username);
  });
});
