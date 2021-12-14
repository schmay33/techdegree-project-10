"use strict";
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
	class User extends Model {}
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "A First Name is Required",
					},
					notEmpty: {
						msg: "Please provide a First Name",
					},
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "A Last Name is Required",
					},
					notEmpty: {
						msg: "Please provide a Last Name",
					},
				},
			},
			emailAddress: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                  msg: 'The email address you entered already exists.'
                },
                validate: {
                  notNull: {
                    msg: 'An email address is required'
                  },
                  notEmpty: {
                    msg: 'Please provide an email address.'
                  },
                  isEmail: {
                    msg: 'Please enter in a valid email address.'
                  }
                }
              },
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "A password is required",
					},
					notEmpty: {
						msg: "Please provide a password.",
					},
					validatePassword(val) {
						if (val.length >= 8 && val.length <= 20) {
							const hashedPassword = bcrypt.hashSync(val, 10);
							this.setDataValue("password", hashedPassword);
						} else {
							throw new Error(
								"Your password should be between 8 and 20 characters"
							);
						}
					},
				},
			},
		},
		{ sequelize }
	);

	User.associate = (models) => {
		User.hasMany(models.Course, {
			as: "user",
			foreignKey: {
				fieldName: "userId",
				allowNull: false,
			},
		});
	};

	return User;
};
