// Change password
// Delete account
// Change units (lbs or kgs)

const Account = (props) => {
    const handleClose = (event) => {
        props.setAccountIsOpen(false);
    };

    return (
        <div className="accountPanel">
            <div className="accountHeader">
                <h2>My Account</h2>
                <p className="closeAccountPanel" onClick={handleClose}>X</p>
            </div>
            <div className="accountContent">
                <div className="accountItem">
                    <h3>Change password</h3>
                </div>
                <div className="accountItem">
                    <h3>Change units</h3>
                </div>
                <div className="accountItem">
                    <h3>Delete account</h3>
                </div>
            </div>
        </div>
    );
};

export default Account;