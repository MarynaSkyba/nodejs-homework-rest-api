const {NotFound} = require("http-errors")
const {User} = require("../../models")
const {sendEmail} = require('../../emailTemplate')

const resendEmail = async(req, res) => {
    const {email} = req.body;
    if (!email) {
    res.status(400).json({
        message: "missing required field email"
    })
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new NotFound('User not found')
      }

    if (user.verify){
        res.status(400).json({
         message: "Verification has already been passed"})
    }

    const letter = {
        to: email,
        subject: "Email verification",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verifyToken}">Подтвердить email</a>`
    }
    await sendEmail(letter);
    res.json({
        status: 'success',
        code: 200,
        message: "Verification email sent"
    })
}

module.exports = resendEmail;



// Получает body в формате { email } +
// Если в body нет обязательного поля email, возвращает json с ключом {"message": "missing required field email"} и статусом 400 +
// Если с body все хорошо, выполняем повторную отправку письма с verificationToken на указанный email, но только если пользователь не верифицирован
// Если пользователь уже прошел верификацию отправить json с ключом { message: "Verification has already been passed"} со статусом 400 Bad Request +