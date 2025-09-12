import Movienavbar from '../components/Movienavbar';
import { Outlet } from 'react-router-dom';

const MovieLayout = () => (
    <>
        <Movienavbar/>
        <Outlet/>
    </>
);

export default MovieLayout;