module.exports.setFlash = function(request , response , next){
    response.locals.flash = {
        "success" : request.flash("success"),
        "error" : request.flash("error")
    }
    console.log(response.locals.flash)
    next();
}