const { response, request } = require("express");
const Usuario = require("./../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("./../helpers/jwt");
const crearUsuario = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese correo",
      });
    }
    usuario = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();
    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error. Por favor hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, usuario.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }
    //Generar JWT

    const token = await generarJWT(usuario.id, usuario.name);

    res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error. Por favor hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;
  const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = { crearUsuario, loginUsuario, revalidarToken };
