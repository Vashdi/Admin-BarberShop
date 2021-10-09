import * as React from 'react';
import Swal from 'sweetalert2';
import './ActiveUsers.css'
import usersService from './Services/users'
import SingleActivePerson from './SingleActivePerson';

const ActiveUsers = () => {
    const [allUsers, setAllUsers] = React.useState([]);
    const [usersToShow, setUsersToShow] = React.useState([]);
    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        const start = async () => {
            try {
                const users = await usersService.getAllUsers();
                setAllUsers(users);
                setUsersToShow(users);
            } catch (error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: error.response.data,
                })
            }
        }
        start();
    }, [])

    const handleSearch = (e) => {
        const searchLowerCased = e.target.value.toLowerCase();
        const usersAfterChange = allUsers.filter(user => user.firstname.toLowerCase().includes(searchLowerCased) || user.lastname.toLowerCase().includes(searchLowerCased));
        setUsersToShow(usersAfterChange);
        setSearch(e.target.value);
    }

    return (
        <div className="AllUsersContainer">
            <div>
                <h3>רשימת לקוחות</h3>
            </div>
            <div className="searchText">
                <p className="searchContext">חיפוש</p>
                <input type="text" dir="rtl" value={search} onChange={handleSearch} />
            </div>
            <div className="personContainer">
                {
                    usersToShow.map((user, index) => {
                        return <SingleActivePerson key={index} user={user} callback={(person) => {
                            const newUsersToShow = usersToShow.filter(user => user.id !== person.id)
                            setUsersToShow(newUsersToShow);
                        }} />
                    })
                }
            </div>
        </div>
    )
}

export default ActiveUsers;


