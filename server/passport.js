const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const AdminService = require('./Services/AdminService');
const config = require('./config');

module.exports = passport;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('auth_token'),
    secretOrKey: config.jwtSecretKey,
};

passport.use(new LocalStrategy({session: false},
    async function (username, password, done) {
        try {
            const admin = await AdminService.getAdminByUserName(username);
            if (admin === null || !admin.checkPassword(password))
            {
                return done(null, false, {message: 'Invalid username or password!'});
            }
            return done(null, admin);
        }
        catch (e) {
            return done(e);
        }
    })
);
passport.use(new JwtStrategy(jwtOptions, async function (payload, done) {
    try {
        const admin = await AdminService.getAdminById(payload.id);
        if (admin) return done(null, admin);
        else return done(null, false, {message: 'Not Authorized!'});
    }
    catch (e) {
        return done(e);
    }
}));

