//add withauth middleware
const withAuth = (req, res, next) => {
    // Check if the user is logged in
    if (!req.session.logged_in) {
      //  redirect to the login route if logged in
      res.redirect('/login');
    } else {
      // If the user is logged in, proceed to the next middleware or route handler
      next();
    }
  };
  
  module.exports = withAuth;
  