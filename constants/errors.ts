export const INVALID_JSON = 'El formato ingresado no es válido. Revisa los corchetes [ ].'
export const INVALID_JSON_EXAMPLE = 'Ejemplo correcto: [[1,2],[3,4]]'

export const NOT_AN_ARRAY =
  'Debes ingresar una lista de listas (tabla). Cada fila debe ser una lista de números entre corchetes [ ].'

export const EMPTY_MATRIX = 'El campo no puede estar vacío. Ingresa al menos una fila con números.'

export const NOT_2D_MATRIX =
  'Debes ingresar una tabla (lista de listas). Cada fila debe ser una lista de números entre corchetes [ ].'
export const ELEMENT_NOT_ARRAY = (index: number) =>
  `La fila ${index} no está escrita correctamente. Debe ser una lista de números entre corchetes [ ].`

export const EMPTY_ROW = (index: number) => `La fila ${index} está vacía. Debe tener al menos un número.`

export const INVALID_NXN_MATRIX = (rowIndex: number, actual: number, expected: number) =>
  `La tabla debe ser cuadrada. Todas las filas deben tener la misma cantidad de números. La fila ${rowIndex} tiene ${actual} número${actual !== 1 ? 's' : ''}, pero debería tener ${expected}.`

export const INVALID_NUMBER_MATRIX = (value: unknown, row: number, col: number) =>
  `Solo se permiten números. En la fila ${row + 1}, columna ${col + 1} hay un valor inválido: "${value}".`
