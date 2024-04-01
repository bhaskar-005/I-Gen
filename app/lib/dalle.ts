'use server'
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY
});

export const ImageGeneratorDalle = async({prompt}:{prompt:string})=>{
    
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
          });
          const image_url = response;
        console.log(image_url);
        
    }catch(error){ 
       console.log(error);
       return null;
    }
}