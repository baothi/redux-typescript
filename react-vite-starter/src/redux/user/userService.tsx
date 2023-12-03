interface IUser {
    id?: number;
    name?: string | null;
    email?: string | null;
    // các trường khác nếu cần
  }

const fetchUsers = async () => {
    try {
        const res = await fetch("http://localhost:8000/users");

        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('There was an error fetching the users:', error);
        throw error;
    }
};

const fetchCreateNewUsers = async (user: IUser) => {
    try {
        console.log("Created new user from user data from")
        console.log(user);
        console.log("Created new user from user data from")
        const res = await fetch("http://localhost:8000/users",{
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                name: user.name
            })
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('There was an error fetching the users:', error);
        throw error;
    }
};


const fetchUpdateUsers = async (user: IUser) => {
    try {
        console.log("Created new user from user data from")
        console.log(user);
        console.log("Created new user from user data from")
        const res = await fetch(`http://localhost:8000/users/${user.id}`,{
            method: 'PUT',
            body: JSON.stringify({
                email: user.email,
                name: user.name
            })
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('There was an error fetching the users:', error);
        throw error;
    }

}


const userService = {
    fetchUsers,
    fetchCreateNewUsers,
    fetchUpdateUsers,
};

export default userService;