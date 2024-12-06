import { createContext, ReactNode, useState } from "react";
import { deleteBazarItemById, insert, updateValueById, } from "../Database";

// Define the Item type
export interface Item {
    id: string;
    value: string;
    date: string;
    day: string;
}

// Define the ItemState interface
interface ItemState {
    items: Item[];
    addItem: (item: Item) => void;
    updateItem: (id: string, newValue: string) => void;
    deleteItem: (id: string) => void;
    addInitialData: (Item: Item[]) => void;
}

// Create the context with default values
export const ItemContext = createContext<ItemState>({
    items: [],
    addItem: () => { },
    updateItem: () => { },
    deleteItem: () => { },
    addInitialData: () => { }
});

// Create the provider
export const ItemProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<Item[]>([]);

    const addItem = async (item: Item) => {
        setItems((prevItems) => [...prevItems, item]);
        await insert(item.id, item.value, item.date, item.day);
    };

    const updateItem = async (id: string, newValue: string) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, value: newValue } : item))
        );
        await updateValueById(id, newValue);
    };

    const deleteItem = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        deleteBazarItemById(id);
    };

    const addInitialData = (Item: Item[]) => {
        setItems(Item);
    }

    const value = {
        items,
        addItem,
        updateItem,
        deleteItem,
        addInitialData,
    };

    return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};
