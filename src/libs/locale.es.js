import prayers from './prayers';

export default {
  translations: {
    'Add':                        'Agregar',
    'Alert':                      'Alert',
    'Calendar':                   'Calendario',
    'Cancel':                     'Cancelar',
    'Capitalary':                 'Capitalario',
    'Confirm':                    'Confirmar',
    'Confirm purpose deletion?':  '¿Confirma le eliminación del propósito?',
    'Description':                'Descripción',
    'Do you want to confirm?':    '¿Desea confirmar?',
    'Error, prayer %s not found': 'Error, oración no encontrada',
    'Export':                     'Exportar',
    'From':                       'Desde',
    'Menu':                       'Menú',
    'Ok':                         'Aceptar',
    'Prayer':                     'Oración',
    'Prayers':                    'Oraciones',
    'Purpose':                    'Propósito',
    'Purpose dos not have title': 'El propósito no tiene título',
    'Purposes':                   'Propósitos',
    'Purposes list':              'Lista de propósitos',
    'To':                         'Hasta',
    'Title':                      'Título',
    'Update':                     'Actualizar',


'Our Father': 'Padre Nuestro',
[prayers.get('Our Father').prayer]:
`Padre nuestro que estás en el cielo,
santificado sea tu nombre.
Venga a nosotros tu reino
hágase tu volunta 
en la tierra, como en el cielo.
Danos hoy nuestro pan de cada día
perdóna nuestra ofensas
como también nosotros perdonamos a los que nos ofenden,
no nos dejes caer en la tentación,
líbranos del mal.`,


'Glory Be to the Father': 'Glorria al Padre',
[prayers.get('Glory Be to the Father').prayer]:
`Gloria al Padre 
y al Hijo 
y al Espíritu Santo.

Como era en el principio,
ahora y siempre,
por los siglos de los siglos.

Amén.`,


'Hail Mary': 'Dios te salve María',
[prayers.get('Hail Mary').prayer]:
`Dios te salve, María,
llena eres de gracia; el Señor es contigo.
Bendita Tú eres entre todas las mujeres,
y bendito es el fruto de tu vientre, Jesús.

Santa María, Madre de Dios,
ruega por nosotros, pecadores,
ahora y en la hora de nuestra muerte.

Amén.`,


'Little Consecration': 'Pequeña Consagración',
[prayers.get('Little Consecration').prayer]:
`Oh, Señora mía, oh Madre mía,
yo me ofrezco todo a ti,
y en prueba de mi filial afecto
te consagro en este día:
mis ojos, mis oídos, mi lengua, mi corazón,
en una palabra, todo mi ser.
Ya que soy todo tuyo, oh Madre de bondad,
guárdame, defiéndeme, utilízame,
como instrumento y posesión tuya.

Amén.`,


'Holy Rosary misteries': 'Misterios del Santo Rosario',
[prayers.get('Holy Rosary misteries').prayer]:
`Misterios Gozosos (lunes y sábados)
1. La encarnación del Hijo de Dios.
2. La visitación de Nuestra Señora a su prima Santa Isabel.
3. El nacimiento del Hijo de Dios en el portal de Belén.
4. La presentación de Jesús en el Templo.
5. El Niño Jesús perdido y hallado en el Templo.
	  	
Misterior Luminosos (jueves)
1. El Bautismo en el Jordán
2. Las bodas de Caná.
3. El anuncio del Reino de Dios.
4. La Transfiguración.
5. La institución de la Eucaristía.

Misterios Dolorosos (martes y viernes)
1. La oración en el Huerto.
2. La flagelación de Jesús atado a la columna.
3. La coronación de espinas.
4. Jesús con la Cruz a cuestas camino del Calvario.
5. La crucifixión y muerte de Jesús.

Misterios Gloriosos (miércoles & sábados)
1. La resurrección del Hijo de Dios.
2. La Ascensión del Señor al cielo.
3. La venida del Espíritu Santo.
4. La Asunción de María al cielo.
5. La coronación de María como Reina y Señora de todo lo creado.`,
},

  dateFormats: {
    '%D': '%d/%m/%y',
  }
};