import { useContext } from 'react';
import { userDefault } from '../../../constant/userDefault';
import { UserContext } from '../../../contexts/userContext';

export default function Logout(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { onUserChange } = useContext(UserContext);

    const logout = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        onUserChange(userDefault);
        localStorage.clear();
        props.setPage('accueil');
    };

    return (
        <div className="">
            <button
                className="btn btn-primary rounded-pill me-5 mt-2"
                onClick={(e) => logout(e)}
            >
                Deconnexion
            </button>
        </div>
    );
}
