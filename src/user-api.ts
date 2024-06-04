import express from 'express';
import admin from "firebase-admin";
import firebaseConfig from './config/firebase.json';

const router = express.Router();

const app = admin.initializeApp({ credential: admin.credential.cert(firebaseConfig as any) });

router.get<{}, any>('/user', async (req, res) => {
  await app.auth().listUsers()
    .then((listUsersResult) => {
      const data = listUsersResult.users.map(user => ({
        id: user.uid,
        email: user.email,
        createdAt: user.metadata.creationTime,
        lastSignIn: user.metadata.lastSignInTime
      }))
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.json({
        message: 'Some error',
      });
    });

});

router.delete('/user/:id', async (req, res) => {
  const params = req.params as any;
  const userId = params['id'];

  await app.auth().deleteUser(userId)
    .then((data) => {
      res.json({
        status: "success"
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({
        message: 'Some error',
      });
    });

});


export default router;
