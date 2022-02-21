export const trending = (req, res) => {
    const videos = [
        {
            title: "First Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes age",
            views: 59,
            id: 1
        },
        {
            title: "Second Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes age",
            views: 59,
            id: 1
        },
        {
            title: "Third Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes age",
            views: 59,
            id: 1
        },
    ];
    return res.render("home", { pageTitle: "Home", videos });
};
export const see = (req, res) => {
    return res.render("watch", { pageTitle: "Watch" });
};
export const edit = (req, res) => {
    console.log(req.paras);
    res.send("Edit");
}
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");