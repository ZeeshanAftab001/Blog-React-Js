import { Client, Account , ID } from "appwrite";
import config from "../conf/conf.js"

class authService{
 client=new Client();
 account;

 constructor(){
    this.client.setEndpoint(config.app_write_url)
    .setProject(config.app_project_id)
    this.account=new Account(this.client)
 }
 async register(name,email,password){
    try {
        const userAccount= this.account.create(ID.unique(),name,email,password)
       if(userAccount){
        return this.login(email,password)
       }
    } catch (error) {
        throw error;
    }
 }
 async login(email,password){
    try {
        return await this.account.createEmailPasswordSession(email,password);
    } catch (error) {
        throw error
    }
 }


 async logout(){
    try {
        return await this.account.deleteSessions();
    } catch (error) {
        throw error
    }
 }
 async currentUser(){
    try {
        return await this.account.get()
    } catch (error) {
        throw error
    }
    return null;
 }

}

const auth=new authService()

export default auth;