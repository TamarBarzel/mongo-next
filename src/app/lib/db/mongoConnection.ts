import mongoose from 'mongoose';

const MONGO_URL =process.env.MONGO_URL||'';

const connect= async()=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log('mongo connection succes');
    }catch (error){
        throw new Error('error in connection DB '+error)
    }
}

export default connect;
