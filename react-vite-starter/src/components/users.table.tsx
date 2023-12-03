import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchListUsers } from '../redux/user/user.slide';
import { toast } from 'react-toastify';

// interface IUser{
//     id: number;
//     name: string;
//     email: string;
// }

function UsersTable() {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.user.listUsers);

    useEffect(()=>{
        dispatch(fetchListUsers())
        // toast.success("fetch successfully");
        toast('🦄 Wow so easy!');
    },[])
    return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user =>{
                        return(
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </Table>
    );
}

export default UsersTable;