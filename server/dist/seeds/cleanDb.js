import models from '../models/index.js'; // Asegúrate de que esta importación sea correcta
import db from '../config/connection.js'; // Asegúrate de que esta importación sea correcta
export default async (modelName, collectionName) => {
    try {
        // Verifica que el modelo exista en models
        const model = models[modelName];
        if (!model) {
            throw new Error(`Model ${modelName} not found`);
        }
        // Verifica que la conexión de la base de datos esté disponible
        if (model.db && model.db.db) {
            let modelExists = await model.db.db.listCollections({
                name: collectionName
            }).toArray();
            if (modelExists.length) {
                await db.dropCollection(collectionName);
            }
        }
        else {
            throw new Error("Database connection or model is undefined");
        }
    }
    catch (err) {
        console.error("Error cleaning database:", err);
        throw err;
    }
};
