
import db from "./database";

export function connectionCheck() {
  return new Promise((resolve, reject) => {
    db.getConnection((err: any, connection: any) => {
      if (err) {
        if (connection) connection.release();
        reject(err)
      } else {
        resolve('success')
      }
    })
  })
}

export function connectionRelease() {
  db.on('release', (connection: any) => {
    console.log('Connection %d released', connection.threadId);
  });
}
