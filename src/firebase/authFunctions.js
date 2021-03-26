import Firebase from './firebase';

class AuthFunctions extends Firebase {
    signUp(firstname, lastname, email, password) {
        // Create a user on firebase
        this.auth.createUserWithEmailAndPassword(email, password)
        // Write the user's information into the database
            .then((userCred) => {
                this.writeDatabase(userCred.user.uid, {
                    name: {
                        first: firstname,
                        last: lastname
                    },
                    email: email,
                    profile_pic: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
                    posts: {},
                    following: {
                        [userCred.user.uid]: 0
                    }
                });
            })
            // Catch any errors thrown by firebase
            .catch(this.debugError);
    }

    logIn(email, password) {
        // Log user into firebase
        this.auth.signInWithEmailAndPassword(email, password)
            // Catch any errors thrown
            .catch(this.debugError);
    }

    logOut(callback) {
        this.auth.signOut()
            .then(callback)
            .catch(this.debugError)
    }
}

const authFunctions = new AuthFunctions()
export default authFunctions;