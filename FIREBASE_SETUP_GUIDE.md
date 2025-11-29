# 🔥 Firebase Setup Guide for HostelCare

This is a **step-by-step guide** to setup Firebase for your HostelCare app. Follow each step carefully!

---

## 📋 What We'll Setup:

1. **Firebase Project** - Create a new Firebase project
2. **Firebase Authentication** - For user login/signup
3. **Firestore Database** - To store complaints, users, and data
4. **Firebase Storage** (Optional) - To store complaint images

---

## 🚀 STEP 1: Create Firebase Project

### 1.1 Go to Firebase Console
- Open your browser and go to: [https://console.firebase.google.com/](https://console.firebase.google.com/)
- Sign in with your Google account

### 1.2 Create New Project
1. Click **"Add project"** or **"Create a project"**
2. Enter project name: **`HostelCare`** (or any name you like)
3. Click **Continue**
4. **Google Analytics**: You can disable it for now (not needed)
5. Click **Create project**
6. Wait for the project to be created (takes ~30 seconds)
7. Click **Continue** when done

✅ **Checkpoint**: You should now see your Firebase project dashboard!

---

## 🚀 STEP 2: Register Your App with Firebase

### 2.1 Add Web App
1. In the Firebase console, you'll see: **Get started by adding Firebase to your app**
2. Click the **Web icon** `</>` (it looks like this: `</>`
3. Enter app nickname: **`HostelCare App`**
4. **Do NOT check** "Also set up Firebase Hosting"
5. Click **Register app**

### 2.2 Copy Your Firebase Config
You'll see a code snippet that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "hostelcare-xxxxx.firebaseapp.com",
  projectId: "hostelcare-xxxxx",
  storageBucket: "hostelcare-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxxxxx"
};
```

📝 **IMPORTANT**: Keep this window open or copy this config somewhere safe. We'll need it soon!

6. Click **Continue to console**

✅ **Checkpoint**: You now have your Firebase config values!

---

## 🚀 STEP 3: Enable Authentication

### 3.1 Setup Email/Password Authentication
1. In the Firebase console, click **"Authentication"** in the left sidebar (under "Build")
2. Click **"Get started"**
3. Click on **"Sign-in method"** tab
4. Click on **"Email/Password"** in the providers list
5. Toggle **"Enable"** to ON (make sure the switch is blue)
6. Click **"Save"**

✅ **Checkpoint**: Email/Password authentication is now enabled!

---

## 🚀 STEP 4: Setup Firestore Database

### 4.1 Create Firestore Database
1. In the Firebase console, click **"Firestore Database"** in the left sidebar (under "Build")
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
   - This allows read/write access for 30 days
   - We'll secure it later
4. Click **"Next"**
5. Choose location: Select the closest region to you (e.g., "us-central" for USA, "asia-south1" for India)
6. Click **"Enable"**
7. Wait for the database to be created

### 4.2 Database Structure (We'll Create Later)
We'll create these collections:
- `users` - Store user profiles
- `complaints` - Store all complaints

✅ **Checkpoint**: Firestore Database is ready!

---

## 🚀 STEP 5: Install Firebase in Your React Native App

### 5.1 Install Firebase Package
Open your terminal in the project directory and run:

```bash
npm install firebase
```

This will install the Firebase SDK for your app.

✅ **Checkpoint**: Firebase package installed!

---

## 🚀 STEP 6: Configure Firebase in Your App

### 6.1 Update firebaseConfig.js
1. Open the file: `hostel-care-app/src/services/firebaseConfig.js`
2. Paste your Firebase config (from STEP 2.2)
3. The file should look like the template provided

### 6.2 Your Config Values
Replace these placeholders with YOUR values from STEP 2.2:

```javascript
apiKey: "YOUR_API_KEY_HERE"              // From Firebase Console
authDomain: "YOUR_AUTH_DOMAIN_HERE"      // From Firebase Console
projectId: "YOUR_PROJECT_ID_HERE"        // From Firebase Console
storageBucket: "YOUR_STORAGE_BUCKET"     // From Firebase Console
messagingSenderId: "YOUR_SENDER_ID"      // From Firebase Console
appId: "YOUR_APP_ID_HERE"                // From Firebase Console
```

✅ **Checkpoint**: Firebase is configured in your app!

---

## 🚀 STEP 7: Test Firebase Connection

After we update the Login and Signup screens to use Firebase, you can test:

1. Run your app: `npm start`
2. Try to sign up a new user
3. Check Firebase Console → Authentication → Users
4. You should see the new user there!

---

## 🎯 Summary Checklist

Before proceeding, make sure you've completed:

- [x] Created Firebase project
- [x] Registered web app and got config
- [x] Enabled Email/Password authentication
- [x] Created Firestore database in test mode
- [x] Installed `firebase` package
- [x] Updated `firebaseConfig.js` with your values

---

## 🔐 Security Rules (To Add Later)

After testing, we'll update Firestore rules to:
- Students can only read/write their own complaints
- Wardens can read/write all complaints
- Users can only read/write their own profile

---

## 📞 Next Steps

Once Firebase is setup, I'll help you:
1. ✅ Update LoginScreen.js to use Firebase Auth
2. ✅ Update SignupScreen.js to use Firebase Auth
3. ✅ Create Firestore database structure
4. ✅ Add functions to create/read/update complaints

---

## 💡 Helpful Links

- **Firebase Console**: https://console.firebase.google.com/
- **Firebase Docs**: https://firebase.google.com/docs
- **Firestore Docs**: https://firebase.google.com/docs/firestore

---

**Ready to proceed?** Let me know when you've completed steps 1-5, and I'll help you configure the app!
