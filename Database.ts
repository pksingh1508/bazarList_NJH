import * as SQLite from 'expo-sqlite';
import { Item } from './store/ItemContext';

async function init() {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');

        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS bazar (
            id TEXT PRIMARY KEY NOT NULL,
            value TEXT NOT NULL,
            date TEXT NOT NULL,
            day TEXT NOT NULL
        );
        `);
        console.log("db initialized successfully");
    } catch (e) {
        console.log("failed to initialize database", e);
    }
}

async function insert(id: string, value: string, date: string, day: string) {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');
        const result = await db.runAsync('INSERT INTO bazar (id,value, date, day) VALUES (?,?, ?,?)', id, value, date, day);
        // console.log(result);
    } catch (e) {
        console.log("Failed to insert", e);
    }
}

async function updateValueById(id: string, newValue: string) {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');
        const result = await db.runAsync('UPDATE bazar SET value = ? WHERE id = ?', [newValue, id]);
        // console.log("Update successful:", result);
    } catch (e) {
        console.log("Failed to update", e);
    }
}


async function deleteBazarItemById(id: string) {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');
        await db.runAsync('DELETE FROM bazar WHERE id = $id', { $id: id });
        // console.log("deleted Successfully");
    } catch (e) {
        console.log("Error while deleting the expense.", e)
    }
}

async function getAllItems() {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');
        const allRows = await db.getAllAsync('SELECT * FROM bazar');
        return <Item[]>allRows || <Item[]>[];
    } catch (e) {
        console.log("Couldnot get Expenses", e);
        return <Item[]>[];
    }
}



export { init, insert, deleteBazarItemById, getAllItems, updateValueById };