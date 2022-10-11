import { Link } from "react-router-dom";

const Header= ()=>{

    return (
            <header className="Header">
                <h2>Blog App with Redux</h2>
                <nav>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={`/posts`}>Add New Post</Link></li>
                        <li><Link to={`/users`}>Users</Link></li>
                    </ul>
                </nav>
            </header>
    )

}

export default Header