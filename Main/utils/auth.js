const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
    console.log("You are not logged in!");
  } else {
    next();
    console.log("You are logged in!");
  }
};

module.exports = withAuth;
