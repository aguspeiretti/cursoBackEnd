import { userService } from "../services/index.js";

const upDateUser = async (req, res) => {
  console.log(req.user);
  const role = req.body;
  console.log(role.type);
  try {
    const userUpdate = await userService.updateOneService(
      { email: req.user.email },

      { $set: { role: role.type } }
    );
    if (!userUpdate) {
      res.send({ status: "success", messages: "reestablecida" });
    }
    res.send({ status: "success", payload: userUpdate });
  } catch (err) {
    console.log(err);
  }
};

const updateUserData = async (req, res) => {
  try {
    const files = req.files;
    const params = { _id: req.params.uid }; // Crear el objeto 'params' con el _id del usuario
    const user = await userService.getUsersByService(params); // Usar 'getUsersByService' con 'params'
    console.log(files);
    if (!user) {
      return res.status(404).send({
        status: "error",
        error: "Usuario no encontrado, por favor, ingrese una ID válida",
      });
    }

    // Obteniendo la información de los archivos cargados y agregándolos al array "documents"
    const documents = user.documents || []; // Se obtiene el array de documentos existente o se crea uno nuevo

    const requiredReferences = [
      "Identificación",
      "Comprobante de domicilio",
      "Comprobante de estado de cuenta",
    ];
    files.forEach((file, index) => {
      const reference =
        index < requiredReferences.length
          ? requiredReferences[index]
          : file.originalname;
      documents.push({ name: file.originalname, reference: reference });
    });

    // Verificar si se han cargado los tres documentos requeridos
    const uploadedReferences = documents.map((doc) => doc.reference);
    const hasRequiredDocuments = requiredReferences.every((docRef) =>
      uploadedReferences.includes(docRef)
    );

    // Actualizar el estado del usuario si se han cargado los tres documentos
    if (hasRequiredDocuments) {
      user.status = true;
    }

    // Actualizando el usuario en la base de datos con el nuevo array "documents"
    const updatedUser = await userService.updateUsersService(params, {
      // Usar 'params' en lugar de 'userId'
      documents,
      status: user.status,
    });
    const newUser = await userService.getUsersByService(updatedUser._id);

    res.status(200).send({
      status: "success",
      message: "Archivo cargado con éxito",
      payload: newUser,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "error", error: "Error interno del servidor" });
  }
};

export default {
  upDateUser,
  updateUserData,
};
