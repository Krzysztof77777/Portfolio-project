import express from 'express';
import {
    sendEmail
} from "../utils/email.js";

const router = express.Router();

router.post('/send/form', async (req, res) => {
    try {
        const message = `<div><h1>Nowa wiadomość przychodząca od użytkownika ${req.body.fromName}</h1><p>Treść wiadomości: ${req.body.message}</p><p>Email kontaktowy zostawiony w formularzu: ${req.body.fromEmail}</p></div>`;
        await sendEmail(`Nowa wiadomość od ${req.body.fromName}`, message);
    } catch (error) {
        res.status(400).send("An error occured");
    }
})

export {
    router as formRoute
}