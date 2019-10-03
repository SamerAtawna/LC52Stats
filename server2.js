const {Firestore} = require('@google-cloud/firestore');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();


let db = admin.database()
// Create a new client
var ref = db.ref("server/saving-data/fireblog");
var usersRef = ref.child("users");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});



