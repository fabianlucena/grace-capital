import prayers from './prayers';

export default {
  translations: {
    'Add':                        'Agregar',
    'Calendar':                   'Calendario',
    'Cancel':                     'Cancelar',
    'Capitalary':                 'Capitalario',
    'Confirm':                    'Confirmar',
    'Description':                'Descripción',
    'Do you want to confirm?':    '¿Desea confirmar?',
    'Error, prayer %s not found': 'Error, oración no encontrada',
    'Export':                     'Exportar',
    'From':                       'Desde',
    'Little Consecration':        'Pequeña Consagración',
    'Menu':                       'Menú',
    'Our Father':                 'Padre Nuestro',
    'Ok':                         'Aceptar',
    'Prayer':                     'Oración',
    'Prayers':                    'Oraciones',
    'Purpose':                    'Propósito',
    'Purposes':                   'Propósitos',
    'Purposes list':              'Lista de propósitos',
    'To':                         'Hasta',
    'Title':                      'Título',
    'Update':                     'Actualizar',

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
    [prayers.get('Little Consecration').prayer]:
`Oh, Señora mía, oh Madre mÍa,
yo me ofrezco todo a Ti,
y en prueba de mi filial afecto
te consagro en este día:
mis ojos, mis oídos, mi lengua, mi corazón,
en una palabra, todo mi ser.
Ya que soy todo tuyo, oh Madre de bondad,
guárdame, defiéndeme, utilízame,
como instrumento y posesión tuya.
Amén.`},

  dateFormats: {
    '%D': '%d/%m/%y',
  }
};