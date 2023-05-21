import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import LoginForm from './Pages/LoginForm/LoginForm';
import AllTasks from './Pages/TasksHome/AllTasks';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Login } from '@mui/icons-material';
import userEvent from '@testing-library/user-event';

const renderPage = () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={React.createElement(LoginForm)} />
        <Route path='/home' element={React.createElement(AllTasks)} />
      </Routes>
    </MemoryRouter>
  )
}

test('renders learn react link', () => {
  // 1)rendering the component that we want to test
  render(<App />);
  // 2)Finding the element 
  const linkElement = screen.getByText(/Taskify/i);
  // 3)Assertion
  expect(linkElement).toBeInTheDocument();
});

// test('render of login email', () => {
//   renderPage();
//   const title = screen.getByText('Login to your account');
//   const emailInput = screen.getByPlaceholderText('Email');
//   const passwordInput = screen.getByPlaceholderText('Password');
//   const loginButton = screen.getByRole("button", { name: "SignIn" });
//   expect(title).toBeInTheDocument();
//   expect(emailInput).toBeInTheDocument();
//   expect(passwordInput).toBeInTheDocument();
//   expect(loginButton).toBeInTheDocument();
// });

// test("check the Password input have a type password or not", () => {
//   renderPage();
//   const passwordCheck = screen.getByPlaceholderText("Password");
//   expect(passwordCheck).toHaveAttribute("type", "password");
// });

// test('Check whether the SignIn button is having type submit, so that it will perform Onsubmit', () => {
//   renderPage();
//   const signinCheck = screen.getByRole("button", { name: "SignIn" });
//   expect(signinCheck).toBeInTheDocument();
//   expect(signinCheck).toHaveAttribute('type', 'submit');
// });

// // test('check display of error message for invalid email', async () => {
// //   renderPage();

// //   const emailInput = screen.getByPlaceholderText("Email");
// //   userEvent.type(emailInput, "invalid-email");

// //   await waitFor(() => {
// //     const emailError = screen.getByTestId("email-error");
// //     expect(emailError).toHaveTextContent("Invalid email");
// //   });
// // });

// test('Should be able to type email', () => {
//   renderPage();

//   const emailInput = screen.getByPlaceholderText('Email');
//   userEvent.type(emailInput, 'yas@gmail.com');
//   expect(emailInput).toHaveValue('yas@gmail.com');
// });
// test('Should be ablw to type password', () => {
//   renderPage();
//   const passwordInput = screen.getByPlaceholderText('Password');
//   userEvent.type(passwordInput, 'yas@14');
//   expect(passwordInput).toHaveValue('yas@14');
// });
// test("displays error for invalid email format", async () => {
//   renderPage();
//   const emailInput = screen.getByPlaceholderText("Email");
//   const SinginbtnEle = screen.getByRole('button', { name: /SignIn/i });

//   userEvent.type(emailInput, 'yasgmail.com');
//   //userEvent.click(SinginbtnEle);
//   await waitFor(() => {
//     const emailErrorMesAgain = screen.getByTestId('email-error');
//     expect(emailErrorMesAgain).toBeInTheDocument();
//   })
// });

// test("displays error for invalid password format", async () => {
//   renderPage();
//   const emailInput = screen.getByPlaceholderText("Email");
//   const passowrdInput = screen.getByPlaceholderText("Password");

//   userEvent.type(emailInput, 'yas@gmail.com')
//   userEvent.type(passowrdInput, 'yas');
//   //userEvent.click(SinginbtnEle);
//   await waitFor(() => {
//     const passErrorMesAgain = screen.getByText(/Invalid password/i);
//     expect(passErrorMesAgain).toBeInTheDocument();
//   })
// });