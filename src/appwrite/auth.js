import { Client, Account, ID } from "appwrite";
import config from "../conf/conf.js"; // Ensure this file is correctly initialized before using it

class authService {
    client = new Client();
    account;

    constructor() {
     //   console.log("Appwrite URL:", config.app_write_url);
    //    console.log("Appwrite Project ID:", config.app_project_id);

        this.client
            .setEndpoint(config.app_write_url)
            .setProject(config.app_project_id);

    //    console.log("Final Project ID Set:", this.client.config.project); // Debugging log

        this.account = new Account(this.client);
    }

    async register(name, email, password) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login(email, password);
            }
        } catch (error) {
            console.error("Registration Error:", error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Login Error:", error);
            throw error;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("Logout Error:", error);
            throw error;
        }
    }

    async currentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
         //   console.error("Current User Error:", error);
            return null;
        }
    }
    
}

const auth = new authService();
export default auth;
