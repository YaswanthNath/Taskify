import React from 'react';
import App from '../../App';
import { getByText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import {LoginForm} from './../LoginForm/LoginForm';
import AllTasks from './AllTasks';

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
    render(<App/>);
    // 2)Finding the element 
    const linkElement = screen.getByText(/Taskify/i);
    // 3)Assertion
    expect(linkElement).toBeInTheDocument();
});

test('Check whether AddNew button is there or not',()=>{
  render(<AllTasks/>);
    const addNewButton=screen.queryByRole('button',{name:/Add new/i});
    const progressButton=screen.queryByText(/Progress/i);
    const completedButton=screen.queryByText(/Completed/i);
    expect(addNewButton).toBeInTheDocument();
    expect(progressButton).toBeInTheDocument();
    expect(completedButton).toBeInTheDocument();
});

test('Check the dialog box is opening or not after clicking Addnew button',async ()=>{
  render(<AllTasks/>);
  const addNewButton=screen.queryByRole('button',{name:/Add new/i});
  userEvent.click(addNewButton);
  
  await waitFor(()=>{
    const isCardHeadTitle=screen.queryByText(/Add New Task/i);
    expect(isCardHeadTitle).toBeInTheDocument();
  })
});

test(('Check all the input feilds in dialog after clicking Add new are rendering or not'),async ()=>{
  render(<AllTasks/>);
  const addNewButton=screen.queryByRole('button',{name:/Add new/i});
  userEvent.click(addNewButton);
  await waitFor(()=>{
    const isTitleThere=screen.queryByLabelText(/Title/i);
    const isDescriptionThere=screen.queryByLabelText(/Title/i);
    const isAddThere=screen.queryByRole('button',{name:/ADD/i});
    const isCancelThere=screen.queryByRole('button',{name:/CANCEL/i});
    expect(isTitleThere).toBeInTheDocument();
    expect(isDescriptionThere).toBeInTheDocument();
    expect(isCancelThere).toBeInTheDocument();
    expect(isAddThere).toBeInTheDocument();
  })
})

test(('Ckeck the category is rendering or not'),async ()=>{
  render(<AllTasks/>);
  const addNewButton=screen.queryByLabelText(/Category/i);
  expect(addNewButton).toBeInTheDocument();
});

test(('Ckeck the category for list of tasks is rendering or not'),async ()=>{
  render(<AllTasks/>);
  const category=screen.queryByLabelText(/Category/i);

  userEvent.click(category);
  await waitFor(()=>{
    const isPeronalThere=screen.queryByText(/Personal/i);
    const isWorkThere=screen.queryByText(/Work/i);
    const isOthersThere=screen.queryByText(/Others/i);

    expect(isPeronalThere).toBeInTheDocument();
    expect(isWorkThere).toBeInTheDocument();
    expect(isOthersThere).toBeInTheDocument();
  })
});