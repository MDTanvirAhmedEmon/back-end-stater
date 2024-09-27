import app from "./app"
import mongoose from 'mongoose';
const port = 5000

async function main() {

    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }
    catch (error) {
        console.log(error)
    }

}

main()
