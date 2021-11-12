import {
    formRoute
} from "../routes/form.js";

const startRouting = (app) => {
    app.use('/', formRoute);
}

export default startRouting;