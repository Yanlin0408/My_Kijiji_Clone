module.exports = (req, res, next) => {
    if (!req.user) {
    //   return res.status(401).send({ error: " ------ you must login!" });
    res.redirect("https://www.google.com")
    // res.send({redirectUrl:'/yo'});
    //   res.redirect('/login');
    }
    next();
  };