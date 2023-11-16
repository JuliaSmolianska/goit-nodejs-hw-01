import fs from 'fs/promises';
import path from 'path';
import { nanoid } from "nanoid";

const contactsPath = path.resolve('db', 'contacts.json');

const updateContact = (contacts) =>
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
    try {
        const contacts = await fs.readFile(contactsPath, 'utf-8');
        return JSON.parse(contacts);
    } catch (error) {
        console.log(error.message);
    }
};

export const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contact = contacts.find((item) => item.id === contactId);
        return contact || null;
    } catch (error) {
        throw error;
    }
}

export const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex((item) => item.id === contactId);
        if (index === -1) {
            return null;
        }
        const [removedContact] = contacts.splice(index, 1);
        await updateContact(contacts);
        return removedContact;
    } catch (error) {
        throw error;
    }
}

export const addContact = async ({ name, email, phone }) => {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        await updateContact(contacts);
        return newContact;
    } catch (error) {
        throw error;
    }
}
