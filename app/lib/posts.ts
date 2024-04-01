'use server'
import prisma from "./db";

export const AllDbPost=  async()=>{
    try {
        const res = await prisma.post.findMany({
            orderBy: [
                {
                  createdAt: 'desc'
                }
              ]
        });
        return res;
    } catch (error) {
        console.log(error); 
    }
}

export const CreatePost = async({name,prompt,image}:{name:string,prompt:string,image:string})=>{
  console.log('function called');
  
    try {
    const res  = await prisma.post.create({
        data:{
            name:name,
            prompt,
            image
        }
    })
    console.log(res);
    
    return res;
   } catch (error) {
    console.log(error);
    
   }
}