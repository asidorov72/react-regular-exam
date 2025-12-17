const formatDate = (ms) =>
    `${new Date(ms).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })}`;

export default formatDate;