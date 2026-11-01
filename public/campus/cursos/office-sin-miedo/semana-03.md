# Semana 3: hoja de cálculo y presupuesto familiar

Curso: [Office sin Miedo: CV, Cartas y Presupuestos](syllabus.md) · 3 horas orientativas

## Objetivos
Crear una tabla mensual de ingresos y gastos con fórmulas, calcular el saldo y corregir errores frecuentes. Utiliza importes ficticios: no subas extractos bancarios para hacer la práctica.

## LECTURA: tres conceptos esenciales
Ingresos son importes que entran; gastos son importes que salen; saldo es ingresos menos gastos. Un gasto fijo se repite con relativa regularidad y uno variable puede cambiar. Un saldo negativo señala que la suma prevista de gastos supera ingresos: es información para ajustar decisiones, nunca un juicio sobre la persona.

## DATOS FICTICIOS PARA PRACTICAR
Ingresos: 1.500 €. Gastos: vivienda 650 €, alimentación 250 €, transporte 80 €, suministros 120 €, salud 60 € y otros 90 €. Total de gastos: 1.250 €. Saldo: 250 €. Verifica el cálculo con 650 + 250 + 80 + 120 + 60 + 90.

## TALLER PASO A PASO
1. En Calc, Excel o herramienta equivalente escribe A1 «Categoría», B1 «Ingresos» y C1 «Gastos».
2. En A2 coloca «Ingreso ejemplo» y en B2 escribe 1500.
3. De la fila 3 a la 8 introduce las seis categorías; escribe los importes en C3:C8.
4. En B10 calcula =SUMA(B2:B9) o =SUM(B2:B9), según el idioma del editor.
5. En C10 calcula =SUMA(C2:C9). En B11 escribe =B10-C10.
6. Comprueba que B10 vale 1500, C10 vale 1250 y B11 vale 250.
7. Aplica formato de moneda, títulos legibles y ancho de columnas suficiente.
8. Guarda el archivo local y exporta una hoja en PDF legible.

## EJERCICIO 1: gasto inesperado
Añade reparación del teléfono por 180 €. Calcula gastos de 1.430 € y saldo de 70 €. Si obtienes 430 € has sumado en lugar de restar.

## EJERCICIO 2: segundo escenario
Sustituye el ingreso ficticio por 1.350 €. Con los gastos originales el saldo es 100 €. Si además añades la reparación, el saldo es -80 €. Escribe una frase describiendo cada variación.

## EJERCICIO 3: depuración de fórmulas
Una hoja utiliza =B10+C10 como saldo: corrige el operador. Otra utiliza =SUMA(C2:C7) y omite un gasto en C8: ajusta el rango. Compara con la suma manual para localizar errores silenciosos.

## PROYECTO FINAL Y EVALUACIÓN
Entrega CV, carta y presupuesto usando solo datos ficticios. Se aprueba la práctica cuando las cifras cuadran, los documentos son legibles, el saldo responde a cambios y puedes explicar sus fórmulas. El campus no emite certificados oficiales por estas actividades.

[Semana 2](semana-02.md) · [Recursos](recursos.md) · [Programa](syllabus.md)
