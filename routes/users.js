const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

//=================================
//             User
//=================================


router.post("/register", (req, res) => {

    const user = new User(req.body);
    const {phone, email, password, name} = user;
    if(phone && email && password && name) {
        user.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        });
    } else {
        return res.json({
            success : false,
            message : '정보를 입력해야 로그인을 할 수 있습니다.'
        })
    }
});


router.post('/login', (req, res) => {// login function 
	User.findOne({email: req.body.email}, (err, user) => {
		if(!user) return res.json({
			loginSuccess: false,
			message: '로그인에 실패했습니다. 이메일을 찾을 수 없습니다.'
		});
		
		user.comparePassword(req.body.password, (err, isMatch) => {
			if(!isMatch) return res.json({ loginSuccess: false, message: "Wrong password" })
			
			user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
				
                res.cookie("w_authExp", user.tokenExp);
                res 
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id, Token:user.token
                    });
            });
        });
    });
});

module.exports = router;