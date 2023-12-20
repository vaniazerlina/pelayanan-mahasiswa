const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);
const pengajuanIzinKp = require('./pengajuan_izin_kp')
const Admin = require('./admin')

const pengajuanTugasKp = sequelize.define('pengajuan_tugas_kp', {
    no_surat_tugas_kp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    no_surat_izin_kp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: pengajuanIzinKp,
            key: 'no_surat_izin_kp'
        }
    },
    file_tugas_kp: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    niu_admin: {
        type: DataTypes.STRING(20),
        allowNull: true,
        references: {
            model: Admin,
            key: 'niu_admin'
        }
    },
    status:{
        type: DataTypes.STRING(20),
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
    tableName: 'pengajuan_tugas_kp',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})


pengajuanTugasKp.belongsTo(pengajuanIzinKp, {
    foreignKey: 'no_surat_izin_kp',
    as: 'DataIzinKp'
})
pengajuanTugasKp.belongsTo(Admin, {
    foreignKey: 'niu_admin',
    as: 'DataAdmin'
})

module.exports = pengajuanTugasKp
