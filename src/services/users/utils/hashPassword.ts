import {hash,genSalt} from 'bcrypt'
export default async (password : string):Promise<string> => {
  const salt = await genSalt(10)
  return   hash(password,salt)
}