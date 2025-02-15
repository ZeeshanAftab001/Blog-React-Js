

const config = {
    app_write_url: import.meta.env.VITE_APP_WRITE_URL,  
    app_project_id: import.meta.env.VITE_APP_WRITE_PROJECT_ID, 
    app_database: import.meta.env.VITE_APP_WRITE_DATABASE,
    app_collection: import.meta.env.VITE_APP_WRITE_COLLECTION,
    app_bucket: import.meta.env.VITE_APP_WRITE_BUCKET_ID,
};

export default config;
