const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

// exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {
//
//     if (authUser.email) {
//         // console.log("123")
//         const customClaims = {
//             admin: true,
//         };
//         try {
//             var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)
//
//             return db.collection("roles").doc(authUser.uid).set({
//                 email: authUser.email,
//                 role: customClaims
//             })
//
//         } catch (error) {
//             console.log(error)
//         }
//
//     }
//
// });

// On sign up.
exports.processSignUp = functions.auth.user().onCreate((user) => {
    // Check if user meets role criteria.
    if (user.email &&
        user.email.startsWith('admin')) {
        const customClaims = {
            admin: true
        };
        // Set custom user claims on this newly created user.
        return admin.auth().setCustomUserClaims(user.uid, customClaims)
            .then(() => {
                // Update real-time database to notify client to force refresh.
                const metadataRef = admin.database().ref("metadata/" + user.uid);
                // Set the refresh time to the current UTC timestamp.
                // This will be captured on the client to force a token refresh.
                return metadataRef.set({refreshTime: new Date().getTime()});
            })
            .catch(error => {
                console.log(error);
            });
    }
});

exports.setUserRole = functions.https.onCall((data) => {

    let customClaims;
    if (data.role === 'productCompany') {
        customClaims = {
            productCompany: true
        };
    }
    if (data.role === 'trailerCompany') {
        customClaims = {
            trailerCompany: true
        };
    }

    // if (!context.auth.token.admin) return
    return admin.auth().setCustomUserClaims(data.uid, customClaims)
        .then(() => {
            const metadataRef = admin.database().ref("metadata/" + data.uid);
            return metadataRef.set({refreshTime: new Date().getTime()});
        })
        .catch(error =>
            console.log(error)
        );
});
