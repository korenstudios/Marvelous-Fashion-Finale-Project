const express = require("express");
const router = express.Router();
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/", async (req, res) => {
  // Validate user's inputs
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Validate system
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("Invaild email or password.");
    return;
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    res.status(400).send("Invaild email or password.");
    return;
  }

  // Process
  // Generate jsonwebtoken to Authentication
  const token = user.generateAuthToken();

  // Response

  res.json({
    token,
  });
});

router.post("/forgot-password", async (req, res) => {
  const { error } = validateForgotPassword(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400).send("Invaild email.");
    return;
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  user.reset_token = token;

  await user.save();

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_API_CLIENT_ID,
    process.env.GMAIL_API_CLIENT_SECRET,
    process.env.GMAIL_API_REDIRECT_URI
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.GMAIL_API_REFRESH_TOKEN,
  });

  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: process.env.GMAIL_API_CLIENT_ID,
      clientSecret: process.env.GMAIL_API_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_API_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: `Marvelous Fashion <${process.env.GMAIL_USER}>`,
    to: user.email,
    subject: "Password Reset Request for Marvelous Fashion",
    html: `
    <div
      dir="ltr"
      style="background-color: #f7f7f7; margin: 0; padding: 70px 0; width: 100%"
    >
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        height="100%"
        width="100%"
      >
        <tbody>
          <tr>
            <td align="center" valign="top">
              <div>
                <p style="margin-top: 0">
                  <img
                    src="https://res.cloudinary.com/korenstudios/image/upload/v1654037056/Marvelous%20Fashion/marvelous_fasion_logo_ukzrbv.png"
                    alt="Marvelous Fashion"
                    style="
                      border: none;
                      display: inline-block;
                      font-size: 14px;
                      font-weight: bold;
                      height: auto;
                      outline: none;
                      text-decoration: none;
                      text-transform: capitalize;
                      vertical-align: middle;
                      max-width: 100%;
                      margin-left: 0;
                      margin-right: 0;
                    "
                    class="CToWUd"
                  />
                </p>
              </div>
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="600"
                style="
                  background-color: #ffffff;
                  border: 1px solid #dedede;
                  border-radius: 3px;
                "
              >
                <tbody>
                  <tr>
                    <td align="center" valign="top">
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="
                          background-color: #b12929;
                          color: #ffffff;
                          border-bottom: 0;
                          font-weight: bold;
                          line-height: 100%;
                          vertical-align: middle;
                          font-family: 'Helvetica Neue', Helvetica, Roboto,
                            Arial, sans-serif;
                          border-radius: 3px 3px 0 0;
                        "
                      >
                        <tbody>
                          <tr>
                            <td style="padding: 36px 48px; display: block">
                              <h1
                                style="
                                  font-family: 'Helvetica Neue', Helvetica,
                                    Roboto, Arial, sans-serif;
                                  font-size: 30px;
                                  font-weight: 300;
                                  line-height: 150%;
                                  margin: 0;
                                  text-align: left;
                                  color: #ffffff;
                                  background-color: inherit;
                                "
                              >
                                Password Reset Request
                              </h1>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" valign="top">
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="600"
                      >
                        <tbody>
                          <tr>
                            <td valign="top" style="background-color: #ffffff">
                              <table
                                border="0"
                                cellpadding="20"
                                cellspacing="0"
                                width="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      valign="top"
                                      style="padding: 48px 48px 32px"
                                    >
                                      <div
                                        style="
                                          color: #636363;
                                          font-family: 'Helvetica Neue',
                                            Helvetica, Roboto, Arial, sans-serif;
                                          font-size: 14px;
                                          line-height: 150%;
                                          text-align: left;
                                        "
                                      >
                                        <p style="margin: 0 0 16px">
                                          Hi ${user.name},
                                        </p>
                                        <p style="margin: 0 0 16px">
                                          Someone has requested a new password
                                          for the following account on Marvelous Fashion:
                                        </p>
                                        <p style="margin: 0 0 16px">
                                          Name: ${user.name}
                                        </p>
                                        <p style="margin: 0 0 16px">
                                          If you didn't make this request, just
                                          ignore this email. If you'd like to
                                          proceed:
                                        </p>
                                        <p style="margin: 0 0 16px">
                                          <a
                                            href="http://localhost:3000/forgot-password?token=${token}"
                                            style="
                                              font-weight: normal;
                                              text-decoration: underline;
                                              color: #b12929;
                                            "
                                            target="_blank"
                                          >
                                            Click here to reset your password
                                          </a>
                                        </p>

                                        <p style="margin: 0 0 16px">
                                          Thanks for reading.
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <table border="0" cellpadding="10" cellspacing="0" width="600">
                <tbody>
                  <tr>
                    <td valign="top" style="padding: 0; border-radius: 6px">
                      <table
                        border="0"
                        cellpadding="10"
                        cellspacing="0"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td
                              colspan="2"
                              valign="middle"
                              style="
                                border-radius: 6px;
                                border: 0;
                                color: #8a8a8a;
                                font-family: 'Helvetica Neue', Helvetica, Roboto,
                                  Arial, sans-serif;
                                font-size: 12px;
                                line-height: 150%;
                                text-align: center;
                                padding: 24px 0;
                              "
                            >
                              <p style="margin: 0 0 16px">Marvelous Fashion</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send("Email send fail.");
    } else {
      console.log(`Email Sent: ${info.response}`);
      res.send("Email sent.");
    }
  });
});

router.post("/reset-password", async (req, res) => {
  const { error } = validateResetPassword(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  if (req.body.password !== req.body.confirm_password) {
    res.status(400).send("Password is not match.");
    return;
  }

  const user = await User.findOne({ reset_token: req.body.token });

  if (!user) {
    res.status(400).send("User does not exist.");
    return;
  }

  user.reset_token = null;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  res.json(user);
});

// Social Media Auth

router.get("/login-social-media/success", (req, res) => {
  if (req.user) {
    res.json(req.user);
  }
});

router.get("/login-social-media/failed", (req, res) => {
  res.status(401).send("Login failed.");
});

router.get("/logout-social-media", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.redirect(process.env.CLIENT_URL);
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/products`,
    failureRedirect: "/api/auth/login-social-media/failed",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: `${process.env.CLIENT_URL}/products`,
    failureRedirect: "/api/auth/login-social-media/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: `${process.env.CLIENT_URL}/products`,
    failureRedirect: "/api/auth/login-social-media/failed",
  })
);

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string()
      .min(8)
      .max(1024)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/
      )
      .required(),
  });

  return schema.validate(user);
}

function validateForgotPassword(email) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
  });

  return schema.validate(email);
}

function validateResetPassword(password) {
  const schema = Joi.object({
    password: Joi.string()
      .min(8)
      .max(1024)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/
      )
      .required(),
    confirm_password: Joi.string()
      .min(8)
      .max(1024)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/
      )
      .required(),
    token: Joi.string(),
  });

  return schema.validate(password);
}

module.exports = router;
