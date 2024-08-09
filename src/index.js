// src/index.ts
import { LocalTokenStore } from './tokenStore.js';
import { TuyaContext } from '@tuya/tuya-connector-nodejs';
import express from 'express';
import crypto from 'crypto-js';
const app = express();
app.use(express.json());
const tuya = new TuyaContext({
    baseUrl: 'https://openapi.tuyain.com',
    accessKey: 'uwynr78ufmer8g3hrqtt',
    secretKey: 'a87fed9ba00343329907d3062d39fa6d',
    store: new LocalTokenStore(),
});
const hashPassword = (password) => {
    return crypto.SHA256(password).toString(crypto.enc.Hex).toLowerCase();
};
async function createUser(username, password, countryCode) {
    try {
        const hashedPassword = hashPassword(password);
        const response = await tuya.request({
            method: 'POST',
            path: '/v1.0/apps/uwynr78ufmer8g3hrqtt/user',
            body: {
                username,
                hashedPassword,
                country_code: countryCode,
            },
        });
        console.log('User created successfully:', response);
    }
    catch (error) {
        console.error('Error creating user:', error);
    }
}
// Example function to demonstrate usage
async function main() {
    try {
        // const response = await tuya.request({
        //   method: 'GET',
        //   path: '/v1.0/users/in1721895508669UVMNa/infos',
        // });
        const users = await tuya.user.registerUser({
            username: "Test123@gmail.com",
            password: "73a078ce27ddfa43f8c411428eca2235",
            country_code: "91"
        });
        console.log("User registered:- ", users);
        // const device = await tuya.device.detail({
        //   device_id: 'vdevo172128314813175'
        // });
        // console.log(response)
        // console.log("HELLO COMING HERE?")
        // console.log(device);
        // await createUser('test@test.com', 'test_123', '91');
    }
    catch (error) {
        console.error('Error:', error);
    }
}
main();
// import express from 'express';
// import { TuyaContext } from '@tuya/tuya-connector-nodejs';
// import admin from 'firebase-admin';
// import { LocalTokenStore } from './tokenStore.js';
// import { handleError } from './errorHandler.js';
// import { handleDeviceIds } from './utils.js';
// import CryptoJS from 'crypto-js';
// const Long =  import('long');
// const app = express();
// app.use(express.json());
// // Initialize Firebase
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });
// const db = admin.firestore();
// // Tuya API Configuration
// const tuya = new TuyaContext({
//   baseUrl: 'https://openapi.tuyain.com',
//   accessKey: 'uwynr78ufmer8g3hrqtt',
//   secretKey: 'a87fed9ba00343329907d3062d39fa6d',
//   store: new LocalTokenStore(),
//   // projectId: 'p172188997483774vqsn',
//   // env: 'prod', // or 'test'
// });
// const hashPassword = (password: string): string => {
//   return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex).toLowerCase();
// };
// async function createUser(username: string, password: string, countryCode: string) {
//   try {
//     const hashedPassword = hashPassword(password);
//     const response = await tuya.request({
//       method: 'POST',
//       path: `/v1.0/apps/uwynr78ufmer8g3hrqtt/user/register`, // Replace `your_app_id` with your actual appId
//       body: {
//         username,
//         password: hashedPassword,
//         country_code: countryCode,
//       },
//     });
//     if (response.success) {
//       console.log('User created successfully:', response);
//     } else {
//       console.log('Failed to create user:', response);
//     }
//   } catch (error) {
//     console.error('Error creating user:', error);
//   }
// }
// // Example usage
// createUser('prathamupadhyay.imscit19@gmail.com', 'TestPassword#123', '91'); 
// API to pair device by scanning QR code
// app.post('/pair-device', async (req, res) => {
//   const { qrCode } = req.body;
//   try {
//     const response = await tuya.request({
//       method: 'POST',
//       path: '/v2.0/cloud/thing/active/qrcode',
//       body: { qrcode: qrCode },
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to get QR result
// app.get('/qr-result/:token', async (req, res) => {
//   const { token } = req.params;
//   try {
//     const response = await tuya.request({
//       method: 'GET',
//       path: `/v2.0/cloud/thing/active/token/${token}`,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to query device details in bulk
// app.get('/device-details-bulk', async (req, res) => {
//   const { deviceIds } = req.query;
//   try {
//     const deviceIdsString = handleDeviceIds(deviceIds);
//     const response = await tuya.request({
//       method: 'GET',
//       path: '/v2.0/cloud/thing/batch',
//       query: { device_ids: deviceIdsString },
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to query device detail
// app.get('/device-detail/:deviceId', async (req, res) => {
//   const { deviceId } = req.params;
//   try {
//     const response = await tuya.request({
//       method: 'GET',
//       path: `/v2.0/cloud/thing/${deviceId}`,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to send actions to device
// app.post('/device-actions/:deviceId', async (req, res) => {
//   const { deviceId } = req.params;
//   const actions = req.body;
//   try {
//     const response = await tuya.request({
//       method: 'POST',
//       path: `/v2.0/cloud/thing/${deviceId}/shadow/actions`,
//       body: actions,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to get device detail
// app.get('/device-detail-v1/:deviceId', async (req, res) => {
//   const { deviceId } = req.params;
//   try {
//     const response = await tuya.request({
//       method: 'GET',
//       path: `/v1.0/devices/${deviceId}`,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to get device status
// app.get('/device-status/:deviceId', async (req, res) => {
//   const { deviceId } = req.params;
//   try {
//     const response = await tuya.request({
//       method: 'GET',
//       path: `/v1.0/devices/${deviceId}/status`,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to add device member
// app.post('/add-device-member', async (req, res) => {
//   const { deviceId, userId } = req.body;
//   try {
//     const response = await tuya.request({
//       method: 'POST',
//       path: `/v1.0/devices/${deviceId}/user`,
//       body: { user_id: userId },
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to get member list by device id
// app.get('/member-list/:deviceId', async (req, res) => {
//   const { deviceId } = req.params;
//   try {
//     const response = await tuya.request({
//       method: 'GET',
//       path: `/v1.0/devices/${deviceId}/users`,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to control device
// app.post('/control-device/:deviceId', async (req, res) => {
//   const { deviceId } = req.params;
//   const commands = req.body;
//   try {
//     const response = await tuya.request({
//       method: 'POST',
//       path: `/v1.0/devices/${deviceId}/commands`,
//       body: commands,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to assign the smart lock password to device member
// app.post('/assign-password', async (req, res) => {
//   const { deviceId, userId, password } = req.body;
//   try {
//     const response = await tuya.request({
//       method: 'POST',
//       path: `/v1.0/devices/${deviceId}/device-lock/users/${userId}/allocate`,
//       body: { password },
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API for remote unlocking with password
// app.post('/remote-unlock', async (req, res) => {
//   const { deviceId, password } = req.body;
//   try {
//     const response = await tuya.request({
//       method: 'POST',
//       path: `/v1.0/devices/${deviceId}/door-lock/open-door`,
//       body: { password },
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to delete temporary password
// app.delete('/delete-temp-password/:deviceId/:passwordId', async (req, res) => {
//   const { deviceId, passwordId } = req.params;
//   try {
//     const response = await tuya.request({
//       method: 'DELETE',
//       path: `/v1.0/devices/${deviceId}/door-lock/temp-passwords/${passwordId}`,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to generate offline temporary password
// app.post('/generate-offline-password', async (req, res) => {
//   const { deviceId, options } = req.body;
//   try {
//     const response = await tuya.request({
//       method: 'POST',
//       path: `/v1.1/devices/${deviceId}/door-lock/offline-temp-password`,
//       body: options,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to get devices linked with user account
// app.get('/linked-devices/:uid', async (req, res) => {
//   const { uid } = req.params;
//   try {
//     const response = await tuya.request({
//       method: 'GET',
//       path: `/v1.0/smart-lock/users/${uid}/devices`,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to create temporary password
// app.post('/create-temp-password', async (req, res) => {
//   const { deviceId, password } = req.body;
//   try {
//     const response = await tuya.request({
//       method: 'POST',
//       path: `/v1.0/smart-lock/device/${deviceId}/template/temp-password`,
//       body: { password },
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to delete temporary password
// app.delete('/delete-temp-password/:deviceId/:passwordId', async (req, res) => {
//   const { deviceId, passwordId } = req.params;
//   try {
//     const response = await tuya.request({
//       method: 'DELETE',
//       path: `/v1.0/devices/${deviceId}/door-lock/template/temp-password/${passwordId}`,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to get details of temporary password
// app.get('/temp-password-details/:deviceId/:passwordId', async (req, res) => {
//   const { deviceId, passwordId } = req.params;
//   try {
//     const response = await tuya.request({
//       method: 'GET',
//       path: `/v1.0/devices/${deviceId}/door-lock/template/temp-password/${passwordId}`,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// // API to query device member
// app.get('/query-device-member/:deviceId/:userId', async (req, res) => {
//   const { deviceId, userId } = req.params;
//   try {
//     const response = await tuya.request({
//       method: 'GET',
//       path: `/v1.0/devices/${deviceId}/users/${userId}`,
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).send(handleError(error));
//   }
// });
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
