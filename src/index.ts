// src/index.ts
import { LocalTokenStore } from './tokenStore.js';
import { TuyaContext } from '@tuya/tuya-connector-nodejs';
import express, { Request, Response, Application } from 'express';
// import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto-js';
import cryptokey from 'crypto';
import { userInfo } from 'os';
import { refreshToken } from 'firebase-admin/app';
import path from 'path';

const app: Application = express();
app.use(bodyParser.json());
// const app = express();
// app.use(express.json());
const tuya = new TuyaContext({
  baseUrl: 'https://openapi.tuyain.com',
  accessKey: 'uwynr78ufmer8g3hrqtt',
  secretKey: 'a87fed9ba00343329907d3062d39fa6d',
  store: new LocalTokenStore(),
});

const hashPassword = (password: string): string => {
  return crypto.SHA256(password).toString(crypto.enc.Hex).toLowerCase();
};
// async function createUser(username: string, password: string, countryCode: string) {
//   try {
//     const hashedPassword = hashPassword(password);

//     const response = await tuya.request({
//       method: 'POST',
//       path: '/v1.0/apps/uwynr78ufmer8g3hrqtt/user',
//       body: {
//         username,
//         hashedPassword,
//         country_code: countryCode,
        
//       },
//     });
//     console.log('User created successfully:', response);
//   } catch (error) {
//     console.error('Error creating user:', error);
//   }
// }

// // Example function to demonstrate usage
async function main() {
  try {
    interface LoginResponse {
      uid: string;
      access_token: string;
      refresh_token: string;
      expire: number;
    }
    // const response = await tuya.request({
    //   method: 'GET',
    //   path: '/v1.0/users/in1721895508669UVMNa/infos',
    // });
    // const users = await tuya.user.registerUser({
    //   username:"Test123@gmail.com",
    //   password:"6dc60ead0fc6bbdf0c324de642f6b1bf",
    //   country_code:"91"
    // });
    // console.log("User registered:- ", users)
    // const headers = await tuya.client.init();
    // console.log(headers)
    // async function loginUser(username: string, password: string): Promise<LoginResponse | null> {
    //   try {
    //     const response = await tuya.request({
    //       path: '/v1.0/iot-03/users/login',
    //       method: 'POST',
    //       body: {
    //         username: username,
    //         password: password.toLowerCase()
    //       },
    //     });
    const space_id=157723016;
    const response = await tuya.request({
      path: '/v2.0/cloud/space/157723016/resource',
      method: 'GET',
      
    })
    
    // const headers = await tuya.client.getSignHeaders('/v2.0/cloud/space/creation','POST',{},{name: 'something'});
    //     console.log(headers);
    // const initResponse = await tuya.client.getSignHeaders({});
    // console.log(initResponse)
    // const response2 = await tuya.user.users({page_size:1});
    
    // console.log(response2.result)
    
    //     if (response.success) {
    //       console.log('Login successful:', response.result);
    //       return response.result as LoginResponse;
    //     } else {
    //       console.log('Login failed:', response);
    //       return null;
    //     }
    //   } catch (error) {
    //     console.error('Error logging in:', error);
    //     return null;
    //   }
    // }
    // loginUser('Test123@gmail.com', '73a078ce27ddfa43f8c411428eca2235');
    // const temp = await tuya.user.users({});
    const spaceList = await tuya.request({
      path: `/v2.0/cloud/space/157729975/resource`,
      method: 'GET',
    });
console.log(spaceList)

    // const device = await tuya.device.detail({
    //   device_id: 'vdevo172128314813175'
    // });
    // console.log(response)
    // console.log("HELLO COMING HERE?")
    // console.log(device);
    // await createUser('test@test.com', 'test_123', '91');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();



// import express, { Request, Response } from 'express';
// import bodyParser from 'body-parser';
// import tuya from './tuyaContext'; // Adjust the path as necessary

// const app = express();
// app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Types for request bodies
interface RegisterRequestBody {
  country_code: any;
  username: string;
  password: string;
}

interface SpaceCreationBody {
  name: any
}

interface LoginRequestBody {
  username: string;
  password: string;
}

interface LoginResponse {
  uid: string;
  access_token: string;
  refresh_token: string;
  expire: number;
}

interface PairDeviceRequestBody {
  uid: string;
  deviceDetails: {
    deviceId: string;
    [key: string]: any;
  };
}

interface ControlDeviceRequestBody {
  device_id: string;
  commands: any;
}

interface GrantAccessRequestBody {
  uid: string;
  userDetails: {
    [key: string]: any;
  };
}
interface QrCodeRequestBody{
  qrcode: string;
  space_id: Long;
  time_zone_id: string;
}


// Register a new user
app.post('/api/register', async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
  const { country_code, username, password } = req.body;
  
  try {
    const response = await tuya.user.registerUser({  username, password ,country_code});
    
    if(response.success){
      console.log('Register successful:', response);
      try{
        // const initResponse = await tuya.client.init();
        // const signHeaders = await tuya.client.getSignHeaders('/v2.0/cloud/space/creation','POST',{},{name: username});
        // // console.log(headers);
        // const headers = {
        //   ...signHeaders,
        //   'Content-Type': 'application/json'
        // };
        // const accessToken = headers.access_token;
        // console.log(accessToken);
        const spaceResponse = await tuya.request({
          path:'/v2.0/cloud/space/creation',
          method: 'POST',
          body:{
            name: username
          } 
        });
        console.log("user response:---", response)
        console.log("space response:---", spaceResponse)
        res.status(201).json({
          user: response.result,
          space: spaceResponse.result,
        });
      }catch(error){
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: 'An unknown error occurred' });
        }
      }
    }
   
    
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

app.post('/api/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { username, password } = req.body;
  // const accessToken = req.headers.authorization?.split(' ')[1];
  try {
    const response = await tuya.request({
      path: '/v1.0/iot-03/users/login',
      method: 'POST',
      // headers: {
      //   'Authorization': `Bearer ${accessToken}`,
      //   'Content-Type': 'application/json',
      // },
      body: {
        username: username,
        password: password.toLowerCase(),
      },
    });

    if (response.success) {
      const loginResult = response.result as LoginResponse;
      console.log('Login successful:', loginResult);
      res.status(200).json(response);
    } else {
      console.log('Login failed:', response);
      res.status(401).json({ error: 'Login failed' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});


app.get('/api/token/:refreshToken', async (req:Request<{refreshToken : any}>, res: Response)=>{
  const {refreshToken} = req.params;
  try{
    const response = await tuya.request({
      path:`/v1.0/token/${refreshToken}`,
      method:'GET'
    });
    res.status(200).json(response);
  }catch(error){
    if (error instanceof Error) {
            res.status(500).json({ error: error.message });
          } else {
            res.status(500).json({ error: 'An unknown error occurred' });
          }
  }
})
// Pair a device
// app.post('/api/pair-device', async (req: Request<{}, {}, PairDeviceRequestBody>, res: Response) => {
//   const { uid, deviceDetails } = req.body;
//   try {
//     const response = await tuya.client.({ uid, ...deviceDetails });
//     res.status(201).json(response);
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: 'An unknown error occurred' });
//     }
//   }
// });

// Get paired device details

app.get('/api/device/:deviceId', async (req: Request<{ device_id: string }>, res: Response) => {
  const { device_id } = req.params;
  try {
    const response = await tuya.device.detail({ device_id: device_id});
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

app.get('/api/device/bulk/:deviceIds', async (req: Request<{ deviceIds: string }>, res: Response) => {
  const {deviceIds} = req.params;
  const accessToken = req.headers['authorization']?.split(' ')[1];
  if (!deviceIds) {
    return res.status(400).json({ error: 'Device IDs are required' });
  }

  try {
    // const response = await tuya.get(`${TUYA_API_URL}/v2.0/cloud/thing/batch`, {
    //   params: { device_ids: deviceIds },
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${ACCESS_TOKEN}`
    //   }
    // });
    const response = await tuya.request({
      path:`/v2.0/cloud/thing/batch?device_ids=${deviceIds}`,
      method:'GET',
      // headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${accessToken}`
      //     }
    })
    console.log(response)
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching device details:', error);
    res.status(500).json({ error: 'Failed to fetch device details' });
  }
});

app.get('/api/space/list/:space_ids', async (req: Request<{ space_ids: any }>, res: Response) => {
  const { space_ids } = req.params;
  const num: number = parseInt(space_ids, 10);
  const signHeaders =await  tuya.client.getSignHeaders(`/v2.0/cloud/space/${space_ids}/resource`,'GET',{},{});
  const headers = {
    ...signHeaders,
    'Content-Type': 'application/json'
  };
  console.log(space_ids)
  try {
    const response = await tuya.request({
      path:`/v2.0/cloud/space/${space_ids}/resource`,
      method:'GET',
      // headers:headers
    });
    console.log(response)
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});


app.get('/api/space/:spaceid', async (req: Request<{ space_id: any }>, res: Response) => {
  const { space_id } = req.params;
  const accessToken = req.headers.authorization?.split(' ')[1];
  try {
    const response = await tuya.request({
      path: `/v2.0/cloud/space/${space_id}/resource`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

app.post('/api/pairqrcode', async (req: Request<{}, {}, QrCodeRequestBody>, res: Response) => {
  const { qrcode, space_id,time_zone_id } = req.body;
  const accessToken = req.headers.authorization?.split(' ')[1];
  try {
    const response = await tuya.request({
      path: '/v2.0/cloud/thing/active/qrcode',
      method: 'POST',
      // headers: {
      //   'Authorization': `Bearer ${accessToken}`,
      //   'Content-Type': 'application/json',
      // },
      body: {
        qrcode: qrcode,
        space_id: space_id,
        time_zone_id:time_zone_id
      },
    });

    if (response.success) {
      const loginResult = response.result as LoginResponse;
      console.log('Qr device Connected successful:', loginResult);
      res.status(200).json(loginResult);
    } else {
      console.log('Qr failed:', response);
      res.status(401).json({ error: 'Login failed' });
    }
  } catch (error) {
    console.error('Error Pairing from QR:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// app.post('/api/temppass', async(req: Request<{}>,res:Response)=>{
//   const {deviceId, password, startTime, endTime} = req.body;
//   try {
//     const response = await tuya.request({
//       method: 'POST',
//       path: `/v1.0/devices/${deviceId}/door-lock/temp-password`,
//       body: {
//         password: password,  // Password from request body
//         effective_time: startTime,
//         invalid_time: endTime,
//       },
//     });
//     return response;
//   } catch (error) {
//     console.error('Error creating temporary password:', error);
//     throw error;
//   }
// });
interface TicketResponse {
  result: {
    ticket_id: string;
    ticket_key: string;
    expire_time: number; // Optional if you need it
  };
  success: boolean;
  // t: number; // Optional if you need it
}
app.post('/api/CreateTempPass', async (req: Request, res: Response) => {
  const {
    name,
    deviceId,
    password,
    startTime,  // Start time in minutes
    endTime,    // End time in minutes
    workingDayBinary,
    startTimediff,
    endTimediff
    // ticketId,    // Optional, depending on your implementation
  } = req.body;

  try {
    // Step 1: Obtain ticket_id and ticket_key
    const ticketResponse: TicketResponse = await tuya.request({
      method: 'POST',
      path: `/v1.0/devices/${deviceId}/door-lock/password-ticket`,
    });

    if (!ticketResponse.success) {
      throw new Error('Failed to obtain ticket information');
    }

    const { ticket_id, ticket_key } = ticketResponse.result;
    console.log("TICKET ID:--", ticket_id);
    console.log("TICKET KEY:--", ticket_key);

    // Step 2: Decrypt the ticket_key with the accessKey
    const accessKey = 'a87fed9ba00343329907d3062d39fa6d'; // Replace with your actual accessKey

     // Step 2: Decrypt the ticket_key using AES-128-ECB with accessKey
    //  function decryptTicketKey(ticketKey: string, accessKey: string): string {
    //   console.log("Coming inside decrypt")
    //   const decipher = cryptokey.createDecipheriv('aes-256-ecb', Buffer.from(ticketKey, 'hex'), null);
    //   console.log("DECIPHER:- ", decipher)
    //   decipher.setAutoPadding(true);
    //   console.log(decipher)
    //   let decrypted = decipher.update(accessKey, 'hex', 'utf-8');
    //   console.log("Decrypteddddd:-- ", decrypted)
    //   decrypted += decipher.final('utf-8');
    //   console.log("FINAL DECRYPTED:--- ",decrypted)
    //   return decrypted.toString();
    // }
    // function decryptTicketKey(ticketKey: string, clientSecret: string) {
    //   console.log("Coming inside decrypt")
    //   const key = crypto.enc.Utf8.parse(clientSecret);
    //   console.log("KEY IS THIS:-- ", key)
    // const decrypted = crypto.AES.decrypt(ticketKey, key, {
    //     mode: crypto.mode.ECB,
    //     padding: crypto.pad.Pkcs7,
    // });
    // console.log("DECRYPTEDDDDDD:-- ",decrypted)
    // return decrypted.toString(crypto.enc.Utf8); 
    // }
    function decrypt_AES_128(data: string, secretKey: string) {
      console.log("First")
      const key = crypto.enc.Utf8.parse(secretKey);
      console.log("Second:- ",key)
      const encryptedHexStr = crypto.enc.Hex.parse(data);
      console.log("Third:- ", encryptedHexStr)
      const encryptedBase64Str = crypto.enc.Base64.stringify(encryptedHexStr);
      console.log("Fourth:- ", encryptedBase64Str)
      const decryptedData = crypto.AES.decrypt(encryptedBase64Str, key, {
          mode: crypto.mode.ECB,
          padding: crypto.pad.Pkcs7,
      });
      const finaldec = crypto.enc.Utf8.stringify(decryptedData)
      console.log("Decrp:- ",finaldec)
      return finaldec;
    }

    const originalKey = decrypt_AES_128(ticket_key, accessKey);
    console.log("Original key:- ", originalKey)
    // Step 3: Encrypt the password using the original key
    // function encryptPassword(password: string, key: string) {
    //   const cipher = cryptokey.createCipheriv('aes-128-ecb', Buffer.from(key, 'hex'), null); // Key in hex
    //   cipher.setAutoPadding(true);  
    //   let encrypted = cipher.update(password, 'utf8', 'base64');
    //   encrypted += cipher.final('base64');
    //   return encrypted;
    // }
    function encrypt_AES_128(data: string, secretKey: string) {
      const key = crypto.enc.Utf8.parse(secretKey);
      const encrypted = crypto.AES.encrypt(data, key, {
          mode: crypto.mode.ECB,
          padding: crypto.pad.Pkcs7,
      });
      return encrypted.ciphertext.toString(crypto.enc.Hex);
  }
  

    const encryptedPassword = encrypt_AES_128(password, originalKey);
    console.log("Encrypted:- ", encryptedPassword)
    // Convert workingDays array to binary representation
    // const workingDayBinary = workingDays.reduce((acc, day) => acc | (1 << (day - 1)), 0);

    // Convert startTime and endTime from minutes to UNIX timestamp
    // const now = new Date().getTime() / 1000; // Current UNIX timestamp in seconds
    // const effectiveTime = now + startTime * 60; // Adding minutes to current time
    // const invalidTime = now + endTime * 60; // Adding minutes to current time
  
    const response = await tuya.request({
      method: 'POST',
      path: `/v1.0/devices/${deviceId}/door-lock/temp-password`,
      body: {
        name:name,
        password: encryptedPassword,  // Password from request body
        password_type: 'ticket',  // Assuming this is always 'ticket'
        ticket_id: ticket_id,  // Optional, if applicable
        effective_time: startTime,
        invalid_time: endTime,
        // phone: phone, // Optional, if applicable
        // time_zone: "", // Optional, if applicable
        schedule_list: [
          {
            effective_time: startTimediff, // Effective time in minutes
            invalid_time: endTimediff, // End time in minutes
            working_day: workingDayBinary // Working days in binary format
          }
        ]
      },
    });
    console.log("CREATE TEMP PASS:---", response)
    res.json(response);
  } catch (error) {
    console.error('Error creating temporary password:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/get-temp-passwords', async (req: Request, res: Response) => {
  const { deviceId } = req.query;
  const valid = 'true'; // Convert 'valid' query parameter to boolean

  if (!deviceId) {
    return res.status(400).send('Device ID is required');
  }

  try {
    // Fetch temporary passwords
    const response = await tuya.request({
      method: 'GET',
      path: `/v1.0/devices/${deviceId}/door-lock/temp-passwords`,
      query: { valid: valid.toString() }, // Convert boolean to string for query parameter
    });

    if (response.success) {
      res.json(response.result);
    } else {
      res.status(500).send('Failed to fetch temporary passwords');
    }
  } catch (error) {
    console.error('Error fetching temporary passwords:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/createspace', async (req: Request<{},{},SpaceCreationBody>, res: Response) => {
  const { name } = req.body;
  
  try {
    const response = await tuya.request({
      path:'/v2.0/cloud/space/creation',
      method: 'POST',
      body:{
        name: name
      } 
    });
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

app.get('/api/startdiscover', async(req: Request<{ }>, res: Response)=>{
  try {
    // const response = 
    // const response = await tuya.deviceRegistration.discover({
      
    // });
    // const response = await tuya.deviceRegistration.stopDiscover;
    // const response = await tuya.deviceRegistration.subDevice;
    // const response = await tuya.deviceRegistration.token;
    // res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

app.get('/api/stopdiscover', async(req: Request<{ }>, res: Response)=>{
  try {
    const response = await tuya.deviceRegistration.stopDiscover;
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});


// Control a paired device
app.post('/api/control-device', async (req: Request<{}, {}, ControlDeviceRequestBody>, res: Response) => {
  const { device_id, commands } = req.body;
  try {
    const response = await tuya.deviceFunction.command({ device_id, commands });
    res.status(200).json(response);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// Grant access to other users
// app.post('/api/grant-access', async (req: Request<{}, {}, GrantAccessRequestBody>, res: Response) => {
//   const { uid, userDetails } = req.body;
//   try {
//     const response = await tuya.assets.({ uid, ...userDetails });
//     res.status(201).json(response);
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: 'An unknown error occurred' });
//     }
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});










