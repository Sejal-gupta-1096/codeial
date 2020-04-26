module.exports.home = function(request , response){
    console.log(request.cookies);
    response.cookie("user_id" , 19);
        return response.render("home" , {
        title:"Codeial | Home"
    });
}