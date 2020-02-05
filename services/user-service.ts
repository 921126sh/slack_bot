import { userModel } from "../query/user-query";

export function getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
        userModel.getAllUser().then((data: any) => {
            resolve(data);
        }).catch((err: any) => {
            reject(err);
        })
    });
}

export function getUserById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
        userModel.getUserById(id).then((data: any) => {
            resolve(data);
        }).catch((err: any) => {
            reject(err);
        })
    });
}


