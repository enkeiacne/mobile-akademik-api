const IbuReferences = require("../../../model/orang_tua/ibu/ProfilModel");
var uuid = require("uuid");

// create Ibu profil
exports.insertProfilIbu = (req, res, next) => {
    var user = req.user.username;
    var b = user.split('_');
    user = b[b.length - 1];
    const profilIbu = new IbuReferences({
        id: uuid.v4().substring(0, 10),
        nama_lengkap: req.body.nama_lengkap,
        NIK: req.body.NIK,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        status_hidup: req.body.status_hidup,
        status_kekerabatan: req.body.status_kekerabatan,
        pendidikan_terakhir: req.body.pendidikan_terakhir,
        penghasilan: req.body.penghasilan,
        alamat: req.body.alamat,
        phone: req.body.phone,
        email: req.body.email,
        id_siswa: user,
    });
    IbuReferences.create(user, profilIbu, (err, result) => {
        if (err) {
            if (err.kind === "redundan_profil") {
                return res.status(409).send({
                    message: "data_conflict",
                });
            }
            return res.status(500).send({
                message:
                    err.message
            });
        }
        return res.status(200).send({
            message: "data insert sukses",
        });
    });
}

// read profil ibu by NIS
exports.findProfilIbuByNIS = (req, res, next) => {
    IbuReferences.findProfilIbuByNIS(req.params.id, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: `not_found`
                });
            }
            return res.status(500).send({
                message: err
            });

        }
        return res.status(200).send(
            {
                message: result,
            }
        );

    });
};

// update profil ibu by NIS
exports.updateProfilIbuByNIS = (req, res, next) => {
    var user = req.user.username;
    var b = user.split('_');
    user = b[b.length - 1];
    const updateProfilIbu = new IbuReferences({
        nama_lengkap: req.body.nama_lengkap,
        NIK: req.body.NIK,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        status_hidup: req.body.status_hidup,
        status_kekerabatan: req.body.status_kekerabatan,
        pendidikan_terakhir: req.body.pendidikan_terakhir,
        penghasilan: req.body.penghasilan,
        alamat: req.body.alamat,
        phone: req.body.phone,
        email: req.body.email
    });
    IbuReferences.updateProfilIbuByNIS(user, updateProfilIbu, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: "not_found"
                });
            }
            return res.status(500).send({
                message:
                    err.message
            });
        }
        return res.status(200).send({
            message: "data update sukses",
        });
    });
}

exports.deleteProfilIbuByNIS = (req, res, next) => {
    var user = req.user.username;
    var b = user.split('_');
    user = b[b.length - 1];
    IbuReferences.deleteProfilIbuByNIS(user, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: "not_found"
                });
            }
            return res.status(500).send({
                message: err
            });
        }
        return res.status(200).send({
            message: `Delete sukses`
        });
    });
}