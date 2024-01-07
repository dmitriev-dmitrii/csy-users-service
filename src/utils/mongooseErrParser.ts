 export const mongooseValidationErrorsParser = (err:any) => {
        return  Object.entries(err).reduce((acc,item)=> {
                // @ts-ignore
                // TODO разобраться с ts ignore
                acc[item[0]] = item[1].message
                return acc
        },{})
}

 // export const mongooseUniqIndexErrorsParser = (err:any) => {

 //        const { keyValue } = err
 //        return    Object.entries(keyValue).reduce((acc,item)=> {
 //            // @ts-ignore
 //                 acc[item[0]] = `${ item[1]} - is already taken`
 //                 return acc
 //         },{})
 // }