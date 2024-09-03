const Card = ({ children}: { children: React.ReactNode }) => {
    const cardStyle = {
        // padding: "100px",
        border: "1px grey solid",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
        height: "70vh"
    }

    return <div style={cardStyle}>{children}</div>
};

export default Card;