const UserList = ({ users }) => {

    const renderUsers = users.map((user, index) => (
        <tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>
        </tr>
    ))

   return (
       <table align="center">
           <thead>
               <tr>
                   <th>Name </th>
                   <th>Email </th>
               </tr>
           </thead>
           <tbody data-testid="users">
               {renderUsers}
           </tbody>
       </table>
   );
};
export default UserList;