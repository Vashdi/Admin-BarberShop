import * as React from 'react';
import './ActiveUsers.css'
import usersService from './Services/users'
import SingleBlockedPerson from './SingleBlockedPerson';

const BlockedUsers = () => {
    const [allBlockedUsers, setAllBlockedUsers] = React.useState([]);
    const [usersToShow, setUsersToShow] = React.useState([]);
    const [search, setSearch] = React.useState("");

    React.useEffect(() => {
        const start = async () => {
            const users = await usersService.getAllBlockedUsers();
            setAllBlockedUsers(users);
            setUsersToShow(users);
        }
        start();
    }, [])

    const handleSearch = (e) => {
        const searchLowerCased = e.target.value.toLowerCase();
        const usersAfterChange = allBlockedUsers.filter(user => user.firstname.toLowerCase().includes(searchLowerCased) || user.lastname.toLowerCase().includes(searchLowerCased));
        setUsersToShow(usersAfterChange);
        setSearch(e.target.value);
    }

    return (
        <div className="AllUsersContainer">
            <div>
                <h3>לקוחות חסומים</h3>
            </div>
            <div className="searchText">
                <p className="searchContext">חיפוש</p>
                <input type="text" dir="rtl" value={search} onChange={handleSearch} />
            </div>
            <div className="personContainer">
                {
                    usersToShow.map((user, index) => {
                        return <SingleBlockedPerson key={index} user={user} callback={(person) => {
                            const newUsersToShow = usersToShow.filter(user => user.id !== person.id)
                            setUsersToShow(newUsersToShow);
                        }} />
                    })
                }
            </div>

        </div>
    )
}

export default BlockedUsers;


