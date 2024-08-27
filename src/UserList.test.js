import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';



test('should display one line per user NOT BEST IMPLEMENTATION', async () => {
    const usersList = [{"email": "jane@jane.com", "name": "jane"},{"email": "jon@jon.com", "name": "jon"}]
    //render the component
    render(<UserList users={usersList} />);
    //find all the rows in the table
    //screen.logTestingPlaygroundURL();
    const rows = screen.getAllByRole("row");// getAll = more than 1 element
    // assetion: correct number of rows in the table
    expect(rows).toHaveLength(usersList.length + 1);
});


test('should display one line per user BETTER IMPLEMENTATION WITH data-testid', async () => {
    const usersList = [{"email": "jane@jane.com", "name": "jane"},{"email": "jon@jon.com", "name": "jon"}]
    //render the component
    render(<UserList users={usersList} />);
    //find all the rows in the table
    //screen.logTestingPlaygroundURL();
    const rows = within(screen.getByTestId("users")).getAllByRole('row');// getAll = more than 1 element
    // assetion: correct number of rows in the table
    expect(rows).toHaveLength(usersList.length);
});

test('should display one line per user BETTER IMPLEMENTATION WITH container query-selector', async () => {
    const usersList = [{"email": "jane@jane.com", "name": "jane"},{"email": "jon@jon.com", "name": "jon"}]
    //render the component
    const { container } = render(<UserList users={usersList} />);
    //find all the rows in the table
    //screen.logTestingPlaygroundURL();
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const table = container.querySelectorAll("tbody tr");
    // assetion: correct number of rows in the table
    expect(table).toHaveLength(usersList.length);
});



