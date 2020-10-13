const dbManager = require('../database.config/database.manager');

/**
 * Creation of an user
 * @param {*} userObject JSON Object with User information
 */
async function createUser(req, res) {

    // CHECK IF THE REQUEST BODY IS EMPTY
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    // CREATING THE OBJECT TO PERSIST
    const newUserObject = {
        username: req.body.username,
        creation_date: new Date(req.body.creation_date)
    }

    // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE 
    dbManager.User.create(newUserObject).then(
        data => {
            res.send(data);
        }
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response 
            res.status(500).send({
                message: "Some error occurred"
            });
        }
    );
}

/**
 * GEt all users
 */
async function findAllUsers(req, res) {
    try {
        //Execute query
        const users = await dbManager.User.findAll();

        //Send response
        res.json({
            data: users
        });

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}

/**
 * Get user by id
 */
async function findOneUser(req, res) {
    try {
        const { idUser } = req.params;

        //Execute query
        const user = await dbManager.User.findOne({
            where: {
                idUser: idUser
            }
        });
        //Send response
        res.json(user);

    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}

/**
 * Update user
 */
async function updateUser(req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "Request body is empty!!!!"
        });
        return;
    }

    // CREATING THE OBJECT TO PERSIST
    const updateUserObject = {
        username: req.body.username,
        creation_date: new Date(req.body.creation_date)
    }
    const idUser = { idUser: req.params.idUser };

    // EXECUTING THE CREATE QUERY - INSERT THE OBJECT INTO DATABASE 
    dbManager.User.update(updateUserObject, { where: idUser })
        .then(
            data => {
                console.log(data);
                res.send(data);
            }
        ).catch(
            e => {
                // Print error on console
                console.log(e);
                // Send error message as a response 
                res.status(500).send({
                    message: "Some error occurred"
                });
            }
        );
}

/**
 * Delete an existen user by username
 * @param {*} req 
 * @param {*} res 
 */
async function deleteUserByUsername(req, res) {
    const username = { username: req.params.username };
    dbManager.User.destroy({ where: username }).then(
        data => {
            console.log(data);
            res.json(data);

        }
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response 
            res.status(500).send({
                message: "Some error occurred"
            });
        }
    );
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function deleteAllUsers(req, res) {
    dbManager.User.destroy({ where: {} }).then(
        data => {
            console.log(data);
            res.send(data);
        }
    ).catch(
        e => {
            // Print error on console
            console.log(e);
            // Send error message as a response 
            res.status(500).send({
                message: "Some error occurred"
            });
        }
    );
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function findAllUsersByCreatedDate(req, res) {
    try {
        const fecha = { create_date: new Date(req.params.creation_date) };

        //Execute query
        const users = await dbManager.User.findAll({ where: fecha });

        //Send response
        res.json({
            data: users
        });


    } catch (e) {
        // Print error on console
        console.log(e);
        // Send error message as a response 
        res.status(500).send({
            message: "Some error occurred"
        });
    }
}


exports.createUser = createUser;
exports.findAllUsers = findAllUsers;
exports.findOneUser = findOneUser;
exports.updateUser = updateUser;
exports.deleteUserByUsername = deleteUserByUsername;
exports.deleteAllUsers = deleteAllUsers;
exports.findAllUsersByCreatedDate = findAllUsersByCreatedDate;