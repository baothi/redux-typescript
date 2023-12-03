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

const userService = {
    fetchUsers
};

export default userService;