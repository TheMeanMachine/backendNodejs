var mysql = require('promise-mysql');
var info = require('../config');

exports.adminConsole = async() => {
    
}

exports.createTables = async(id) => {
    try{
        const connection = await mysql.createConnection(info.config);

        let sql = `CREATE TABLE IF NOT EXISTS user (
        ID INT NOT NULL AUTO_INCREMENT,
        username TEXT,
        password TEXT,
        passwordSalt TEXT,
        firstName TEXT,
        lastName TEXT,
        profileImageURL TEXT,
        email TEXT,
        about TEXT,
        countryID INT,
        birthDate DATETIME,
        dateRegistered DATETIME,
        active BOOLEAN,
        deleted BOOLEAN,
        PRIMARY KEY(ID)
        );`;
        await connection.query(sql);
        
        sql = `CREATE TABLE IF NOT EXISTS loginHistory (
        ID INT NOT NULL AUTO_INCREMENT,
        attemptedUserID INT,
        attemptDate DATETIME,
        succeded BOOLEAN,
        IP TEXT,
        timeOfLogin DATETIME,
        loggedOutDate DATETIME,
        deviceTypeID INT,
        PRIMARY KEY(ID)
        );`;
        await connection.query(sql);
        
        
        sql = `CREATE TABLE IF NOT EXISTS passwordReminder (
        ID INT NOT NULL AUTO_INCREMENT,
        userID INT,
        securityQuestion1 TEXT,
        securityAnswer1 TEXT,
        securityQuestion2 TEXT,
        securityAnswer2 TEXT,
        PRIMARY KEY(ID)
        );`;
        await connection.query(sql);
        
        
        sql = `CREATE TABLE IF NOT EXISTS passwordChangeHistory (
        ID INT NOT NULL AUTO_INCREMENT,
        userID INT,
        oldPassword TEXT,
        dateChanged DATETIME,
        PRIMARY KEY(ID)
        );`;
        await connection.query(sql);
        
        
        sql = `CREATE TABLE IF NOT EXISTS signupMethod (
        ID INT NOT NULL AUTO_INCREMENT,
        serviceProvider TEXT,
        URL TEXT,
        allowed BOOLEAN,
        PRIMARY KEY(ID)
        );`;
        await connection.query(sql);
        
        
        sql = `CREATE TABLE IF NOT EXISTS countries (
        ID INT NOT NULL AUTO_INCREMENT,
        name TEXT,
        abbreviation DATETIME,
        PRIMARY KEY(ID)
        );`;

        await connection.query(sql);
        
        //Foreign keys
        sql = `ALTER TABLE user
        ADD CONSTRAINT FK_userCountry
        FOREIGN KEY (countryID) REFERENCES countries(ID);
        `;
        
        await connection.query(sql);

        sql = `ALTER TABLE loginHistory
        ADD CONSTRAINT FK_loginHistoryAttemptedUserID
        FOREIGN KEY (attemptedUserID) REFERENCES user(ID);
        `;
        
        await connection.query(sql);

        sql = `ALTER TABLE passwordReminder
        ADD CONSTRAINT FK_passwordReminderUserID
        FOREIGN KEY (userID) REFERENCES user(ID);
        `;
        
        await connection.query(sql);

        sql = `ALTER TABLE passwordChangeHistory
        ADD CONSTRAINT FK_passwordChangeHistoryUserID
        FOREIGN KEY (userID) REFERENCES user(ID);
        `;
        
        await connection.query(sql);

        return {message:"created successfully"};

    }catch (error){
        console.log(error);
        ctx.throw(500, 'An Error has occured');
    }
}