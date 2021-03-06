

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { toast } from 'react-toastify';


const firebaseConfig = {
  apiKey: "AIzaSyBZ3TAxNccHqH2dTABZKNYjVnHUd_pfbZI",
  authDomain: "care-humanity-604c2.firebaseapp.com",
  projectId: "care-humanity-604c2",
  storageBucket: "care-humanity-604c2.appspot.com",
  messagingSenderId: "391985428107",
  appId: "1:391985428107:web:0074a6ffdc2abd4988068e"
};

const app = firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore()

const auth = app.auth();
const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    toast.error(err.message)
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    toast.success("Log in successfully")

  } catch (err) {
    if (err.message === "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).")
      toast.error("Password is incorrect")

  }
};

const registerWithEmailAndPassword = async (name, email, phone, userType, password, registered) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      email,
      phone,
      userType,
      password,
      registered

    });
    toast.success("Your account has been created successfully")
  } catch (err) {
    if (err.message === "Firebase: The email address is already in use by another account. (auth/email-already-in-use).") {
      toast.warn("The email address is already in use by another account.")
    }
    else if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
      toast.warn("Password should be at least 6 characters.")

    }
  }
};

const logout = () => {
  auth.signOut();
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    toast.success("Password reset link is sent on your email address")
  } catch (err) {
    toast.warn(err.message)
  }
};

const NonRegisterDonor = async (name, email, phone, payment, amount, donationType, userType, registered) => {
  try {
    await db.collection("users").add({
      name, email, phone, payment, amount, donationType, userType, registered

    });
    toast.success("Your record has been submitted successfully")
  } catch (err) {

    toast.warn(err.message)


  }
};

const RegisterDonor = async (email, name, payment, amount, donationType) => {
  try {
    await db.collection("donor").add({
      email, name, payment, amount, donationType

    });
    toast.success("Your record has been submitted successfully")
  } catch (err) {

    toast.warn(err.message)
  }
};

const RegistredSeeker = async (seekerName, seekerEmail, seekerPhone, seekerMessage) => {
  try {
    await db.collection("seeker").add({
      seekerName, seekerEmail, seekerPhone, seekerMessage

    });
    toast.success("Your record has been submitted successfully")
  } catch (err) {
    toast.warn(err.message)
  }
};







export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  NonRegisterDonor,
  RegisterDonor,
  RegistredSeeker
};

