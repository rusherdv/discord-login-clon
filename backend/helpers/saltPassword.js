import bcrypt from 'bcrypt'

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash(password, salt)
    return newPassword
}

const checkPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

export {hashPassword, checkPassword}