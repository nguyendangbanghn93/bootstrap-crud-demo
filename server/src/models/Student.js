const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
console.log(validator);
const StudentSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
    },
    email: {
        type: String,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
    },
    phoneNumber: {
        type: String,
        validate: value => {
            const re = /^((09[0-9]{8})|(08([1-9])[0-9]{7})|(01(2|6|8|9)[0-9]{8})|(069[2-9][0-9]{4,5})|(080(4|31|511|8)[0-9]{4})|(0([2-8])[0-9]{1,2}[0-9]{1,3}[0-9]{5}))$/;
            if (!re.test(String(value).toLowerCase())) {
                throw new Error({ error: 'Invalid Phone number' })
            }
        }
    }
})
module.exports = mongoose.model('students', StudentSchema)
