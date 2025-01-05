import * as SQLite from 'expo-sqlite';

// Types
export interface ListType {
    id: string;
    name: string;
    created_at: string;
}

export interface Item {
    id: string;
    list_type_id: string;
    value: string;
    is_purchased: boolean;
    date: string;
    day: string;
}

interface ItemRow {
    id: string;
    list_type_id: string;
    value: string;
    is_purchased: number; // SQLite stores booleans as 0 or 1
    date: string;
    day: string;
}

async function init() {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');

        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            
            CREATE TABLE IF NOT EXISTS list_types (
                id TEXT PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS items (
                id TEXT PRIMARY KEY NOT NULL,
                list_type_id TEXT NOT NULL,
                value TEXT NOT NULL,
                is_purchased INTEGER DEFAULT 0,
                date TEXT NOT NULL,
                day TEXT NOT NULL,
                FOREIGN KEY (list_type_id) REFERENCES list_types (id)
                    ON DELETE CASCADE
            );
        `);
        console.log("db initialized successfully");
    } catch (e) {
        console.log("failed to initialize database", e);
    }
}

// List Types Operations
async function insertListType(id: string, name: string) {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');
        const created_at = new Date().toISOString();
        await db.runAsync(
            'INSERT INTO list_types (id, name, created_at) VALUES (?, ?, ?)',
            [id, name, created_at]
        );
    } catch (e) {
        console.log("Failed to insert list type", e);
    }
}

async function getAllListTypes(): Promise<ListType[]> {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');
        const allRows = await db.getAllAsync('SELECT * FROM list_types ORDER BY created_at DESC');
        return allRows as ListType[] || [];
    } catch (e) {
        console.log("Could not get list types", e);
        return [];
    }
}

async function deleteListType(id: string) {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');
        await db.runAsync('DELETE FROM list_types WHERE id = ?', [id]);
    } catch (e) {
        console.log("Error while deleting the list type.", e);
    }
}

// Items Operations
async function insertItem(
    id: string,
    list_type_id: string,
    value: string,
    date: string,
    day: string
) {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');
        await db.runAsync(
            'INSERT INTO items (id, list_type_id, value, date, day) VALUES (?, ?, ?, ?, ?)',
            [id, list_type_id, value, date, day]
        );
    } catch (e) {
        console.log("Failed to insert item", e);
    }
}

async function updateItemValue(id: string, newValue: string) {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');
        await db.runAsync('UPDATE items SET value = ? WHERE id = ?', [newValue, id]);
    } catch (e) {
        console.log("Failed to update item", e);
    }
}

async function updateItemPurchaseStatus(id: string, isPurchased: boolean) {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');
        await db.runAsync(
            'UPDATE items SET is_purchased = ? WHERE id = ?',
            [isPurchased ? 1 : 0, id]
        );
    } catch (e) {
        console.log("Failed to update item purchase status", e);
    }
}

async function deleteItem(id: string) {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');
        await db.runAsync('DELETE FROM items WHERE id = ?', [id]);
    } catch (e) {
        console.log("Error while deleting the item.", e);
    }
}

async function getAllItems(): Promise<Item[]> {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');
        const allRows = await db.getAllAsync('SELECT * FROM items');
        
        // Properly transform the database rows to Item type
        return (allRows as ItemRow[]).map(row => ({
            id: row.id,
            list_type_id: row.list_type_id,
            value: row.value,
            is_purchased: row.is_purchased === 1,
            date: row.date,
            day: row.day
        }));
    } catch (e) {
        console.log("Could not get items", e);
        return [];
    }
}

async function getItemsByListType(list_type_id: string): Promise<Item[]> {
    try {
        const db = await SQLite.openDatabaseAsync('myDataBase');
        const rows = await db.getAllAsync(
            'SELECT * FROM items WHERE list_type_id = ? ORDER BY date DESC',
            [list_type_id]
        );
        
        // Properly transform the database rows to Item type
        return (rows as ItemRow[]).map(row => ({
            id: row.id,
            list_type_id: row.list_type_id,
            value: row.value,
            is_purchased: row.is_purchased === 1,
            date: row.date,
            day: row.day
        }));
    } catch (e) {
        console.log("Could not get items for list type", e);
        return [];
    }
}

export {
    init,
    insertListType,
    getAllListTypes,
    deleteListType,
    insertItem,
    updateItemValue,
    updateItemPurchaseStatus,
    deleteItem,
    getAllItems,
    getItemsByListType
};