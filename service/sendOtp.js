const axios = require('axios');
const sendOtp = async (phone, otp) => {

    //setting state
    let isSent = false;
    //url to send otp
    const url = 'https://api.managepoint.co/api/sms/send'
    //payload to send
    const payload = {
        'apiKey' : '58795032-a303-4f45-a2dd-24a698c3dc65',
        'to': phone,
        'message' : `Your verification code is ${otp}`
    }
    try{
        const response = await axios.post(url, payload);
        if(response.status === 200){
            isSent = true;

        }

    }catch(error){
        console.log('Error Sending OTP',error.message);
    }

    return isSent;

    
}

module.exports = sendOtp;