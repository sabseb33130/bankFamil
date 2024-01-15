export default function EditUser(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const updated = (e: React.BaseSyntheticEvent) => {
        props.setPage('update');
    };

    return (
        <div>
            <button
                className="btn btn-primary  rounded-pill border border-2 border-dark"
                onClick={(e) => updated(e)}
                type="button"
            >
                Modifier
            </button>
        </div>
    );
}
