import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import App from '../../App';

test('page should have 3 differents pages (Home, Account, Promotions)', async () => {
  const { findByText } = render(<App />);
  const homePage = await findByText('Account');
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
  const homePage = await findByText('Account');

  fireEvent(homePage, 'click');

  const accountScreen = await findByText('AccountScreen');
  expect(accountScreen)
    .toBeTruthy();
});

test('clicking the home button should redirect to the home page', async () => {
  const { findByText } = render(<App />);
  const homePage = await findByText('Home');

  fireEvent(homePage, 'click');

  const homeScreen = await findByText('Home');
  expect(homeScreen)
    .toBeTruthy();
});
