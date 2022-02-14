import User from '../models/User.js'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import {verifyTokenAuthorization} from './verifyToken.js'

export const register = async (req, res) => {
    const {
        username,
        firstName,
        lastName,
        phoneNumber,
        email,
        password
    } = req.body
    try {

        const oldUser = await User.findOne({email: email.trim().toLowerCase()});

        if (oldUser) {
            return res.status(500).json("user already exists")
        }
        const instance = new User({
            firstName,
            lastName,
            username,
            email,
            password: CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString(),
            phoneNumber
        })
        const user = await instance.save()
        return res.status(201).json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: 'something went wrong'});
    }

}
export const login = async (req, res) => {
    const {username} = req.body
    try {
        const user = await User.findOne({username: username.trim().toLowerCase()});
        if (! user) {
            return res.status(401).send({error: 'Failed to authenticate user'});
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET).toString(CryptoJS.enc.Utf8);
        hashedPassword != req.body.password && res.status(401).send({error: 'Failed to authenticate user'});

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, {expiresIn: "3d"})

        const {
            password,
            ...other
        } = user._doc
        return res.status(200).json({
            ...other,
            accessToken
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: "something went wrong"})
    }
}


export const update = async (req, res) => {

    try {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString();
        }


        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        return res.status(200).json(updatedUser)
    } catch (err) {

        return res.status(500).send({error: "something went wrong"})
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json("User have been deleted...")
    } catch (err) {

        return res.status(500).send({error: "something went wrong"})
    }
}


export const getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {
            password,
            ...others
        } = user._doc
        return res.status(200).json(others)
    } catch (err) {

        return res.status(500).send({error: "something went wrong"})
    }
}


export const getAllUser = async (req, res) => {
    const query = req.query.new
    try {

        const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find()

        return res.status(200).json(users)
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: "something went wrong"})
    }
}


export const userStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await User.aggregate([{
                $match: {
                    createdAt: {
                        $gte: lastYear
                    }
                }
            },
            {

                $project:{
                    month: {$month: "$createdAt"}
            }

            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ])
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).send({error: "something went wrong"})
    }
}
