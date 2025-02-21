import {Client,Databases,Storage,ID,Query} from "appwrite"
import config from "../conf/conf";



class Services{
    client=new Client();
    database;
    bucket;
    constructor (){
        this.client.setEndpoint(config.app_write_url)
        .setProject(config.app_project_id)
        this.database=new Databases(this.client);
        this.bucket=new Storage(this.client);

    }

    async createBlog({title,body,slug,featuredImage,userId,status}){


       try {
            return await this.database.createDocument( config.app_database,
            config.app_collection,
            ID.unique(),
            {
                title,
                body,
                featuredImage,
                slug,
                status,
                userId
    
            })
       } catch (error) {
            throw error
       }
       
    }

    async getBlog(slug){
        try {

            return await this.database.getDocument(
                config.app_database,
                config.app_collection,
                slug
            )
            
        } catch (error) {
            throw error
        }
    }

    async updateBlog(slug,{title,body,featuredImage,status}){
        try {

            return await this.database.updateDocument(
                config.app_database,
                config.app_collection,
                id,
                {
                    title,
                    body,
                    slug,
                    featuredImage,
                    status
                }
            )
            return true

            
        } catch (error) {
            throw error
            return false;
        }
    }

    async deleteBlog(id){
        try {

            await this.database.deleteDocument(
                config.app_database,
                config.app_collection,
                id
            )
            return true
            
        } catch (error) {
            throw error
            return false
        }

    }

    async listBlogs(){
        try {
            return await this.database.listDocuments(
                config.app_database,
                config.app_collection,
                [
                    Query.equal("status","active")
                ]
            )
        } catch (error) {
            throw error
        }
    }

    async createFile(file){
        try {

            return await this.bucket.createFile(
                config.app_bucket,
                ID.unique(),
                file
            )
            
        } catch (error) {
            throw error
            return false
        }
    }
    async deleteFile(fileId){
        try {

            await this.bucket.deleteFile(
                config.app_bucket,
                fileId
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async previewFile(fileId){
        try {

            return this.bucket.getFilePreview(

                config.app_bucket,
                fileId

            )
        } catch (error) {
            throw error
        }
    }
}

const service=new Services()

export default service