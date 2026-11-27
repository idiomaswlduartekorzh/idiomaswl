# Biblioteca de libros del administrador

La pestaña **Libros** vive en el menú lateral de `/dashboard/admin`. El acceso al
panel exige una cuenta administradora verificada. Los archivos no se sirven desde
`public/`: están en la carpeta privada de Drive
[WeLearn · Libros (uso interno)](https://drive.google.com/drive/folders/1Mkn8P__Il6z52k9BtxNJMNC7I0i4y_kH).

## Progetto Italiano A1

| Recurso | Archivo en Drive | Fuente local |
|---|---|---|
| Libro del estudiante, 272 páginas | [PDF](https://drive.google.com/file/d/1G9HBt0GPM32nBz2mDGBI7GLlUMq-J3Qa/view?usp=drivesdk) | `output/pdf/welearn-italiano-a1-libro-del-estudiante.pdf` |
| Edición con soluciones, 372 páginas | [PDF](https://drive.google.com/file/d/1FQo_3Wo48UvKoEd3xzBz1y0dvgaVMF7V/view?usp=drivesdk) | `output/italiano-a1/libro-integrado-italiano-a1.pdf` |
| Fuentes editables de los 24 capítulos | [ZIP](https://drive.google.com/file/d/15wRXJqq_aRCbakp3KF3RUgb2A4iWiArA/view?usp=drivesdk) | `output/italiano-a1/fuente-editable-hasta-capitulo-24.zip` |

Los dos PDF de Drive se optimizaron para la carga: las 12 ilustraciones de mayor
peso de cada volumen se codificaron como JPEG de calidad 95, sin submuestreo de
color. Las páginas, medidas y flujos de texto y vectores coinciden con los PDF
originales. Los originales de imprenta siguen en las rutas locales indicadas.
En una página ilustrada de muestra, la diferencia media tras renderizar a 1.000
píxeles fue 0,023 por canal sobre 255. Es necesario revisar la prueba física
antes de aprobar esta edición para venta.

Drive concede lectura a `WeLearnInstitute@gmail.com` (propietario),
`josedavidduartesilva@gmail.com`, `david.duartes182@gmail.com` y
`zhanna.korzh@gmail.com`. Los correos `jose@welearn.com`,
`zhanna.duarte@mail.ru` y `zhanna@welearn.com` del registro de admins no tienen
una cuenta Google asociada y no se pudieron añadir sin enviar invitaciones.
Quien entre al panel con uno de ellos debe abrir Drive con una de las cuentas
anteriores. No se activó el acceso público mediante enlace.

El harness final (`output/italiano-a1/informe-harness-final.json`) pasó para los
24 capítulos y 20 pistas de audio vinculadas. El registro editorial del libro
cuenta 694 actividades con respuesta. Sigue pendiente la lectura final del
autor y la prueba de imprenta descritas en `book_italiano_a1_v3/README.md`.

## WeLearn Portugués A1

| Recurso | Archivo en Drive | Fuente local |
|---|---|---|
| Libro del estudiante, 205 páginas | [PDF](https://drive.google.com/file/d/1PbfRmf4n1SYKDKdM01pim4GvNOgtCndQ/view?usp=drivesdk) | `output/portugues-a1/WeLearn_Portugues_A1_libro_del_estudiante.pdf` |
| Edición del profesor con soluciones, 260 páginas | [PDF](https://drive.google.com/file/d/1I4PXiO-uizyv0xVhuruLBzRkEel5ZIXb/view?usp=drivesdk) | `output/portugues-a1/WeLearn_Portugues_A1_libro_con_soluciones_para_profesor.pdf` |
| Fuente editable compacta, 20 capítulos | [ZIP](https://drive.google.com/file/d/1_o6N1DFGyrvGJiugMH-D9QypfAcuhiFi/view?usp=drivesdk) | `output/portugues-a1/WeLearn_Portugues_A1_editable_compacto.zip` |

El libro enseña portugués brasileño A1. El alfabeto y la pronunciación aparecen
antes del capítulo 01. Tiene 20 capítulos, cuatro repasos, 577 actividades de
capítulos y repasos, diez actividades iniciales de pronunciación y 20 audios A1
activos vinculados. La edición del estudiante no lleva el solucionario; la del
profesor sí. La portada del catálogo se renderizó del PDF del estudiante y no
usa una imagen externa.

Los tres archivos están en la misma carpeta privada que los de italiano, con
lectura para el propietario `WeLearnInstitute@gmail.com` y las mismas tres
cuentas del equipo indicadas arriba. No se activó el acceso público mediante
enlace. El harness editorial pasó para los 20 capítulos y los cuatro repasos;
la auditoría de las dos ediciones pasó en
`output/portugues-a1/ediciones/auditoria-ediciones.json`. Siguen pendientes la
lectura final del autor y una prueba física de imprenta.
