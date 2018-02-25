module.exports = () => {
    function generateRandomString(stringLength) {
        stringLength = stringLength ? stringLength : 5;
        let string = "";
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < stringLength; i++)
            string += chars.charAt(Math.floor(Math.random() * chars.length));

        return string;
    }
    function createUserEntry(role, name) {
        return {
            'role': role,
            'name': name,
            'id': generateRandomString(5),
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut '
        };
    }
    function createCarEntry(model, serie, price) {
        return {
            'model': model,
            'serie': serie,
            'price': price,
            'id': generateRandomString(9),
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut '
        };
    }
    let carModels = ['BMW', 'Maserati', 'Bentley', 'BMW'];
    let carSeries = ['M3', 'Bi-Turbo', 'Continental', '330d'];
    let carPrices = ['70000', '120000', '370000', '55000'];
    let db = {
        users: [],
        cars: [],
        files: []
    };

    // Create default user entries
    db.users.push(createUserEntry('admin', 'Big Boss a.k.a \'Owner\''));
    db.users.push(createUserEntry('assistant', 'Rosie Red Bearded'));
    db.users.push(createUserEntry('assistant', 'Johny the Hammer'));
    db.users.push(createUserEntry('assistant', 'Small Vickie'));

    // Create default car entries
    for (let i = 0; i < carModels.length; i++) {
        db.cars.push(createCarEntry(carModels[i], carSeries[i], carPrices[i]));
    }

    return db;
};