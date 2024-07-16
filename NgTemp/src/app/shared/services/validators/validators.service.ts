import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService implements AsyncValidator {
  constructor() {}

  //!Patrones para validar campos, son expresiones regulares, las declaramos como publicas para que se puedan acceder desde cualquier parte del proyecto
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  //!Metodo que se utiliza para saber si un campo es valido o no, recibe un formGroup y el nombre del campo
  isValidField(form: FormGroup, field: string): boolean | null {
    //!Retornamos un booleano si el campo contiene errores y si ha sido tocado por el usuario o si ha sido modificado por el usuario
    return (
      (form.controls[field].errors && form.controls[field].touched) ||
      form.controls[field].dirty
    );
    //!Touched es para saber si el campo ha sido tocado por el usuario
    //!
  }

  getFieldError(form: FormGroup, field: string): string | null {
    //!si el campo no existe y si no contiene errores retornamos null
    if (!form.controls[field]?.errors && !form.controls[field]) return null;

    //! || se usa para que si el campo no existe no de error, este operador se llama cortocircuito
    //!Si no hay errores entonces regresamos un objeto vacio {}
    const errors = form.controls[field].errors || {};

    //!Recorremos el objeto de errores
    for (const key of Object.keys(errors)) {
      //!Con un switch evaluamos cada caso de error
      switch (key) {
        //!Por ejemplo si el error es required, entonces retornamos un mensaje referente a que el campo es requerido
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return 'Este campo debe tener al menos 7 caracteres';
        case 'min':
          return 'El valor minimo es 0';
        //!En el caso de que el error sea pattern, entonces retornamos un mensaje referente a que el patron no es valido
        case 'pattern':
          //!Tomanos el patron que se esta validando de requiredPattern
          const pattern = errors[key].requiredPattern;
          //!Si el patron es igual al patron de emailPattern, entonces retornamos un mensaje referente a que el correo no es valido
          if (pattern === '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') {
            return 'Correo no válido';
          } else if (pattern === '^([a-zA-Z]+) ([a-zA-Z]+)$') {
            return 'Nombre no valido';
          } else {
            return 'Verificar la entrada de este campo';
          }
        case 'noIguales':
          return 'La contraseña no coincide';
        default:
          return null;
      }
    }

    return null;
  }

  public isPasswordOneEqualToPasswordTwo(password: string, passcheck: string) {
    return (formGroup: FormGroup) => {
      const pasw1 = formGroup.controls[password].value;
      const pasw2 = formGroup.controls[passcheck].value;

      if (pasw1 !== pasw2) {
        formGroup.controls[passcheck].setErrors({ noIguales: true });
        //formGroup.controls[password].setErrors({ noIguales: true });
      } else {
        formGroup.controls[passcheck].setErrors(null);
        //formGroup.controls[password].setErrors(null);
      }
    };
  }

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    throw new Error('Method not implemented.');
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
