const bcrypt = require('bcrypt');

// The password entered by the user when logging in
const userPassword = 'password';

// Password hash stored in database (usually obtained from database)
const hashedPassword = '$2b$10$W7cE8Hs0UJUvVDYO.DGdoeLIeK3IGen4flreIsPfJ3oev/C1.Jh.O';

// Compare user entered password and hash
bcrypt.compare(userPassword, hashedPassword, (err, result) => {
    if (err) {
        // handling errors
        console.error(err);
    } else {
        if (result) {
            // Password matching
            console.log('Password matching');
        } else {
            // Passwords do not match
            console.log('Passwords do not match');
        }
    }
});
