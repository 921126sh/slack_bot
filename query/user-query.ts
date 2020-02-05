import db from "../config/database";
import { connectionRelease } from "../config/db-function";

function getAllUser(): Promise<any> {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM test`, (error: any, rows: any, fields: any) => {
            // db.query(`CALL get_user()`, (error: any, rows: any, fields: any) => {
            if (!!error) {
                connectionRelease;
                reject(error);
            } else {
                connectionRelease;
                resolve(rows);
            }
        });
    });
}

function getUserById(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM test WHERE id =" + id.id, (error: any, rows: any, fields: any) => {
            if (!!error) {
                connectionRelease;
                reject(error);
            } else {
                connectionRelease;
                resolve(rows);
            }
        });
    });
}

export const userModel = {
    getAllUser,
    getUserById
}