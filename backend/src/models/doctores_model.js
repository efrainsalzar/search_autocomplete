class Doctor {
    constructor({
        id,
        nombre,
        apellido,
        especialidad,
        telefono,
        email,
        fecha_nacimiento,
        fecha_contratacion,
        activo,
        salario
    }) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.especialidad = especialidad;
        this.telefono = telefono;
        this.email = email;
        this.fecha_nacimiento = fecha_nacimiento;
        this.fecha_contratacion = fecha_contratacion;
        this.activo = activo;
        this.salario = salario;
    }
}

module.exports = Doctor;