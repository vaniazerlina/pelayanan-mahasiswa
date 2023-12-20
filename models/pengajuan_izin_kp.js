const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);
const Mahasiswa = require('./mahasiswa')
const Admin = require('./admin')

const pengajuanIzinKP = sequelize.define('pengajuan_izin_kp', {
    no_surat_izin_kp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nim_mahasiswa1: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: {
            model: Mahasiswa,
            key: 'nim'
        }
    },
    nim_mahasiswa2: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: Mahasiswa,
            key: 'nim'
        }
    },
    nim_mahasiswa3: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: Mahasiswa,
            key: 'nim'
        }
    },
    nim_mahasiswa4: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: Mahasiswa,
            key: 'nim'
        }
    },
    nim_mahasiswa5: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: Mahasiswa,
            key: 'nim'
        }
    },
    instansi_tujuan: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    penerima_surat:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tanggal_mulai_kp:{
        type: DataTypes.DATE,
        allowNull: false
    },
    tanggal_selesai_kp:{
        type: DataTypes.DATE,
        allowNull: false
    },
    departemen: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false
    }, 
    file_izin_kp: {
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
    keterangan: {
        type: DataTypes.STRING,
        allowNull: true
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
    tableName: 'pengajuan_izin_kp',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})


pengajuanIzinKP.belongsTo(Admin, {
    foreignKey: 'niu_admin',
    as: 'DataAdmin'
})

pengajuanIzinKP.belongsTo(Mahasiswa, {
    foreignKey: 'nim_mahasiswa1',
    as: 'DataMahasiswa1'
})
pengajuanIzinKP.belongsTo(Mahasiswa, {
    foreignKey: 'nim_mahasiswa2',
    as: 'DataMahasiswa2'
})
pengajuanIzinKP.belongsTo(Mahasiswa, {
    foreignKey: 'nim_mahasiswa3',
    as: 'DataMahasiswa3'
})
pengajuanIzinKP.belongsTo(Mahasiswa, {
    foreignKey: 'nim_mahasiswa4',
    as: 'DataMahasiswa4'
})
pengajuanIzinKP.belongsTo(Mahasiswa, {
    foreignKey: 'nim_mahasiswa5',
    as: 'DataMahasiswa5'
})

module.exports = pengajuanIzinKP