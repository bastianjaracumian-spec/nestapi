export class Client {
  constructor(
    public readonly id: number | null,
    public rut: string,
    public nombre: string,
    public apellidoPaterno: string,
    public apellidoMaterno: string | null,
    public email: string,
    public telefono: string | null,
    public fechaNacimiento: Date | null,
    public direccion: string | null,
    public activo: boolean = true,
  ) {}
}