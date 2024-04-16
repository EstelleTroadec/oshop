const adminController = {
    index: async (req, res) => {
        res.render('dashboard/dashboard');
    },
};

module.exports = adminController;
