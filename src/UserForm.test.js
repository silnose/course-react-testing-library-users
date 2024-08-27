import { render, screen } from '@testing-library/react';
import UserForm from './UserForm';
import userEvent from '@testing-library/user-event';

test('Show 2 inputs and one button non async', () => {
    //render the component
    render(<UserForm />);
    //manipulate the component or find an element in it
    //Role: aria role https://www.w3.org/TR/html-aria/#docconformance
    const inputs = screen.getAllByRole('textbox'); //get multiple elements
    const button = screen.getByRole('button', { //get only one element
        name: /submit/i,
    });
    // Assertion (jest) - make sure the component is doing what it should be doing
    //matchers from jest https://jestjs.io/docs/expect (more general)
    //matchers from react testing library: https://github.com/testing-library/jest-dom?tab=readme-ov-file#custom-matchers
    expect(inputs).toHaveLength(2) //;
    expect(button).toBeInTheDocument();
});

//user event async https://testing-library.com/docs/user-event/intro/#writing-tests-with-userevent

test("it calls onUserAdd when the form is submitted NOT THE BEST IMPLEMENTATION", async () => {
    // Try to render my component
    const argsList = [];
    const callback = (...args) => { argsList.push(args) };
    render(<UserForm onUserAdd={callback} />);

    // Find the two inputs
    const [nameInput, emailInput] = screen.getAllByRole("textbox");

    // Simulate typing in a name
    await userEvent.click(nameInput);
    await userEvent.keyboard("jane");

    // Simulate typing in an email
    await userEvent.click(emailInput);
    await userEvent.keyboard("jane@jane.com");

    // Find the button
    const button = screen.getByRole('button', {
        name: /submit/i,
    });

    // Simulate clicking the button
    await userEvent.click(button);

    // Assertion to make sure 'onUserAdd' gets called with email/name

    //expect(callback).toHaveBeenCalledWith([{ name: "jane", email: "jane@jane.com" }])
    expect(argsList).toHaveLength(1);
    expect(argsList[0][0]).toEqual({"email": "jane@jane.com", "name": "jane"});
});


test("it calls onUserAdd when the form is submitted  BEST IMPLEMENTATION", async () => {
    const mock = jest.fn()
    // Try to render my component
    render(<UserForm onUserAdd={mock} />);

    // Find the two inputs

    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    //const nameInput = screen.getByLabelText(/email/i);

    // Simulate typing in a name
    await userEvent.click(nameInput);
    await userEvent.keyboard("jane");

    // Simulate typing in an email
    await userEvent.click(emailInput);
    await userEvent.keyboard("jane@jane.com");

    // Find the button
    const button = screen.getByRole('button', {
        name: /submit/i,
    });

    // Simulate clicking the button
    await userEvent.click(button);

    // Assertion to make sure 'onUserAdd' gets called with email/name

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({"email": "jane@jane.com", "name": "jane"});
  });