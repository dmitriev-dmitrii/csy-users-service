import {hash,genSalt,compare} from 'bcrypt'
export const hashPassword =  async (password : string):Promise<string> => {
  const salt = await genSalt(10)
  return   hash(password,salt)
}

export const comparePasswords =  async (plaintPassword ='',hashedPassword = ''):Promise<boolean> => {

  return   compare(plaintPassword,hashedPassword)
}