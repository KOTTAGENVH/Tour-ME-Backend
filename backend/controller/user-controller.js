import User from "../model/user-model.js";
import bcrypt from 'bcrypt'

//Create User
export const createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            role,
            approved,
            password
        } = req.body;

        // Generate a unique 4-digit secret code
        const secretcode = generateUniqueSecretCode();

        if (role == "admin") {
            return res.status(400).json({ message: "Ai api call harigiye nadda" });
        }


        const emailalready = await User.findOne({ email: email })
        if (emailalready) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const usernamealready = await User.findOne({ username: username })
        if (usernamealready) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, role, approved, password: hash, secretcode });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
}

// Helper function to generate a unique 4-digit secret code
const generateUniqueSecretCode = () => {
    const existingSecretCodes = new Set(); // To store existing secret codes
    const MIN_CODE = 1000;
    const MAX_CODE = 9999;

    // Generate a random 4-digit code until a unique one is found
    while (true) {
        const code = Math.floor(Math.random() * (MAX_CODE - MIN_CODE + 1)) + MIN_CODE;

        if (!existingSecretCodes.has(code)) {
            existingSecretCodes.add(code);
            return code.toString();
        }
    }
};


//Login User
export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const comparePasswords = (password) => {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        };

        const result = await comparePasswords(req.body.password);

        if (result) {
            const loggedUser = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
            return res.status(200).json({ message: "Login successful", loggedUser });
        } else {
            res.status(401).json({ message: "Login failed" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Forget Password User Email temperory password using password reset
export const forgetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const secretcode = req.body.secretcode;
        const newpassword = req.body.newpassword;

        const user = await User.findOne({ email: email });

        const findemail = User.findOne({ email: email });

        if (!findemail) {
            return res.status(400).json({ message: "Email not found" });
        }

        const findsecretcode = User.findOne({ secretcode: secretcode });

        if (!findsecretcode) {
            return res.status(400).json({ message: "Invalid secret code" });
        }

        //Update User password
        const newhashpassword = await bcrypt.hash(newpassword, 10);
        user.password = newhashpassword;
        await user.save();

        // Generate a unique 4-digit secret code
        const updatedsecretcode = generateUniqueSecretCode();

        user.secretcode = updatedsecretcode;
        await user.save();

        return res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        console.error("Error in forgetPassword:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get User By Id
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete User
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Update User
export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {
            username,
            email,
            role,
            approved,
            password
        } = req.body;

        if (username) {
            user.username = username;
        }

        if (email) {
            user.email = email;
        }

        if (role) {
            user.role = role;
        }

        if (approved) {
            user.approved = approved;
        }

        if (password) {
            const hash = await bcrypt.hash(password, 10);
            user.password = hash;
        }

        await user.save();
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Block User
export const blockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);


        if (user) {
            user.block = true;
        } else {
            return res.status(400).json({ message: "User not found" });
        }

        await user.save();
        res.status(200).json({ message: "User blocked successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get All Souvnier Users
export const getAllSouvnierUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "souvnier" });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get All Hotel Users
export const getAllHotelUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "hotel" });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get All Destination Users
export const getAllDestinationUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "destination" });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get All Customer Users
export const getAllCustomerUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "customer" });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Create Admin User
export const createAdminUser = async ({
    username,
    email,
    role,
    approved,
    password
  }) => {
    try {
      // Generate a unique 4-digit secret code
      const secretcode = generateUniqueSecretCode();
  
      const emailalready = await User.findOne({ email: email });
      if (emailalready) {
        return { status: 400, message: "Email already exists" };
      }
  
      const usernamealready = await User.findOne({ username: username });
      if (usernamealready) {
        return { status: 400, message: "Username already exists" };
      }
  
      const hash = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        role,
        approved,
        password: hash,
        secretcode
      });
      await newUser.save();
      return { status: 201, message: "User created successfully" };
    } catch (error) {
      console.error(error);
      return { status: 500, message: error.message };
    }
  };