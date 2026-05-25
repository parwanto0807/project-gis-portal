import mysql from 'mysql2/promise';
import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';

const createConnection = async (credentials) => {
    const { host, port, user, password, database } = credentials;
    return await mysql.createConnection({
        host,
        port: port || 3306,
        user,
        password,
        database,
        connectTimeout: 5000 // fail fast if wrong IP
    });
};

export const connect = async (req, res, next) => {
    let connection;
    try {
        const credentials = req.body;
        connection = await createConnection(credentials);

        // Fetch tables
        const [rows] = await connection.execute('SHOW TABLES');
        
        // rows is an array of objects like { 'Tables_in_databaseName': 'table_name' }
        const tables = rows.map(row => Object.values(row)[0]);

        res.json({
            success: true,
            data: { tables },
            message: 'Successfully connected to database'
        });

    } catch (error) {
        next(error); // Let global error handler catch it or send specific message
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

export const getTableDetails = async (req, res, next) => {
    let connection;
    try {
        const { credentials, tableName } = req.body;
        if (!tableName) {
             return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Table name is required' });
        }

        connection = await createConnection(credentials);

        // Safely escape the table name for queries
        const escapedTable = '`' + tableName.replace(/`/g, '``') + '`';

        // Get Schema/Structure
        const [schemaRows] = await connection.execute(`DESCRIBE ${escapedTable}`);

        // Get Sample Data (LIMIT 50)
        const [dataRows] = await connection.execute(`SELECT * FROM ${escapedTable} LIMIT 50`);

        res.json({
            success: true,
            data: {
                structure: schemaRows,
                sampleData: dataRows
            }
        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

export const getSavedConnections = async (req, res, next) => {
    try {
        const saved = await prisma.savedDatabaseConnection.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({ success: true, data: saved });
    } catch (error) {
        next(error);
    }
};

export const saveConnection = async (req, res, next) => {
    try {
        const { name, host, port, user, password, database } = req.body;
        
        const newConnection = await prisma.savedDatabaseConnection.create({
            data: { name, host, port: String(port), user, password, database }
        });

        res.json({ success: true, data: newConnection, message: 'Connection saved successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteSavedConnection = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.savedDatabaseConnection.delete({
            where: { id: parseInt(id) }
        });
        res.json({ success: true, message: 'Saved connection deleted' });
    } catch (error) {
        next(error);
    }
};
