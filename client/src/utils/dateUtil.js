const formatDate = (ms) =>
    `on ${new Date(ms).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })}`;

export default formatDate;