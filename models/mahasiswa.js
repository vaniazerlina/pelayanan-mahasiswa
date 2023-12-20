const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

const Mahasiswa = sequelize.define('mahasiswa', {
    nim: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true
    }, 
    nama_mahasiswa: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    departemen: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    no_hp: {
        type: DataTypes.STRING(13),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    }, 
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'mahasiswa',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = Mahasiswa
