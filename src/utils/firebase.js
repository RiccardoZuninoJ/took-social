// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect} from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc, collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const users_collection = collection(db, "users");
// Managing authentication with Google
const googleAuthProvider = new GoogleAuthProvider();

async function signInWithGoogle() {
  signInWithPopup(auth, googleAuthProvider)
    .then(result => {
      console.log(result);
      const user = result.user;
      // Add user to users collection if not already there
      getDoc(doc(db, "users", user.uid)).then(doc => {
        if (!doc.exists()) {
          setUser(user);
          return;
          
        }
      });
      console.log("User not found. Adding user to users collection");
      
    }).catch(error => {
      console.log(error);
    })

}

function setUser(user){
  setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: new Date(),
    follows: []
  });
}

// Get all the posts of who is followed
async function getPosts(){
  const userData = await getDoc(doc(db, "users", auth.currentUser.uid));
  const follows = userData.data().follows;
  const posts = query(collection(db, "posts"), where("posted_by", "in", follows));
  const postsSnapshot = await getDocs(posts);
  //Add uid to each post
  const postsWithUID = postsSnapshot.docs.map(doc => {
    return {
      ...doc.data(),
      uid: doc.id
    }
  });
  return postsWithUID;
  // Get the users that the current user follows
}

async function getPost(post_id){
  const post = await getDoc(doc(db, "posts", post_id));
  return post.data();
}

async function handleLike(post_id){
  const post = await getDoc(doc(db, "posts", post_id));
  const post_data = post.data();
  const likes = post_data.likes;
  const uid = auth.currentUser.uid;
  if(likes.includes(uid)){
    // Remove like
    const index = likes.indexOf(uid);
    likes.splice(index, 1);
  } else {
    // Add like
    likes.push(uid);
  }
  setDoc(doc(db, "posts", post_id), {
    ...post_data,
    likes: likes
  });
}

async function addPost(text){
  const uid = auth.currentUser.uid;
  const post = {
    text: text,
    posted_by: uid,
    createdAt: new Date(),
    likes: []
  };
  addDoc(collection(db, "posts"), post);
  return post;
}

async function getUserName(uid){
  const user = await getDoc(doc(db, "users", uid));
  return user.data().displayName;
}

async function follow_unfollow(uid){
  const user = await getDoc(doc(db, "users", auth.currentUser.uid));
  const follows = user.data().follows;
  if(follows.includes(uid)){
    // Remove follow
    const index = follows.indexOf(uid);
    follows.splice(index, 1);
  } else {
    // Add follow
    follows.push(uid);
  }
  setDoc(doc(db, "users", auth.currentUser.uid), {
    ...user.data(),
    follows: follows
  });
}

async function getFollows(){
  const user = await getDoc(doc(db, "users", auth.currentUser.uid));
  return user.data().follows;
}

async function getFollowers(){
  //Get all the users who follow the current user
  const followers = query(collection(db, "users"), where("follows", "array-contains", auth.currentUser.uid));
  const followersSnapshot = await getDocs(followers);

  //Make an array of the uids of the followers
  const followersUIDs = followersSnapshot.docs.map(doc => {
    return doc.id;
  }
  );
  return followersUIDs;
}

export { analytics, auth, googleAuthProvider, signInWithGoogle, getPosts, handleLike, 
  getPost, addPost, getUserName, follow_unfollow, getFollows, getFollowers };

