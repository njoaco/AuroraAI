import axios from "axios";
import { apiKey } from "../api/index";
import axiosRetry from 'axios-retry';

//LA APIKEY NO ESTÁ PUBLICA EN GITHUB

const client = axios.create({
    headers: {
        "Authorization": "Bearer " +apiKey,
        "content-type": "application/json"
    }
})

axiosRetry(client, { retries: 3 });

const ChatGptEndPoint = 'https://api.openai.com/v1/chat/completions';
const dalleEndPoint = 'https://api.openai.com/v1/images/generations';

const keywords = ['imagen', 'arte', 'dibujo', 'pintura', 'ilustración', 'image', 'picture', 'drawing', 'painting', 'art'];

export const apiCall = async(prompt, messages) => {
    try{
        let isArt = keywords.some(keyword => prompt.toLowerCase().includes(keyword));
        if(isArt){
            console.log('dalle api call');
            return dalleApiCall(prompt, messages || []);
        
        }else{
            console.log('chat gpt api call');
            return chatgptApiCall(prompt, messages || []);
        }

    }catch(err){
        console.log('error: ', err);
        return Promise.resolve({success: false, msg: err.message});
    }
}

const chatgptApiCall = async (prompt, messages) => {
    try{
        const res = await client.post(ChatGptEndPoint, {
            model: 'gpt-3.5-turbo',
            messages
        });

        let answer = res.data?.choices[0]?.message?.content;
        messages.push({role: 'assistant', content: answer.trim()});
        return Promise.resolve({success: true, data: messages});
    }catch(err){
        console.log('error: ', err);
        return Promise.resolve({success: false, msg: err.message});
    }
}

const dalleApiCall = async (prompt, messages) => {
    try {
        const res = await client.post(dalleEndPoint, {
            prompt,
            n: 1,
            size: "512x512"
        });
        
        let url = res?.data?.data[0]?.url;

        console.log('got url of the image: ', url);
        messages.push({role: 'assistant', content: url});
        return Promise.resolve({success: true, data: messages});

    }catch(err){
        console.log('error: ', err);
        return Promise.resolve({success: false, msg: err.message});
    }
}
