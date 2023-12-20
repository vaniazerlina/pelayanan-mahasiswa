const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);
const Mahasiswa = require('./mahasiswa')
const Admin = require('./admin')
const Dosen = require('./dosen')

const pengajuanIzinSurvey = sequelize.define('pengajuan_izin_survey', {
    no_surat_izin_survey: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    mata_kuliah: {
        type: DataTypes.STRING(100),
        allowNull: false
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
    nim_mahasiswa6: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: Mahasiswa,
            key: 'nim'
        }
    },
    nim_mahasiswa7: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: Mahasiswa,
            key: 'nim'
        }
    },
    nim_mahasiswa8: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: Mahasiswa,
            key: 'nim'
        }
    },
    penerima_tujuan: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nip_dosen: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: Dosen,
            key: 'nip_dosen'
        }
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
    file_izin_survey: {
        type: DataTypes.STRING(255),
        allowNull: true
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
    tableName: 'pengajuan_izin_survey',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

pengajuanIzinSurvey.belongsTo(Mahasiswa, {
    foreignKey: 'nim_mahasiswa1',
    as: 'DataMahasiswa1'
})
pengajuanIzinSurvey.belongsTo(Mahasiswa, {
    foreignKey: 'nim_mahasiswa2',
    as: 'DataMahasiswa2'
})
pengajuanIzinSurvey.belongsTo(Mahasiswa, {
    foreignKey: 'nim_mahasiswa3',
    as: 'DataMahasiswa3'
})
pengajuanIzinSurvey.belongsTo(Mahasiswa, {
    foreignKey: 'nim_mahasiswa4',
    as: 'DataMahasiswa4'
})
pengajuanIzinSurvey.belongsTo(Mahasiswa, {
    foreignKey: 'nim_mahasiswa5',
    as: 'DataMahasiswa5'
})

pengajuanIzinSurvey.belongsTo(Mahasiswa, {
    foreignKey: 'nim_mahasiswa6',
    as: 'DataMahasiswa6'
})

pengajuanIzinSurvey.belongsTo(Mahasiswa, {
    foreignKey: 'nim_mahasiswa7',
    as: 'DataMahasiswa7'
})

pengajuanIzinSurvey.belongsTo(Mahasiswa, {
    foreignKey: 'nim_mahasiswa8',
    as: 'DataMahasiswa8'
})

pengajuanIzinSurvey.belongsTo(Admin, {
    foreignKey: 'niu_admin',
    as: 'DataAdmin'
})

pengajuanIzinSurvey.belongsTo(Dosen, {
    foreignKey: 'nip_dosen',
    as: 'DataDosen'
})



module.exports = pengajuanIzinSurvey