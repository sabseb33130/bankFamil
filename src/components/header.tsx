import Navbar from './navbarConnect';

export default function Header(props: {
    token: string | null;
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <div className="container-fluid">
            <h1 className="text-center  ">Comptes Famille</h1>
            <Navbar
                token={props.token}
                setPage={props.setPage}
                page={props.page}
            />
        </div>
    );
}
