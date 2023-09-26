 export const mongooseValidationErrorsParser = (err:any) => {
        return  Object.entries(err).reduce((acc,item)=> {
                // @ts-ignore
                acc[item[0]] = item[1].message
                return acc
        },{})
}


 // export const mongooseUniqIndexErrorsParser = (err:any) => {

 // TODO сейчас сделано на mongoose-unique-validator - выпилить его
 // uniqueValidator вызываеться в модели

 //        const { keyValue } = err
 //        return    Object.entries(keyValue).reduce((acc,item)=> {
 //            // @ts-ignore
 //                 acc[item[0]] = `${ item[1]} - is already taken`
 //                 return acc
 //         },{})
 // }