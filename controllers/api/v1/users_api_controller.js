const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(request , response){
    try{
        let user = await User.findOne({email : request.body.email});

        if(!user || user.password != request.body.password){
            return response.json(422 , {
                message : 'Invalid username or password'
            })
        }

        return response.json(200 , {
            message : 'Signes in successfully ! Here is your token',
            data : {
                token : jwt.sign(user.toJSON() , 'codeial' , {expiresIn : '100000'})
            }
        })
    }catch(error){
        return response.json(500 , {
            message : 'Internal Server Error'
        })
    }
}