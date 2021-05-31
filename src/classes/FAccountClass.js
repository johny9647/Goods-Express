import { AUTH }     from "../boot/firebase";
import DB_USER      from "../models/DB_USER";

export default class AccountClass
{
    constructor()
    {
    }
    monitorAuthSignedIn()
    {
        console.log("Account Has Been Signed In");
    }
    monitorAuthSignedOut()
    {
        console.log("Account Has Been Signed Out");
    }
    async signIn(email, password)
    {
        return new Promise(async (resolve, reject) =>
        {
            await AUTH.signInWithEmailAndPassword(email, password).then((res) =>
            {
                resolve({ uid: res.user.uid, refreshToken: res.user.refreshToken });
            }).catch((err) =>
            {
                switch (err.code)
                {
                    case "auth/invalid-email": reject("The e-mail you are trying to use is invalid.");  break;
                    case "auth/wrong-password": reject("You are using and invalid email or password."); break;
                    case "auth/user-not-found": reject("You are using and invalid email or password."); break;
                    case "auth/too-many-requests": reject("Your login has been blocked."); break;
                    default: reject(err.code);
                }
            });
        });
    }
    async signOut()
    {
        AUTH.signOut();
    }
}