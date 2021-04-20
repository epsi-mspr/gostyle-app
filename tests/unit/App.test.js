import React from 'react';
import { fireEvent, render, act } from '@testing-library/react-native';
import App from '../../App';
import Firebase from '../../config/firebaseConfig';

describe('App', () => {
  afterAll(() => {
    Firebase.database()
      .goOffline();
  });

  test('page should have 3 differents pages (Home, Account, Promotions)', async () => {
    const { findByText } = render(<App />);
    const homePage = await findByText('Home');
    const promotionsPage = await findByText('Promotions');
    const accountPage = await findByText('Account');

    expect(homePage)
      .toBeTruthy();

    expect(promotionsPage)
      .toBeTruthy();

    expect(accountPage)
      .toBeTruthy();
  });

  test('clicking the account button should redirect to the account page', async () => {
    const { findByText } = render(<App />);
    const accountPage = await findByText('Account');

    fireEvent(accountPage, 'click');

    const accountScreen = await findByText('Vous n\'avez pas de compte? Clicker ici');
    expect(accountScreen)
      .toBeTruthy();
  });

  test('clicking the home button should redirect to the home page', async () => {
    const {
      getByTestId,
      findByText
    } = render(<App />);
    const homePage = await findByText('Home');

    await act(async () => {
      fireEvent(homePage, 'click');
    });

    const homeScreen = await getByTestId('home');
    expect(homeScreen)
      .toBeTruthy();
  });

  test('clicking the promotions button should redirect to the promotions page', async () => {
    const { findByText } = render(<App />);
    const promotionsPage = await findByText('Promotions');

    fireEvent(promotionsPage, 'click');

    const promotionsScreen = await findByText('La liste des promotions:');
    expect(promotionsScreen)
      .toBeTruthy();
  });

});
